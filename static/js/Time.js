function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/county_names", function(sampleNames) {
        sampleNames.forEach(function(sample) {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

    });
};

function Scatter_Plot(county) {

    var time_data = `/data/${county}`;

    d3.json(time_data, function(data) {


        x_axis = Object.keys(data);
        y_axis = Object.values(data);


        var trace = [{
            x: x_axis,
            y: y_axis,
            mode: 'markers',
            text: y_axis
        }];

        var layout = {
            title: `Cases for ${county} County`,
            xaxis: { title: "Date(MM/DD)", mirror: true, showline: true },
            yaxis: { title: "Cumulative COVID-19 Cases", yaxis: { range: [0, Math.max(y_axis)] }, showline: true, mirror: true, zeroline: false },

        };

        Plotly.newPlot("scatter", trace, layout, { responsive: true })

    })
};


function optionChanged(newCounty) {
    // Fetch new data each time a new sample is selected
    Scatter_Plot(newCounty);

}


init();