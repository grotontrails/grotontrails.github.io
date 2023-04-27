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
 
    // create leaflet map
    var map = L.map('map')

	L.easyPrint({title: 'Print The Map!', position: 'topleft' }).addTo(map);

	var overlaysJSON = [
		null,
		null,
		null,
		null
	]

	function complete() {
		for (let i = 0; i < overlaysJSON.length; ++i) {
			if ( overlaysJSON[i] == null) {
				return;
			}
		}
		
		let defaultWeight = 9;

		let redStyle = {
			"color": "#FF0000",
			"weight": defaultWeight,
			'opacity': 0.3,
			"fill": 0
			};
		let yellowStyle = {
			"color": "#FFFF00",
			"weight": defaultWeight,
			'opacity': 0.3,
			"fill": 0
			};
		let whiteStyle = {
			"color": "#FFFFFF",
			"weight": defaultWeight,
			'opacity': 0.5,
			"fill": 0
			};
		let blueStyle = {
			"color": "#0000FF",
			"weight": defaultWeight,
			'opacity': 0.3,
			"fill": 0
			};
		let greenStyle = {
			"color": "#009900",
			"weight": defaultWeight,
			'opacity': 0.3,
			"fill": 0
			};
		let blackStyle = {
			"color": "#000000",
			"weight": defaultWeight,
			'opacity': 1,
			"fill": 0
			};
			
		tf_loopJSON = L.geoJson(overlaysJSON[0],{style: yellowStyle} )
		tf_95JSON   = L.geoJson(overlaysJSON[1],{style: greenStyle} )
		tf_34JSON   = L.geoJson(overlaysJSON[2],{style: blueStyle } )
		boundary   = L.geoJson(overlaysJSON[3],{style: blackStyle} )
	
		let overlays = {
			"Loop Trail - Yellow": tf_loopJSON,
			"9.5 miles - White": tf_95JSON,
			"3.4 miles - Blue": tf_34JSON,
		}

		collapsedV = true;
		if ( window.innerWidth > 1000) {
			collapsedV = false
		}

		var baseMaps = {
			"Map": gtcTrails,
			"Satellite": mapboxSatellite,
			"OSM": osmLayer
	    };

		L.control.layers(baseMaps, overlays, {collapsed: collapsedV}).addTo(map);    

		map.fitBounds(boundary.getBounds());

		L.control.scale().addTo(map);

		gtcTrails.addTo(map);
				
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

	loadJSON('/geo/walkingroute-townforestlooptrail.geojson',function(response) { overlaysJSON[0] = JSON.parse(response); complete() })
	loadJSON('/geo/walkingroute-grotontownforestrace95mileloop.geojson',  function(response) { overlaysJSON[1] = JSON.parse(response); complete() })
	loadJSON('/geo/walkingroute-grotontownforestrace34mileloop.geojson',  function(response) { overlaysJSON[2] = JSON.parse(response); complete() })
	loadJSON('/geo/townForest.geojson',    function(response) { overlaysJSON[3] = JSON.parse(response); complete() })		
}

window.onload = main;
