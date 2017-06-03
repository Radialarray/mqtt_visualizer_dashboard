var d3 = require("d3");
var $ = require("jquery");
var theData = [ 1, 2, 3 ]

var margin, width, barHeight, percent,x,y;
 var initGrapher = function(d3Data) {
  //  var p = d3.select("#lines")
  //    .data(theData)
  //    .append("svg")
  // set the dimensions and margins of the graph
  var d3Data = d3Data;

  // width = 1000;
  //     height = 1000;
  // x = d3.scaleLinear().domain([0, d3Data.length]).range([0, width]),
  //     y = d3.scaleLinear().domain([0, d3.max(d3Data)]).range([height,0]);


  var viewportWidth = $(window).width();
var viewportHeight = $(window).height()/2;
 width = viewportWidth * .97;
  height = width/1.85;
x = d3.scaleLinear().domain([0, d3Data.length]).range([0, width]),
    y = d3.scaleLinear().domain([0, d3.max(d3Data)]).range([height,0]);

  //  margin = {top: 30, right: 10, bottom: 30, left: 10};
  // width = parseInt(d3.select('#lines').style('width'), 10);
  // width = width - margin.left - margin.right;
  // height = parseInt(d3.select('#lines').style('height'), 10);
  //   // scales and axes
  //    x = d3.scaleLinear()
  //       .range([0, width])
  //       .domain([0, .4]); // hard-coding this because I know the data
  //
  //   // ordinal scales are easier for uniform bar heights
  //   // I'll set domain and rangeBands after data loads
  //    y = d3.scaleLinear();



  /*
    add a visualisation,
    select the body tag,
    join the data array to to the body tag for our next data driven moves,
    append an svg container tag,
    give it the right width,
    give it the right height as well,
  */
  var visualisation = d3
  .select("#lines")
  .data([d3Data])
  .append("svg")
  .attr("width", width)
  .attr("height", height);


  /*
  this is the line to put on the graph
  append a path tag as a child of the svg tag we added to the body tag,
  apply css style to make the line blue
  */
  visualisation
  .append("path")
      .attr("class", "line")
      .attr("d", d3.line()
      .x(function(d,i) {return x(i);})
      .y(function(d) {return y(d); }));


      // Add the x Axis
 visualisation.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));


 // Add the y Axis
 visualisation.append("g")
 .attr("transform", "translate(0," + width + ")")
     .call(d3.axisRight(y));

 }



 d3.select(window).on('resize', resize);

 function resize() {

     width = parseInt(d3.select('#lines').style('width'));
     width = $(window).width() * .97;
     height = width/1.85;

    // projection
    //  	.scale([width/3.5])
    // 		.translate([width/1,height*1.4]);


    d3.select("#lines").attr("width",width).attr("height",height);
    d3.select("svg").attr("width",width).attr("height",height);



 }




 function updateGrapher(d3Data) {
   var d3Data = d3Data;
         // Scale the range of the data again
         x = d3.scaleLinear().domain([0, d3Data.length]).range([0, width]),
             y = d3.scaleLinear().domain([0, d3.max(d3Data)]).range([height,0]);


     // Select the section we want to apply our changes to
     var svg = d3.select("#lines").transition();

     // Make the changes
         svg.select(".line")   // change the line
             .duration(100)
             .attr("d", d3.line()
             .x(function(d,i) {return x(i);})
             .y(function(d) {return y(d); }));
     }
