function rgbToHex(rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };
  
  /* accepts parameters
   * h  Object = {h:x, s:y, v:z}
   * OR 
   * h, s, v
  */
  function HSVtoRGB(h, s, v) {
      var r, g, b, i, f, p, q, t;
      if (arguments.length === 1) {
          s = h.s, v = h.v, h = h.h;
      }
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
      }
      return {
          r: rgbToHex(Math.round(r * 255)),
          g: rgbToHex(Math.round(g * 255)),
          b: rgbToHex(Math.round(b * 255))
      };
  }
  
  function loadJSON(url, callback) {   
      let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  
      xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                  callback(xobj.responseText);
          }
      };
      xobj.open('GET', url, true);
      xobj.send();  
  }
  
  function main() {
  
      let mapboxAttrib = 'For informational purposes only.<br> &copy; <a href="http://www.mapbox.com/">Mapbox</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  
      let mapboxSatellite = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianJlbWlsbGFyZCIsImEiOiJzX2dhaXN3In0.qWyAnddfUVfs61ojApFvsg', {
          attribution: mapboxAttrib,
          maxZoom: 17
      });
      let mapboxOutdoors = L.tileLayer('https://gtctiles.blob.core.windows.net/gtctiles/tiles/{z}/{x}/{y}.png', {
          attribution: mapboxAttrib,
          minZoom: 13,	
          maxZoom: 17		  
      });
      let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: mapboxAttrib });
   
      // create leaflet map
      var map = L.map('map')
  
      L.easyPrint({title: 'Print The Map!', position: 'topleft' }).addTo(map);
  
      var overlaysJSON = [
      ]
  
      function complete() {
          
          let overlays = {
          }
  
          let trailCount = 0.0
  
          function onEachFeature(feature, layer) {
              // does this feature have a property named popupContent?
              if (feature.properties ) {
              
                  trailCount = trailCount + 1.0
                  var rgb = HSVtoRGB(trailCount/10.0,0.9,0.5)
                  var rgbStr = "#" + rgb['r'] + rgb['g'] + rgb['b']
                  //var rgbStr = "#FFFF00"
  
                  var routineStyle = {
                      "color": rgbStr,
                      "weight": 4,
                      'opacity': 0.8,
                      "fill": 0
                      };
  
                  var featureLayer = L.geoJson(feature,{style: routineStyle});
                  
                  overlays[feature.properties.name + ' - ' + feature.properties.lengthMiles.toFixed(1) + ' Miles'] = featureLayer;
                  map.addLayer(featureLayer)
                  featureLayer.bindPopup(feature.properties.name + ' - ' + feature.properties.lengthMiles.toFixed(1) + ' Miles')
              }
          }
              
          json0 = L.geoJson(overlaysJSON,{onEachFeature: onEachFeature} )
  
          var collapsedV = true;
          if ( window.innerWidth > 1000) {
              collapsedV = false
          }
  
          var baseMaps = {
              "Map": mapboxOutdoors,
              "Satellite": mapboxSatellite,
              "OSM": osmLayer,
          };
  
          L.control.layers(baseMaps, overlays, {collapsed: collapsedV}).addTo(map);    
  
          map.fitBounds(json0.getBounds());
  
          L.control.scale().addTo(map);
  
          mapboxOutdoors.addTo(map);
                  
          function updateURL() {
              let pos = map.getCenter();
              let newFragment = "#map=" + map.getZoom() + "/" + pos.lat.toPrecision(7) + "/" + pos.lng.toPrecision(7);
              history.replaceState({},'',newFragment);
          }
          
          if ( location && location.hash.indexOf("#map=") == 0 ) {
              let url = location.hash.slice(5);
              let ll = url.split('/');
              map.panTo( [ll[1],ll[2]] );
              map.setZoom(ll[0]); 		
          } else {
              var pos = map.getCenter();
              var newFragment = "#map=" + map.getZoom() + "/" + pos.lat.toPrecision(7) + "/" + pos.lng.toPrecision(7);
              history.replaceState({},'',newFragment);
          }
                  
          map.on('moveend', updateURL );
          map.on('zoomend', updateURL );
          //map.on('zoomend', updateMarkers);
                                  
          // remove leaflet attribution
          map.attributionControl.setPrefix('')
  
          L.control.locate().addTo(map);			                    
      }
  
      loadJSON('/geo/walkingroute-all.geojson', function(response) { overlaysJSON = JSON.parse(response); complete() })
  }
  
  window.onload = main;
  