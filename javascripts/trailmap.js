

function createSimpleMap(divid, locationArray, zoom, optionalParams ) {
    var map = L.map(divid, { attributionControl: false, zoomControl: false });

    var mapboxAttrib = "";

    var parkingArray = [];
    if ( optionalParams.parking ) {
        var pA = optionalParams.parking
        parkingArray.push(pA);
    }
    if ( optionalParams.parking2 ) {
        var pA = optionalParams.parking2
        parkingArray.push(pA);
    }

    var leafArray  = optionalParams.leaf;

    var mapboxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/jremillard.6095d11a/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianJlbWlsbGFyZCIsImEiOiJzX2dhaXN3In0.qWyAnddfUVfs61ojApFvsg', {attribution: mapboxAttrib});

    mapboxOutdoors.addTo(map);

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();

    // Disable tap handler, if present.
    if (map.tap) {
        map.tap.disable();
    }
    
    map.setView(locationArray, zoom);

    if ( leafArray) {
        var iconObj = L.icon({ iconUrl: 'images/fall-leaf.png',iconSize: [26, 26] } )
        var parkingMarker = L.marker(leafArray,{icon: iconObj}).addTo(map)        
    }

    for ( var pi = 0; pi < parkingArray.length; ++pi) {
        var iconObj = L.icon({ iconUrl: 'images/parking.png',iconSize: [26, 26] } )
        var latlon = parkingArray[pi];
        var parkingMarker = L.marker(latlon,{icon: iconObj}).addTo(map)

        var googleURL = "https://maps.google.com/?daddr=" + latlon[0].toString() + "," + latlon[1].toString();
        var iosURL = "https://maps.apple.com/?daddr=" + latlon[0].toString() + "," + latlon[1].toString();
        var bingURL = "https://bing.com/maps/default.aspx?rtp=~adr." + latlon[0].toString() + "," + latlon[1].toString();
        var osmURL = "https://www.openstreetmap.org/#map=18/" + latlon[0].toString() + "/" + latlon[1].toString();

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
        window.location.href = 'Interactive_Maps.html#map=' + map.getZoom() + '/' + e.latlng.lat.toPrecision(7) + '/' + e.latlng.lng.toPrecision(7);
    });
}

