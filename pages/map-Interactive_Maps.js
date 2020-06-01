function main() {

    var mapboxAttrib = 'For informational purposes only.<br> &copy; <a href="http://www.mapbox.com/">Mapbox</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

    var mapboxSatellite = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianJlbWlsbGFyZCIsImEiOiJzX2dhaXN3In0.qWyAnddfUVfs61ojApFvsg', {
        attribution: mapboxAttrib
    });
    var mapboxOutdoors = L.tileLayer('https://gtctiles.blob.core.windows.net/gtctiles/tiles/{z}/{x}/{y}.png', {
		attribution: mapboxAttrib,
		minZoom: 13,	
        maxZoom: 17		
    });
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: mapboxAttrib });
 
    // create leaflet map
    var map = L.map('map', {
        zoomControl: true,
        center: [42.608, -71.572],
        zoom: 13        
    });

	L.easyPrint({title: 'Print The Map!', position: 'topleft' }).addTo(map);

	var cameraIconObj = L.icon({ iconUrl: 'images/camera-4-16.png', iconSize: [32,32]})

	var photoMarkers = []
	for (var i = 0; i < photoData.features.length; ++i) {
		var markerElementData =  photoData.features[i]
		var marker = L.marker(markerElementData.geometry.coordinates.reverse(),{icon: cameraIconObj })
		marker.bindPopup("<a href=\"" +  markerElementData.properties.url + "\"> <img width=\"175\" height=\"175\" src=\"" + markerElementData.properties.url + "\" > </a>");
		photoMarkers.push( marker)
	}

	var photosLayerGroup = L.layerGroup(photoMarkers);
			
    // set basemaps
    var baseMaps = {
        "Map": mapboxOutdoors,
        "Satellite": mapboxSatellite,
		"OSM": osmLayer
    };
	var layerOptions = { 
		"Photos" : photosLayerGroup
	};

    L.control.layers(baseMaps,layerOptions).addTo(map);

    L.control.scale().addTo(map);

    mapboxOutdoors.addTo(map);
	
    //var parkingIconObj = L.icon({ iconUrl: 'images/parking.png',iconSize: [16,16] } )
	var smallDropIconObj = L.icon({ iconUrl: 'images/small-drop-marker.png', iconSize: [32,32]})

	for (var i = 0; i < markerData.features.length; ++i) {
		var markerElementData =  markerData.features[i]
		var marker = L.marker(markerElementData.geometry.coordinates.reverse(),{title: markerElementData.properties.name, icon: smallDropIconObj })
		markerElementData.marker = marker

        // markerElementData.properties.symbolid
		// 0 property name
		// 1 private
		// 2 campground
		// 3 general POI
		// 4 swimming
		// 5 parking
		// 6 trailhead
		// 7 trail access
		// 8 wet
		// 9 poi, castle

		if ( markerElementData.properties.symbolid == 5 || markerElementData.properties.symbolid == 7) {

			var parkingArray = markerElementData.geometry.coordinates;

			var googleURL = "https://maps.google.com/?daddr=" + parkingArray[0].toString() + "," + parkingArray[1].toString();
			var iosURL = "https://maps.apple.com/?daddr=" + parkingArray[0].toString() + "," + parkingArray[1].toString();
			var bingURL = "https://bing.com/maps/default.aspx?rtp=~adr." + parkingArray[0].toString() + "," + parkingArray[1].toString();
			var osmURL = "https://www.openstreetmap.org/#map=18/" + parkingArray[0].toString() + "/" + parkingArray[1].toString();

			var directionsHTML = 
			"<br>Directions: " + 
			"<a href=\"" + googleURL + "\">Google</a>, " +
			"<a href=\"" + iosURL + "\">Apple</a>, " +
			"<a href=\"" + bingURL + "\">Bing</a>, " + 
			"<a href=\"" + osmURL + "\">OSM</a>";

			var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;			
			if ( iOS) {
				directionsHTML = "<br><a href=\"" + iosURL + "\">Directions to Here</a>"
			}
			var android = ['Android'].indexOf(navigator.platform) >= 0;
			if ( android) {
				directionsHTML = "<br><a href=\"" + googleURL + "\">Directions to Here</a>"
			}

			markerElementData.properties.popupinfo += directionsHTML; 
		}

		if ( markerElementData.properties.popupinfo.length > 0 ) {
			marker.bindPopup(markerElementData.properties.popupinfo)
		}
	}

	function updateMarkers() {
		var zoom = map.getZoom()

		for (var i = 0; i < markerData.features.length; ++i) {
			var markerElementData =  markerData.features[i]
			var minZoom = 14;

			if ( markerElementData.properties.symbolid == 0) {
				minZoom = 10;
			}

			if ( zoom > minZoom ) {
				map.addLayer( markerElementData.marker)
			} else {
				map.removeLayer( markerElementData.marker )
			}
		}

		if ( zoom > 14) {
			map.addLayer(  photosLayerGroup)
		} 
	}
		
	function updateURL() {
	  var pos = map.getCenter();
	  var newFragment = "#map=" + map.getZoom() + "/" + pos.lat.toPrecision(7) + "/" + pos.lng.toPrecision(7);
	  history.replaceState({},'',newFragment);
	}
	
    if ( location && location.hash.indexOf("#map=") == 0 ) {
	  var url = location.hash.slice(5);
	  var ll = url.split('/');
	  map.panTo( [ll[1],ll[2]] );
	  map.setZoom(ll[0]); 		
	} else {
      var pos = map.getCenter();
	  var newFragment = "#map=" + map.getZoom() + "/" + pos.lat.toPrecision(7) + "/" + pos.lng.toPrecision(7);
	  history.replaceState({},'',newFragment);
	}
			
	map.on('moveend', updateURL );
    map.on('zoomend', updateURL );
	map.on('zoomend', updateMarkers);

	updateMarkers();
	    					
    // remove leaflet attribution
    map.attributionControl.setPrefix('')

	L.control.locate().addTo(map);	
}

window.onload = main;
