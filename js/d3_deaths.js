
// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 190, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("out_dis.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Diseases; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 2700000000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Interactive bar


// create a tooltip
var Tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
    Tooltip
        .style("opacity", 1)
    }
    var mousemove = function(d) {
    Tooltip
        .html("Number of deaths: " + d.Deaths)
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
    Tooltip
        .style("opacity", 0)
    }


//Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("class", "myCircle")
    .attr("x", function(d) { return x(d.Diseases); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.Deaths); })
  .attr("height", function(d) { return height - y(d.Deaths); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

})

// -------------------------------------------------------------------------------
// // Parse the Data
// d3.csv("out_dis.csv", function(data) {

// // Add X axis
// var x = d3.scaleLinear()
//     .domain([0, 2700000000])
//     .range([ 0, width]);
//     svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//         .attr("transform", "translate(-10,0)rotate(-45)")
//         .style("text-anchor", "end");

// // Y axis
// var y = d3.scaleBand()
//   .range([ 0, height ])
//   .domain(data.map(function(d) { return d.Diseases; }))
//   .padding(1);
// svg.append("g")
//   .call(d3.axisLeft(y))



// // Lines
// svg.selectAll("myline")
//   .data(data)
//   .enter()
//   .append("line")
//     .attr("x1", function(d) { return x(d.Deaths); })
//     .attr("x2", x(0))
//     .attr("y1", function(d) { return y(d.Diseases); })
//     .attr("y2", function(d) { return y(d.Diseases); })
//     .attr("stroke", "grey")

// // Circles
// svg.selectAll("mycircle")
//   .data(data)
//   .enter()
//   .append("circle")
//     .attr("cx", function(d) { return x(d.Deaths); })
//     .attr("cy", function(d) { return y(d.Diseases); })
//     .attr("r", "4")
//     .style("fill", "#69b3a2")
//     .attr("stroke", "black")
// })          



//--------------------------------------------   
// // Parse the Data
// d3.csv("out_dis.csv", function(data) {

// // X axis
// var x = d3.scaleBand()
//   .range([ 0, width ])
//   .domain(data.map(function(d) { return d.Diseases; }))
//   .padding(0.2);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))
//   .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

// // Add Y axis
// var y = d3.scaleLinear()
//   .domain([0, 2700000000])
//   .range([ height, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));

// // Bars
// svg.selectAll("mybar")
//   .data(data)
//   .enter()
//   .append("rect")
//     .attr("x", function(d) { return x(d.Diseases); })
//     .attr("y", function(d) { return y(d.Deaths); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.Deaths); })
//     .attr("fill", "#69b3a2")

// })