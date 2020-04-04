API_KEY = 'pk.eyJ1IjoiemRzdGVlbGUiLCJhIjoiY2sycnJsejJyMGJsajNtbnhqNWdhMXk3bCJ9.iDhD7eDSPOc1WErl0o8riQ'
    // https://raw.githubusercontent.com/TNRIS/tx.geojson/master/counties/tx_counties.topojson

var myMap = L.map("map", {
    center: [25.00, -99.90],
    zoom: 6,
    // layers: [streetmap, texas]
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

var link = "static/js/updated_geo.json";



d3.json(link, function(data) {

    // console.log(data)

    L.geoJson(data, {
        style: function(feature) {
            return {
                color: "blue",
                fillColor: fillColor(feature.properties.new_data[1]),
                fillOpacity: 0.25,
                weight: 1.5
            }
        },

        onEachFeature: function(feature, layer) {

            layer.on({
                // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.9
                    });
                },
                // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.25
                    });
                },
                // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
                // click: function(event) {
                //     myMap.fitBounds(event.target.getBounds());
                // }
            });
            layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h3>" + "Confirmed Cases:" + feature.properties.new_data[1] + "</h3>");

        }
    }).addTo(myMap);

});



d3.json("/static/js/map.json", function(case_data) {
    console.log(case_data)



});

























// $.getJSON("/static/js/map.json", function(data) {

// Function to determine marker size based on population
// function onEachFeature(feature, layer) {

//     layer.bindPopup("<h4>" + feature.properties.County +
//         "</h3><hr><p>" + feature.properties.Positive + "</p>");
// }

// var locations = data.features
// Define arrays to hold created city and state markers
// var cityMarkers = [];
// var countyMarkers = [];

// Loop through locations and create city and state markers
// for (var i = 0; i < locations.length; i++) {
//     // Setting the marker radius for the state by passing population into the markerSize function

//     countyMarkers.push(
//         L.circleMarker(locations[i].geometry.coordinates, {
//             stroke: true,
//             fillOpacity: 0.75,
//             color: "black",
//             fillColor: "red",
//             radius: markerSize(locations[i].properties.Positive)
//         }).bindPopup("<h4>" + locations[i].properties.County +
//             "</h3><hr><p>" + "Cases: " + locations[i].properties.Positive + "</p>" + "<p>" + "Deaths: " + locations[i].properties.Fatalities + "</p>")

//     );
// }

// Define variables for our base layers
// var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 10,
//     minZoom: 5,
//     id: "mapbox.streets",
//     accessToken: API_KEY
// });

// var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 10,
//     minZoom: 5,
//     id: "mapbox.dark",
//     accessToken: API_KEY
// });

// Create two separate layer groups: one for cities and one for states
// var texas = L.layerGroup(countyMarkers);


// Create a baseMaps object
// var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
// };

// Create an overlay object
// var overlayMaps = {
//     "Covid-19-Cases": texas

// };

// Define a map object
//     var myMap = L.map("map", {
//         center: [30.00, -99.90],
//         zoom: 6,
//         layers: [streetmap, texas]
//     });

//     // Pass our map layers into our layer control
//     // Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(myMap);

//     L.control.scale().addTo(myMap);


// });

// d3.csv("/static/csv/stats.csv", function(stats) {

//     console.log(stats)

//     var table = d3.select("#meta");

//     Object.entries(stats).forEach(function([key, value]) {

//         table.append("p").text(`${key}: ${value}`)
//     });
// });


//  This seems to work
// var mapmargin = 50;
// $('#map').css("height", ($(window).height() - mapmargin));
// $(window).on("resize", resize);
// resize();

// function resize() {

//     if ($(window).width() >= 980) {
//         $('#map').css("height", ($(window).height() - mapmargin));
//         $('#map').css("margin-top", 50);
//     } else {
//         $('#map').css("height", ($(window).height() - (mapmargin + 12)));
//         $('#map').css("margin-top", -21);
//     }

// };