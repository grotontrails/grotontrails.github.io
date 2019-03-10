from mako.template import Template
from mako.runtime import Context
from mako.lookup import TemplateLookup
from xml.dom import minidom

import os
import glob
import re

templateLookup = TemplateLookup(directories=[''], output_encoding='utf-8',input_encoding='utf-8')


activityPageTemplate = Template(filename='pages/activity.tmpl',strict_undefined=True,input_encoding='utf-8',lookup=templateLookup )
placePageTemplate = Template(filename='pages/place.tmpl',strict_undefined=True,input_encoding='utf-8',lookup=templateLookup )
mapPageTemplate = Template(filename='pages/map.tmpl',strict_undefined=True,input_encoding='utf-8',lookup=templateLookup )


for pageFilename in glob.glob("pages/page*.html"):

    outputFilename = None
    script = ""

    m = re.match("pages/page-([0-9a-z_A-Z-]+).html",pageFilename)
    if ( m is not None):
        outputFilename = m.group(1) + ".html"
  
    # see if the html file has a external script.
    m = re.match("pages/([0-9a-z_A-Z-]+).html",pageFilename)
    if ( m is not None):
        scriptFilename = "pages/" + m.group(1) + ".js"
        if ( os.path.isfile(scriptFilename )):
            with open(scriptFilename) as x:
                script = x.read()

    if ( outputFilename is not None):
        print("{0} --> ".format(pageFilename),end="")
        pageTemplate = Template(filename=pageFilename,strict_undefined=True,input_encoding='utf-8',lookup=templateLookup )
        body = pageTemplate.render(
            attributes={ "titleLong":"" },
            script=script
        )
        with open(outputFilename, 'w') as pageFile:
            pageFile.write(body)

        print(outputFilename )


for xmlFilename in sorted(glob.glob("pages/*.xml")):
    print("{0} --> ".format(xmlFilename),end="")

    outputFilename = None
    template = None
    script = ""

    mydoc = minidom.parse(xmlFilename)

    title = mydoc.documentElement.getAttribute("title")
    titleLong = title

    # see if the xml file has a external script.
    m = re.match("pages/([0-9a-z_A-Z-]+).xml",xmlFilename)
    if ( m is not None):
        scriptFilename = "pages/" + m.group(1) + ".js"
        if ( os.path.isfile(scriptFilename )):
            with open(scriptFilename) as x:
                script = x.read()

    # pages/activity-*.xml
    m = re.match("pages/activity-([0-9a-z_A-Z-]+).xml",xmlFilename)
    if ( m is not None):
        outputFilename = m.group(1) + ".html"
        template = activityPageTemplate
        titleLong = title + " - Groton Trails"

    # places/place-*.xml
    m = re.match("pages/place-([0-9a-z_A-Z-]+).xml",xmlFilename)
    if ( m is not None):
        outputFilename = m.group(1) + ".html"
        template = placePageTemplate

    # places/map-*.xml
    m = re.match("pages/map-([0-9a-z_A-Z-]+).xml",xmlFilename)
    if ( m is not None):
        outputFilename = m.group(1) + ".html"
        template = mapPageTemplate

    if ( template is not None):
        print(outputFilename,end="" )

        body = template.render(
            attributes={"title":title,"titleLong":titleLong},
            title=title,
            titleLong=titleLong,
            body = mydoc.documentElement.toxml(),
            script=script
            )

        with open(outputFilename, 'w') as pageFile:
            pageFile.write(body)

    print("")

#print()

