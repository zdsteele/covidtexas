API_KEY = 'pk.eyJ1IjoiemRzdGVlbGUiLCJhIjoiY2sycnJsejJyMGJsajNtbnhqNWdhMXk3bCJ9.iDhD7eDSPOc1WErl0o8riQ'

$.getJSON("/static/js/map.json", function(data) {

    // Function to determine marker size based on population

    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        layer.bindPopup("<h4>" + feature.properties.County +
            "</h3><hr><p>" + feature.properties.Positive + "</p>");
    }

    var locations = data.features
        // Define arrays to hold created city and state markers
        // var cityMarkers = [];
    var countyMarkers = [];

    // Loop through locations and create city and state markers
    for (var i = 0; i < locations.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function

        countyMarkers.push(
            L.circleMarker(locations[i].geometry.coordinates, {
                stroke: true,
                fillOpacity: 0.75,
                color: "black",
                fillColor: "red",
                radius: markerSize(locations[i].properties.Positive)
            }).bindPopup("<h4>" + locations[i].properties.County +
                "</h3><hr><p>" + "Cases: " + locations[i].properties.Positive + "</p>" + "<p>" + "Deaths: " + locations[i].properties.Fatalities + "</p>")

        );
    }

    // Define variables for our base layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        minZoom: 5,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        minZoom: 5,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // Create two separate layer groups: one for cities and one for states
    var texas = L.layerGroup(countyMarkers);
    // var cities = L.layerGroup(cityMarkers);

    // Create a baseMaps object
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // Create an overlay object
    var overlayMaps = {
        "Covid-19-Cases": texas
            // "City Population": cities
    };

    // Define a map object
    var myMap = L.map("map", {
        center: [30.00, -99.90],
        zoom: 6,
        layers: [streetmap, texas]
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    L.control.scale().addTo(myMap);


});

d3.csv("/static/csv/stats.csv", function(stats) {

    console.log(stats)

    var table = d3.select("#meta");

    Object.entries(stats).forEach(function([key, value]) {

        table.append("p").text(`${key}: ${value}`)
    });
});


//  This seems to work
var mapmargin = 50;
$('#map').css("height", ($(window).height() - mapmargin));
$(window).on("resize", resize);
resize();

function resize() {

    if ($(window).width() >= 980) {
        $('#map').css("height", ($(window).height() - mapmargin));
        $('#map').css("margin-top", 50);
    } else {
        $('#map').css("height", ($(window).height() - (mapmargin + 12)));
        $('#map').css("margin-top", -21);
    }

};