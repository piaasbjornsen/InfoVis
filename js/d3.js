
  //casualties by year 
  // set the dimensions and margins of the graph
  var container = document.getElementById('casualties-per-year');

  var margin = {top: 10, right: 30, bottom: 20, left: 60};
  var aspectRatio = 2 / 4; // You can adjust this ratio based on your preference

  // Get the width and height of the container

  // Calculate width and height based on the container size
  var width = (container.clientWidth - margin.left - margin.right);
  var height = width * aspectRatio;

  // Append the SVG object to the body of the page
  var svg = d3.select("#casualties-per-year")
    .append("svg")
      .attr("width", container.clientWidth)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("assets/csv/number_terrorist_attacks_casualties_per_year.csv")
    .then(function(data) {

      // Format the data
      data.forEach(function(d) {
        d.date = d3.timeParse("%Y")(d.year);
        d.value = +d.casualities;
      });

      // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .style("stroke", "white");

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y))
        .style("stroke", "white");


      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.value); })
        );

      var Tooltip = d3.select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "9px")
        .style("padding", "10px")
        .style("position", "absolute");

      // Three functions that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        Tooltip
          .style("opacity", 1)
          .html("Year : " + d.date.getFullYear() + "<br/>" + " Casualties : " + d.value);
      };
      var mousemove = function(d) {
        Tooltip
          .html("Year : " + d.date.getFullYear() + "<br/>" + " Casualties : " + d.value)
          .style("left", (d3.mouse(this)[0] + 70) + "px")
          .style("top", (d3.mouse(this)[1] + 5150) + "px");
      };
      var mouseleave = function() {
        Tooltip
          .style("opacity", 0);
      };

      // Add the points
      svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "myCircle")
          .attr("cx", function(d) { return x(d.date); })
          .attr("cy", function(d) { return y(d.value); })
          .attr("r", 2.5)
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 2)
          .attr("fill", "white")
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave);

    })
    .catch(function(error) {
      console.error("Error reading the CSV file:", error);
    });


    // 0 on intersection of axis needs to be removed
    // mouseover need to work and render