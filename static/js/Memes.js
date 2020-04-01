d3.csv("/static/csv/memes.csv").then(function(Meme_data) {


    console.log(Meme_data)

    var images = d3.select('#meme_place').selectAll('div')
        .data(Meme_data)
        .enter()
        .append('div')
        .style('margin-bottom', '20px')
        .style('border', '5px solid black')
        .style('width', 'fit-content')
        .html(function(d) {

            return "<img" + " " + "src=" + String(d.Memes) + ">"

        })

});

// help


// function Go_Scrape() {
//     d3.json('/Scrape').then(function(meme_object) {


//         var images = d3.select('#meme_place').selectAll('div')
//             .data(meme_object)
//             .enter()
//             .append('div')
//             .style('margin-bottom', '20px')
//             .style('border', '5px solid black')
//             .style('width', 'fit-content')
//             .html(function(d) {

//                 return "<img" + " " + "src=" + String(d.Memes) + ">"
//             })
//     });

//     var closer = function() {
//         document.getElementById("load").style.display = 'none'
//     };

//     closer();

// };

// d3.select('#scraper').on("click", () => {
//     d3.select('#load').style('display', "block")
// });