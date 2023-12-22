
  // set the dimensions and margins of the graph
  var containerDiv = d3.select("#cause_of_death_div");

  var marginD= { top: 50, right: 50, bottom: 260, left: 200 };
  var aspectRatioD = 2 / 3; // You can adjust this ratio based on your preference

  var widthD = containerDiv.node().getBoundingClientRect().width - marginD.left - marginD.right;;
  var heightD = containerDiv.node().getBoundingClientRect().width * aspectRatioD - marginD.bottom - marginD.top;

  
  // append the svg object to the body of the page
  var svgD = containerDiv
    .append("svg")
    .attr("width", containerDiv.node().getBoundingClientRect().width)
    .attr("height", heightD + marginD.top + marginD.bottom)
    .append("g")
    .attr("transform", "translate(" + marginD.left + "," + marginD.top + ")");

   
  // Parse the Data
  d3.csv("assets/csv/out_dis.csv").then(function (data) {
    // X axis
    var x = d3.scaleBand()
      .range([0, widthD])
      .domain(data.map(function (d) { return d.Diseases; }))
      .padding(0.2);

      svgD
      .append("g")
      .attr("transform", "translate(0," + heightD + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("fill", function(d, i) {
          return i === 27 ? "red": "black";       // To hightlight column 27
        });

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 2700000000])
      .range([heightD, 0]);
    svgD.append("g")
      .call(d3.axisLeft(y));

    // Interactive bar
    // create a tooltip
    var Tooltip = containerDiv
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip.style("opacity", 1);
    };
    
    var mousemove = function(d) {
      Tooltip
        .html("Number of deaths: " + d.Deaths_m)
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 50) + "px");
    };
    
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0);
    };
    
    // Bars
    svgD.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "myCircle")
      .attr("x", function (d) { return x(d.Diseases); })
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .attr("height", function (d) { return heightD - y(0); }) // always equal to 0
      .attr("y", function (d) { return y(0); });

    // Animation
    svgD.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) { return y(d.Deaths); })
      .attr("height", function (d) { return heightD - y(d.Deaths); })
      .delay(function (d, i) { return (i * 100); });
  });