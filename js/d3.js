// Casualties by year
// set the dimensions and margins of the graph
var containerDivCasualties = d3.select("#casualties-per-year-div");

var marginCasualties = { top: 10, right: 30, bottom: 20, left: 60 };
var aspectRatioCasualties = 2 / 4; // You can adjust this ratio based on your preference

// Get the width and height of the container

// Calculate width and height based on the container size
var widthCasualties = containerDivCasualties.node().getBoundingClientRect().width - marginCasualties.left - marginCasualties.right;
var heightCasualties = widthCasualties * aspectRatioCasualties;

// Append the SVG object to the body of the page
var svgCasualties = containerDivCasualties
  .append("svg")
  .attr("width", containerDivCasualties.node().getBoundingClientRect().width)
  .attr("height", heightCasualties + marginCasualties.top + marginCasualties.bottom)
  .append("g")
  .attr("transform", "translate(" + marginCasualties.left + "," + marginCasualties.top + ")");

// Read the data
d3.csv("assets/csv/number_terrorist_attacks_casualties_per_year.csv")
  .then(function (data) {
    // Format the data
    data.forEach(function (d) {
      d.date = d3.timeParse("%Y")(d.year);
      d.value = +d.casualities;
    });

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.date; }))
      .range([0, widthCasualties]);
    svgCasualties.append("g")
      .attr("transform", "translate(0," + heightCasualties + ")")
      .call(d3.axisBottom(x))
      .style("stroke", "white");

    // Add Y axis
    var y = d3.scaleLinear()
  .domain([0, d3.max(data, function (d) { return d.value; })])
  .range([heightCasualties, 0]);

    svgCasualties.append("g")
  .call(d3.axisLeft(y).tickFormat(function(d){
      return d === 0 ? "" : d; // Don't display the 0
  }))
  .style("stroke", "white");

      svgCasualties.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .defined(d => d.value !== 0) // Exclude the line when the value is zero
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.value); })
      );
    
    var TooltipCasualties = d3.select("#casualties-per-year-div")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "9px")
      .style("padding", "10px")
      .style("position", "absolute");
    
    // Three functions that change the tooltip when the user hovers/moves/leaves a cell
    var mouseoverCasualties = function (d) {
      if (d.value !== 0) {
        TooltipCasualties
          .style("opacity", 1)
          .html("Year: " + d.date.getFullYear() + "<br/>" + "Casualties: " + d.value);
      }
    };
    
    var mousemoveCasualties = function (d) {
      TooltipCasualties
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 10) + "px");
    };
    
    var mouseleaveCasualties = function () {
      TooltipCasualties.style("opacity", 0);
    };
    
    
    // Add the points
    svgCasualties.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "myCircle")
      .attr("cx", function (d) { return x(d.date); })
      .attr("cy", function (d) { return y(d.value); })
      .attr("r", 2.5)
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr("fill", "white")
      .on("mouseover", mouseoverCasualties)
      .on("mousemove", mousemoveCasualties)
      .on("mouseleave", mouseleaveCasualties);
      })
  .catch(function (error) {
    console.error("Error reading the CSV file:", error);
  });

// 0 on intersection of axis needs to be removed
// mouseover needs to work and render
