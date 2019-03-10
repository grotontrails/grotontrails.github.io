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
        attribution: mapboxAttrib
    });
    let mapboxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/jremillard.6095d11a/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianJlbWlsbGFyZCIsImEiOiJzX2dhaXN3In0.qWyAnddfUVfs61ojApFvsg', {
        attribution: mapboxAttrib
    });
    let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: mapboxAttrib });
 
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
		
		let defaultWeight = 4;

		let redStyle = {
			"color": "#FF0000",
			"weight": defaultWeight,
			'opacity': 0.8,
			"fill": 0
			};
		let yellowStyle = {
			"color": "#FFFF00",
			"weight": defaultWeight,
			'opacity': 0.8,
			"fill": 0
			};
		let blueStyle = {
			"color": "#0000FF",
			"weight": defaultWeight,
			'opacity': 0.8,
			"fill": 0
			};
		let greenStyle = {
			"color": "#00FF00",
			"weight": defaultWeight,
			'opacity': 1,
			"fill": 0
			};
		let blackStyle = {
			"color": "#000000",
			"weight": defaultWeight,
			'opacity': 1,
			"fill": 0
			};
			
		json0 = L.geoJson(overlaysJSON[0],{style: blueStyle} )
		json1 = L.geoJson(overlaysJSON[1],{style: redStyle} )
		json2 = L.geoJson(overlaysJSON[2],{style: yellowStyle} )
		json3 = L.geoJson(overlaysJSON[3],{style: greenStyle} )

		json0Name = overlaysJSON[0].properties.name + " - " + overlaysJSON[0].properties.lengthMiles.toFixed(1) + " Miles - Blue";
		json1Name = overlaysJSON[1].properties.name + " - " + overlaysJSON[1].properties.lengthMiles.toFixed(1) + " Miles - Red";
		json2Name = overlaysJSON[2].properties.name + " - " + overlaysJSON[2].properties.lengthMiles.toFixed(1) + " Miles - Yellow";
		json3Name = overlaysJSON[3].properties.name + " - " + overlaysJSON[3].properties.lengthMiles.toFixed(1) + " Miles - Green";

		let overlays = {
			[json0Name] : json0,
			[json1Name] : json1,
			[json2Name] : json2,
			[json3Name] : json3,
		}

		map.addLayer(json0)
		map.addLayer(json1)
		map.addLayer(json2)
		map.addLayer(json3)

		collapsedV = false;
		/*
		collapsedV = true;
		if ( window.innerWidth > 1000) {
			collapsedV = false
		}*/

		var baseMaps = {
			"Map": mapboxOutdoors,
			"Satellite": mapboxSatellite,
			"OSM": osmLayer
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

	loadJSON('/geo/walkingroute-grotontour.geojson',     function(response) { overlaysJSON[0] = JSON.parse(response); complete() })		
	loadJSON('/geo/walkingroute-southgrotontour.geojson',function(response) { overlaysJSON[1] = JSON.parse(response); complete() })
	loadJSON('/geo/walkingroute-eastgrotontour.geojson', function(response) { overlaysJSON[2] = JSON.parse(response); complete() })		
	loadJSON('/geo/walkingroute-westgrotontour.geojson', function(response) { overlaysJSON[3] = JSON.parse(response); complete() })
}

window.onload = main;
