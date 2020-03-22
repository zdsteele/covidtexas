d3.csv("/static/csv/harris_stats.csv").then(function(harris_stats) {
    // Example found from here
    // http://bl.ocks.org/yan2014/c9dd6919658991d33b87
    var harrisArray = [];

    harris_stats.forEach(function(row, i) {

        harrisArray.push([row.Sex, row.Location, row.Age_Range, row.Status])
    });

    var table = d3.select("#table")
    var header = table.append("thead").append("tr");
    header
        .selectAll("th")
        .data(["Sex", "Location", "Age_Range", "Status"])
        .enter()
        .append("th")
        .text(function(d) { return d; });

    var tablebody = table.append("tbody");
    rows = tablebody
        .selectAll("tr")
        .data(harrisArray)
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
    $(document).ready(function() {
        $('#table').DataTable({
            "scrollY": "50vh",
            "scrollCollapse": true,
            paging: false,
        });
        $('.dataTables_length').addClass('bs-select');
    });

});


//  Plotly Graphs 
d3.csv("/static/csv/harris_stats.csv").then(function(plotData) {


    var gender = []

    plotData.forEach(function(object, index) {

        gender.push(object.Sex)

    });

    // Counting the number of Males and Females in Harris County
    var genderCounts = counts(gender)
    var female = genderCounts.Female
    var male = genderCounts.Male


    var pie_data = [{
        values: [female, male],
        labels: ['Female', 'Male'],
        type: 'pie'
    }];

    var pie_layout = {
        height: 400,
        width: 500
    };

    Plotly.newPlot('pie', pie_data, pie_layout)


});