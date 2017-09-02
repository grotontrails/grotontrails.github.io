# Groton Trails Network

This is the website for the [ Groton Trails Network at www.grotontrails.org](https://www.grotontrails.org).

### Development 

The site is 100% static and is very easy to change. 
1. Make a local clone using git or github. Github has lots of documentation on how to do this. 
2. Run a local webserver. Many web servers will work.
	1. For windows the [MiniWeb HTTP server](https://sourceforge.net/projects/miniweb/) works nicely. 
	2. Run the following command "miniweb.exe -r ..\grotontrails.github.io"
3. Commit and submit a pull request.

It is hosted directly by github, using the github pages feature, with a https proxy run by Cloadflare. Once the pull request is accepted, it is live. 


### Online Map

The online map has several different layers. 
The server side is all hosted by Mapbox
- Mapbox hosts a vector tile layer containing just contours lines. It is called "Mapbox Terrian V2". 
- Mapbox transforms the raw map data from OpenStreetMap into a vector tile layer. The vector tile layer 
  is called "Mapbox Streets V5". Mapbox keeps the "Mapbox Streets V5" tile layer up to date with 
  OpenStreetMap data.  The trail data in this layer is ignored by our style sheet, so everything 
  except the trail data is automagically keep up to date with OpenStreetMap.
- The "Mapbox Streets V5" vector tile layer omits the OpenStreetMap operator and access tag that are 
  needed for our map.  A third vector tile layer exists, that contains all of the trail data/tags 
  from OpenStreetMap within Groton. The custom tile layer is created by using the custom data 
  feature in Mapbox. The layer is called “original”. 
 - Mapbox studio classic which is currently deprecated,  is used to maintain a slightly 
   customized “Mapbox outdoors” style sheet.  The style sheet  renders the trail data from the
   custom layer “original” and ignores the trail data from “Mapbox Streets V5”. 
 - The tweaked style sheet is uploaded to the mapbox servers, which process the three vector 
   tile layers and the tweaked style sheet and serve traditional image/png based tile sets.
 - On the client side, using javascript, the leaflet library is used to render the mapbox served 
 image tile set as an actual map.

This is the overpass turbo query. Export as geoJSON, rename export.geojson to original.geojson, and 
update original layer in Mapbox.


```
[timeout:25];
// fetch area “Groton,ma” to search in
{{geocodeArea:Groton,MA}}->.searchArea;
// gather results
(
  // query part for: “hightway=path”
  way["highway"="path"](area.searchArea);
  way["highway"="footway"](area.searchArea);
  way["highway"="track"](area.searchArea);
  way["power"="line"](area.searchArea);
  way["highway"="cycleway"](area.searchArea);
  way["amenity"="parking"](area.searchArea);
  node["junction"="yes"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```



