var d3 = require("d3");
var $ = require("jquery");
var initPiechart = function(d3Data) {
  var d3Data = d3Data;
  var data = [d3Data[0], d3Data[1], d3Data[2]];

  var width = 200,
    height = 200,
    radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

 var pie = d3.pie()
    .sort(null)
    .value(function(d) {
      return d;
    });

  var svg = d3.select("#piechart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .attr("fill", function(d,i) {
       return color(d.data.region)
     })
    .style("fill", function(d) {
      return color(d.data);
    });

  g.append("text")
    .attr("transform", function(d) {
      return "translate(" + labelArc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .text(function(d) {
      return d.data;
    });
}

var updatePiechart = function(d3Data) {
  var pie = d3.pie()
  		.value(function(d) { return d.data; })(d3data);
  	path = d3.select("#piechart").selectAll("path").data(pie); // Compute the new angles
  	path.attr("d", arc); // redrawing the path
  	d3.selectAll("text").data(pie).attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; }); // recomputing the centroid and translating the text accordingly.
  }
