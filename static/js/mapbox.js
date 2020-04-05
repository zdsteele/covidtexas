API_KEY = 'pk.eyJ1IjoiemRzdGVlbGUiLCJhIjoiY2sycnJsejJyMGJsajNtbnhqNWdhMXk3bCJ9.iDhD7eDSPOc1WErl0o8riQ'
    // https://raw.githubusercontent.com/TNRIS/tx.geojson/master/counties/tx_counties.topojson

var myMap = L.map("map", {
    center: [30.00, -99.90],
    zoom: 6,
    // layers: [streetmap, texas]
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    minZoom: 5,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

var link = "static/js/updated_geo.json";



// d3.json(link, function(data) {

//     // console.log(data)

//     L.geoJson(data, {
//         style: function(feature) {
//             return {
//                 color: "blue",
//                 fillColor: fillColor(feature.properties.new_data[1]),
//                 fillOpacity: 0.25,
//                 weight: 1.5
//             }
//         },

//         onEachFeature: function(feature, layer) {

//             layer.on({
//                 // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//                 mouseover: function(event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         fillOpacity: 0.9
//                     });
//                 },
//                 // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//                 mouseout: function(event) {
//                     layer = event.target;
//                     layer.setStyle({
//                         fillOpacity: 0.25
//                     });
//                 },
//                 // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
//                 // click: function(event) {
//                 //     myMap.fitBounds(event.target.getBounds());
//                 // }
//             });
//             layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h3>" + "Confirmed Cases:" + feature.properties.new_data[1] + "</h3>");

//         }
//     }).addTo(myMap);

// });


d3.json(link, function(data) {

    // Create a new choropleth layer
    geojson = L.choropleth(data, {

        // Define what  property in the features to use
        valueProperty: 'cases',

        // Set color scale
        scale: ["#ffffb2", "#b10026"],

        // Number of breaks in step range
        steps: 15,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
            // Border color
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
        },

        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup("County: " + feature.properties.name + "<br>Confirmed Cases:<br>" + feature.properties.cases +
                "<br>Deaths:<br>" + feature.properties.deaths);

            layer.on({
                click: function() {

                    Scatter_Plot(feature.properties.name)
                }
            })
        }
    }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h3>Covid-19 Cases</h3>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

});

d3.csv("/static/csv/stats.csv", function(tex) {

    stats = tex[0]

    var table = d3.select("#meta");

    Object.entries(stats).forEach(function([key, value]) {

        table.append("p").text(`${key}: ${value}`)
    });
});


d3.csv("/static/csv/CaseCountData.csv", function(county_csv_data) {
    // Example found from here
    // http://bl.ocks.org/yan2014/c9dd6919658991d33b87
    console.log(county_csv_data)
    var countyArray = [];

    county_csv_data.forEach(function(row, i) {

        countyArray.push([row.County, row.Positive, row.Fatalities])
    });

    var table = d3.select("#countyTable")
    var header = table.append("thead").attr("class", "thead-dark").append("tr");
    header
        .selectAll("th")
        .data(["County", "Cases", "Fatalities"])
        .enter()
        .append("th")
        .text(function(d) { return d; })

    var tablebody = table.append("tbody");
    rows = tablebody
        .selectAll("tr")
        .data(countyArray)
        .enter()
        .append("tr");

    cells = rows.selectAll("td")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("td")
        .text(function(d) {
            return d;
        });


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