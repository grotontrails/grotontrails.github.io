function createLargeMap(divid, parkingArray) {
    var map = L.map(divid, { attributionControl: false, zoomControl: false });

	var forInfoOnly = "For general guidance purposes only.<br>Please respect private property.<br>"
    var osmAttrib = forInfoOnly + '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	var mapboxAttrib = forInfoOnly + "&copy; <a href=\'https://www.mapbox.com/about/maps/\'>Mapbox</a> © <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a> <strong><a href=\'https://www.mapbox.com/map-feedback/\' target=\'_blank\'>Improve this map</a></strong>"
	
    var mapboxSatellite = L.layerGroup()

    var mapboxSatelliteRaw = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1IjoianJlbWlsbGFyZCIsImEiOiJzX2dhaXN3In0.qWyAnddfUVfs61ojApFvsg', {
        maxZoom: 18,
        minZoom: 13,
        attribution: ''
    }).addTo( mapboxSatellite)

    var satLayerRoad = L.tileLayer('https://gtctiles.blob.core.windows.net/gtctiles/satellite/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 13,
        attribution: mapboxAttrib
    }).addTo(mapboxSatellite )

    var gtcTrails = L.tileLayer('https://gtctiles.blob.core.windows.net/gtctiles/tiles/{z}/{x}/{y}.png', {
		attribution: osmAttrib,
		minZoom: 13,	
        maxZoom: 17		
    });
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: osmAttrib });


    gtcTrails.addTo(map);

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();

    // Disable tap handler, if present.
    if (map.tap) {
        map.tap.disable();
    }
    
    function loadJSON(url, callback) {   
         var xobj = new XMLHttpRequest();
         xobj.overrideMimeType("application/json");
	     xobj.onreadystatechange = function () {
             if (xobj.readyState == 4 && xobj.status == "200") {
	             callback(xobj.responseText);
            }
         };
	     xobj.open('GET', url, true);
         xobj.send();  
    }
	
    loadJSON(
        '/geo/walkingroute-grotontownforestrace34mileloop.geojson',
	     function(response) {
             // Parse JSON string into object
	         var actual_JSON = JSON.parse(response);
	
	         var myStyle = {
             "color": "#FFFF00",
             "weight": 2,
             "fill": 0
             };
	
             tf_34JSON = L.geoJson(actual_JSON,{style: myStyle} )
             
             loadJSON(
                '/geo/walkingroute-grotontownforestrace95mileloop.geojson',
                function(response) {
                    // Parse JSON string into object
                    var actual_JSON = JSON.parse(response);
            
                    var myStyle = {
                    "color": "#FF0000",
                    "weight": 2,
                    "fill": 0
                    };
            
                    tf_95JSON = L.geoJson(actual_JSON,{style: myStyle} )

                    loadJSON(
                    '/geo/walkingroute-townforestlooptrail.geojson',
                    function(response) {
                        // Parse JSON string into object
                        var actual_JSON = JSON.parse(response);
                
                        var myStyle = {
                        "color": "#FFFF00",
                        "weight": 2,
                        "fill": 0
                        };
                
                        tf_loopJSON = L.geoJson(actual_JSON,{style: myStyle} )

                        // Give user a choice of overlays
                        var overlays = {
                            "Loop Trail - Yellow": tf_loopJSON,
                            "9 mile Run - Red": tf_95JSON,
                            "3.5 mile Run - Blue": tf_34JSON
                        }

                        collapsedV = true;
                        if ( window.innerWidth > 1000) {
                            collapsedV = false

                        }

                        L.control.layers(baseMaps, overlays, {collapsed: collapsedV}).addTo(map);                        
                    });
                    
                });             
        });

    loadJSON(
        '/geo/townForest.geojson',
        function(response) {
            var actual_JSON = JSON.parse(response);
            boundary = L.geoJson(actual_JSON )
            map.fitBounds(boundary.getBounds());
    })
    
    if ( parkingArray) {
        var iconObj = L.icon({ iconUrl: 'images/parking.png',iconSize: [26, 26] } )
        var parkingMarker = L.marker(parkingArray,{icon: iconObj}).addTo(map)

        var googleURL = "https://maps.google.com/?daddr=" + parkingArray[0].toString() + "," + parkingArray[1].toString();
        var iosURL = "https://maps.apple.com/?daddr=" + parkingArray[0].toString() + "," + parkingArray[1].toString();
        var bingURL = "https://bing.com/maps/default.aspx?rtp=~adr." + parkingArray[0].toString() + "," + parkingArray[1].toString();
        var osmURL = "https://www.openstreetmap.org/#map=18/" + parkingArray[0].toString() + "/" + parkingArray[1].toString();

        var directionsHTML = 
          "Directions To Parking<br>" + 
          "<a href=\"" + googleURL + "\">Google</a>, " +
		  "<a href=\"" + iosURL + "\">Apple</a>, " +
          "<a href=\"" + bingURL + "\">Bing</a>, " + 
          "<a href=\"" + osmURL + "\">OSM</a>";

        var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
        
        //iOS = 1
        if ( iOS) {
            directionsHTML = "<a href=\"" + iosURL + "\">Directions to Parking</a>"
        }

        var android = ['Android'].indexOf(navigator.platform) >= 0;
        //android = 1
        if ( android) {
            directionsHTML = "<a href=\"" + googleURL + "\">Directions to Parking</a>"
        }

        parkingMarker.bindPopup(directionsHTML)
    }

    map.on('click', function (e) {
        window.location.href = 'groton-town-forest-map.html#map=' + map.getZoom() + '/' + e.latlng.lat.toPrecision(7) + '/' + e.latlng.lng.toPrecision(7);
    });
}

createLargeMap('town_forest',[42.59740,-71.60491]);
