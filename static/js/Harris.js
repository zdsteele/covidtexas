d3.csv("/static/csv/harris_stats.csv").then(function(harris_stats) {
    // Example found from here
    // http://bl.ocks.org/yan2014/c9dd6919658991d33b87
    var harrisArray = [];

    harris_stats.forEach(function(row, i) {

        harrisArray.push([row.Patient, row.Sex, row.Age_Range, row.Location, row.Exposure, row.Status])
    });

    var table = d3.select("#table")
    var header = table.append("thead").append("tr");
    header
        .selectAll("th")
        .data(["Patient", "Gender", "Age_Range", 'Exposure', 'Location', "Status"])
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

    var config = { responsive: true }

    var pie_data = [{
        values: [female, male],
        labels: ['Female', 'Male'],
        textinfo: "label+percent",
        type: 'pie'
    }];

    var pie_layout = {
        title: 'Gender',
        height: 500,
        width: 500,
        margin: { "t": 50, "b": 0, "l": 0, "r": 0 },
        showlegend: false
    };

    Plotly.newPlot('pie', pie_data, pie_layout, config)


    // Counting the number of cases for each age range

    var age_ranges = []

    plotData.forEach(function(object, index) {
        age_ranges.push(object.Age_Range)
    });

    var age_range_counts = counts(age_ranges);


    var age_ranges_plot = Object.keys(age_range_counts);
    var age_ranges_plot_counts = Object.values(age_range_counts);

    var pie_data_2 = [{
        values: age_ranges_plot_counts,
        labels: age_ranges_plot,
        textinfo: "label+percent",
        type: 'pie'
    }];

    var pie_layout_2 = {
        title: 'Age Range',
        height: 500,
        width: 500,
        margin: { "t": 50, "b": 0, "l": 0, "r": 50 },
        showlegend: false
    };

    Plotly.newPlot('pie2', pie_data_2, pie_layout_2, config)





});

d3.csv("/static/csv/headlines.csv").then(function(headlines_raw) {
    console.log(headlines_raw)
    var headlines = [];
    var links = [];

    headlines_raw.forEach(function(row, i) {

        headlines.push([row.Headline])
        links.push([row.link])
    });


    var columns = ['Headline', 'link'];

    var table = d3.select('#headlines').append('table'),
        thead = table.append('thead'),
        tbody = table.append('tbody');

    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function(column) { return column; });

    var rows = tbody.selectAll('tr')
        .data(headlines_raw)
        .enter()
        .append('tr');

    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append('td')
        .html(function(d) {
            if (d.column === 'link') {
                return "<a href=" + d.value + ">" + d.value + "</a>"
            }
            return d.value;

        });

});