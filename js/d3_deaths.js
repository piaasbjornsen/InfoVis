
  // set the dimensions and margins of the graph
  var containerDiv = d3.select("#cause_of_death_div");

  var margin = { top: 50, right: 50, bottom: 260, left: 200 };
  var aspectRatio = 2 / 4; // You can adjust this ratio based on your preference

  var width = containerDiv.node().getBoundingClientRect().width - margin.left - margin.right;;
  var height = containerDiv.node().getBoundingClientRect().width * aspectRatio - margin.bottom - margin.top;

  
  // append the svg object to the body of the page
  var svg = containerDiv
    .append("svg")
    .attr("width", containerDiv.node().getBoundingClientRect().width)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   
  // Parse the Data
  d3.csv("assets/csv/out_dis.csv").then(function (data) {
    // X axis
    var x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(function (d) { return d.Diseases; }))
      .padding(0.2);

      svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
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
      .range([height, 0]);
    svg.append("g")
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
    var mouseover = function (d) {
      Tooltip.style("opacity", 1);
    };
    
    var mousemove = function (event) {
      var d = event.target.__data__; // Accessing the data associated with the element
    
      if (d) {
        console.log("Data associated with the element: ", d);
    
        Tooltip.html("Number of deaths: " + d.Deaths)
          .style("left", event.pageX + "px")  // Adjust the left position
          .style("top", (event.pageY - 30) + "px");  // Adjust the top position
      } else {
        console.log("No data associated with the element");
      }
    };
    
    var mouseleave = function (d) {
      Tooltip.style("opacity", 0);
    };
    
    // Bars
    svg.selectAll("mybar")
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
      .attr("height", function (d) { return height - y(0); }) // always equal to 0
      .attr("y", function (d) { return y(0); });

    // Animation
    svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) { return y(d.Deaths); })
      .attr("height", function (d) { return height - y(d.Deaths); })
      .delay(function (d, i) { return (i * 100); });
  });