
var containerAttacks = d3.select("#attacks-10yr-div");
// set the dimensions and margins of the graph
var marginA = { top: 100, right: 60, bottom: 60, left: 60 },
    widthA = containerDiv.node().getBoundingClientRect().width - marginA.left - marginA.right,
    heightA = containerDiv.node().getBoundingClientRect().width * aspectRatio - marginA.bottom - marginA.top,
    innerRadius = 90,
    outerRadius = Math.min(widthA, heightA) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svgAttack = containerAttacks
    .append("svg")
    .attr("width", widthA + marginA.left + marginA.right)
    .attr("height", heightA + marginA.top + marginA.bottom)
    .append("g")
    .attr("transform", "translate(" + (widthA / 2 + marginA.left) + "," + (heightA / 2 + marginA.top) + ")");

// Load data using d3.csv in d3 v5
d3.csv("assets/csv/attacks_by_country_10y.csv").then(function(data) {
  // Scales
  var x = d3.scaleBand()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0)                  // This does nothing
    .domain(data.map(function (d) { return d.Country; })); // The domain of the X axis is the list of states.
  var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])   // Domain will be define later.
    .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data

  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([20995, 2494])
  // create a tooltip
  var Tooltip = d3.select("#attacks-10yr")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function (d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function (d) {
    Tooltip
      .html("Number of incidents: " + d['Attack_Count'])
      .style("left", (d3.mouse(this)[0] + 100) + "px")
      .style("top", (d3.mouse(this)[1] + 350) + "px")
  }
  var mouseleave = function (d) {
    Tooltip
      .style("opacity", 0)
  }

  // Add the bars
  svgAttack.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", function (d) { return myColor(d['Attack_Count']) })
    // .attr("fill",  "heatmap")
    .attr("d", d3.arc()     // imagine your doing a part of a donut plot
      .innerRadius(innerRadius)
      .outerRadius(function (d) { return y(d['Attack_Count']); })
      .startAngle(function (d) { return x(d.Country); })
      .endAngle(function (d) { return x(d.Country) + x.bandwidth(); })
      .padAngle(0.01)
      .padRadius(innerRadius))
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
  // Add the labels
  svgAttack.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("text-anchor", function (d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
    .attr("transform", function (d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d['Attack_Count']) + 10) + ",0)"; })
    .append("text")
    .text(function (d) { return (d.Country) })
    .attr("transform", function (d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
    .style("font-size", "11px")
    .attr("alignment-baseline", "middle")

});