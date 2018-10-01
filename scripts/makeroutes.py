import sys
import overpy
import os
import sqlite3
import glob
import re
import string
import shapely.geometry
import shapely.wkt
import shapely.ops
import geojson
import functools
import pyproj
import osmium
import rtree 

class WalkingRouteHandler(osmium.SimpleHandler):
    def __init__(self):
        osmium.SimpleHandler.__init__(self)
        self.routes = []


    def isWalkingRoute(self,o):
        takeObj = False
        if ( ('operator' in o.tags and o.tags['operator'] == 'Groton Trails Committee') and
             ('route' in o.tags and o.tags['route'] == 'foot') and 
             ('name' in o.tags)):
            takeObj = True
        return takeObj

    def relation(self, r):
        if ( self.isWalkingRoute(r)):
            osmId = r.id

            ways = {}

            for member in r.members:
                ways[member.ref] = 1

            newRoute = { 'name':r.tags['name'], 'wayids':ways, 'shape':[]}
            self.routes.append(newRoute )

justLettersNumbersRe = re.compile(r'[\W]') # \W [^a-zA-Z0-9_]., but for unicode

def normalizeName(name) :
    return justLettersNumbersRe.sub('',name).lower()
projectionToMeters = functools.partial(pyproj.transform, pyproj.Proj(init='epsg:4326'),pyproj.Proj(init='epsg:3410'))
wktfab = osmium.geom.WKTFactory()

class WalkingRouteHandlerFindWays(osmium.SimpleHandler):

    def __init__(self, routes):
        osmium.SimpleHandler.__init__(self)
        self.routes = routes

    def way(self,o) :
        for route in self.routes:
            if ( o.id in route['wayids']):
                wkt = wktfab.create_linestring(o)
                shape = shapely.wkt.loads(wkt)         
                route['shape'].append(shape )
 

wrh = WalkingRouteHandler()
wrh.apply_file("massachusetts-latest.osm.pbf",locations=False,idx='sparse_mem_array')

wrhfw = WalkingRouteHandlerFindWays(wrh.routes)
wrhfw.apply_file("massachusetts-latest.osm.pbf", locations=True, idx='sparse_mem_array')

features =[]

for route in wrhfw.routes:
    shape = shapely.geometry.MultiLineString( route['shape'])

    if ( shape.is_valid == False):
        print("Route {} Has bad toplogy".format(route['name']))
        continue

    shapeMeters = shapely.ops.transform(projectionToMeters, shape)
    lengthInMeters = shapeMeters.length
    lengthInKm = lengthInMeters / 1000.0
    lengthInMiles = lengthInMeters * 0.00062137
    

    tags = {'name': route['name'],'lengthMiles':lengthInMiles,'lengthKm':lengthInKm}
    feature = geojson.Feature(geometry=shape, properties=tags)
    routeFile = geojson.dumps(feature)
    features.append(feature)

    filename = normalizeName( route['name'])
    with open("../geo/walkingroute-{}.geojson".format(filename),"wt") as outputFile:
        outputFile.write(routeFile)

with open("../geo/walkingroute-all.geojson".format(filename),"wt") as outputFile:

    featureC = geojson.FeatureCollection(features)
    routeFile = geojson.dumps(featureC)
 
    outputFile.write(routeFile)
