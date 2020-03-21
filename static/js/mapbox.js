
API_KEY = 'pk.eyJ1IjoiemRzdGVlbGUiLCJhIjoiY2sycnJsejJyMGJsajNtbnhqNWdhMXk3bCJ9.iDhD7eDSPOc1WErl0o8riQ'

$.getJSON("/static/js/map.json", function (data) {

  // Function to determine marker size based on population
  function markerSize(cases) {
    return (cases * 3000);
  }

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    layer.bindPopup("<h4>" + feature.properties.Texas_County +
      "</h3><hr><p>" + feature.properties.COVID_19_Cases + "</p>");

  }

  var locations = data.features

  // Define arrays to hold created city and state markers
  // var cityMarkers = [];
  var countyMarkers = [];

  // Loop through locations and create city and state markers
  for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function

    countyMarkers.push(
      L.circle(locations[i].geometry.coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "red",
        radius: markerSize(locations[i].properties.COVID_19_Cases)
      }).bindPopup("<h4>" + locations[i].properties.Texas_County +
        "</h3><hr><p>" + locations[i].properties.COVID_19_Cases + "</p>")

    );
    // Setting the marker radius for the city by passing population into the markerSize function
    // cityMarkers.push(
    //   L.circle(locations[i].coordinates, {
    //     stroke: false,
    //     fillOpacity: 0.75,
    //     color: "purple",
    //     fillColor: "purple",
    //     radius: markerSize(locations[i].city.population)
    //   })
    // );
  }

  // Define variables for our base layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
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
    center: [34.00, -99.90],
    zoom: 7,
    layers: [streetmap, texas]
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

});

d3.csv("/static/csv/stats.csv", function (stats) {

  console.log(stats)

  var table = d3.select("#meta");

  Object.entries(stats).forEach(function ([key, value]) {

    table.append("p").text(`${key}: ${value}`)
  });
})

