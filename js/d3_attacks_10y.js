var containerAttacks = d3.select("#attacks-10yr-div");

// Set the dimensions and margins of the graph
var marginA = { top: 100, right: 60, bottom: 60, left: 60 },
    widthA = containerAttacks.node().getBoundingClientRect().width - marginA.left - marginA.right,
    heightA = widthA - marginA.bottom - marginA.top,
    innerRadius = widthA/6,
    outerRadius = widthA/3;

// Append the svg object
var svgAttack = containerAttacks.append("svg")
    .attr("width", widthA + marginA.left + marginA.right)
    .attr("height", heightA + marginA.top + marginA.bottom)
  .append("g")
    .attr("transform", "translate(" + (widthA / 2 + marginA.left) + "," + (heightA / 2 + marginA.top) + ")");

// Load data using d3.csv in d3 v5
d3.csv("assets/csv/attacks_by_country_10y.csv").then(function(data) {
  // Scales
  var x = d3.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(data.map(function (d) { return d.Country; }));
  var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, 14000]);

  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([20995, 2494]);

  // Create a tooltip
  var Tooltip = d3.select("#attacks-10yr")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("position", "absolute");

    var mouseover = function(event, d) {
      Tooltip.style("opacity", 1)
             .style("z-index", 10); // Make sure the tooltip is above other elements
  };
  
  var mousemove = function(event, d) {
      // Debugging
      console.log("PageX: ", d3.event.pageX, " PageY: ", d3.event.pageY, " Attack_Count: ", event.Attack_Count);
  
      Tooltip.html("Number of incidents: " + event.Attack_Count)
             .style("left", (d3.event.pageX + 10) + "px")
             .style("top", (d3.event.pageY - 10) + "px");
  };
  
  var mouseleave = function(event, d) {
      Tooltip.style("opacity", 0)
             .style("z-index", -1); // Hide the tooltip
  };
  

  // Add the bars
  svgAttack.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("fill", function (d) { return myColor(d['Attack_Count']); })
    .attr("d", d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(function (d) { return y(d['Attack_Count']); })
      .startAngle(function (d) { return x(d.Country); })
      .endAngle(function (d) { return x(d.Country) + x.bandwidth(); })
      .padAngle(0.01)
      .padRadius(innerRadius))
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  // Add the labels
  svgAttack.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("text-anchor", function (d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
    .attr("transform", function (d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d['Attack_Count']) + 10) + ",0)"; })
    .append("text")
    .text(function (d) { return d.Country; })
    .attr("transform", function (d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
    .style("font-size", "1.7rem")
    .style("fill", "white")
    .attr("alignment-baseline", "middle");
});
