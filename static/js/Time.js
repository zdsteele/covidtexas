function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/county_names").then(function(sampleNames) {
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

    d3.json(time_data).then(function(data) {


        x_axis = Object.keys(data);
        y_axis = Object.values(data);
        console.log(x_axis)

        var trace = [{
            x: x_axis,
            y: y_axis,
            mode: 'markers',
            text: y_axis
        }];

        var layout = {
            title: `Cases for ${county} County`,
            xaxis: { title: "Date(MM/DD)" },
            yaxis: { title: "Cumulative COVID-19 Cases" }
        };

        Plotly.newPlot("scatter", trace, layout)




    })


};


function optionChanged(newCounty) {
    // Fetch new data each time a new sample is selected
    Scatter_Plot(newCounty);

}


init();