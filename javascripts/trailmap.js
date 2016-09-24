

function createSimpleMap(divid, locationArray, zoom) {
    var map = L.map(divid, { zoomControl: false });

    var mapboxAttrib = "";

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

    map.on('click', function (e) {
        window.location.href = 'Interactive_Maps.html#map=' + map.getZoom() + '/' + e.latlng.lat.toPrecision(7) + '/' + e.latlng.lng.toPrecision(7);
    });
}

