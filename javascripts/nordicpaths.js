    var nordicPaths = [{
                 "type": "LineString",
                "coordinates": [[-71.5943407,42.5845921],[-71.5939714,42.5855511],[-71.5937911,42.5860865],]
                },{
                "type": "LineString",
                "coordinates": [[-71.5937911,42.5860865],[-71.5939485,42.5861497],[-71.5943432,42.5862789],[-71.5945125,42.5863963],[-71.5946501,42.5866003],]
                },
     ];
    function loadNordicPaths () {
        L.geoJSON(nordicPaths,{style: {weight: 4,color: '#eecc11'}}).addTo(map);
        L.geoJSON(nordicPaths,{style: {weight: 2,color: 'white',dashArray: '6, 4'}}).addTo(map);
    }