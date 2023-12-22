
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
width = 750 - margin.left - margin.right,
height = 480 - margin.top - margin.bottom;

var svg = d3.select("#sankey-diagram").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scaleOrdinal(d3.schemeDark2);

var sankey = d3.sankey()
.nodeWidth(36)
.nodePadding(10)
.size([width, height]);

var tooltipSankey = d3.select("#sankey-diagram")
.append("div")
.attr("class", "sankey-tooltip")
.style("opacity", 0);

d3.json("assets/sankey-data.json").then(function(graph) {
sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

var link = svg.append("g")
    .selectAll(".sankey-link")
    .data(graph.links)
    .enter()
    .append("path")
    .attr("class", "sankey-link")
    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    .sort(function(a, b) { return b.dy - a.dy; })
    .on("mouseover", function(event, d) { 
        d3.select(this)
              .style("stroke-opacity", 0.5);
        tooltipSankey.transition()
            .duration(200)
            .style("opacity", .9);
        tooltipSankey.html("Attacks: " + d.value + "<br/>Year: " + d.Year)
            .style("left", (event.pageX) + "px") 
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        d3.select(this).style("stroke-opacity", 0.2);
        tooltipSankey.transition()
            .duration(500)
            .style("opacity", 0);
    });

var node = svg.append("g")
    .selectAll(".sankey-node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "sankey-node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.drag()
        .subject(function(d) { return d; })
        .on("start", function() { this.parentNode.appendChild(this); })
        .on("drag", function(event, d) {
            d3.select(this)
                .attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, event.y))) + ")");
            sankey.relayout();
            link.attr("d", sankey.link());
        }));

node.append("rect")
    .attr("height", function(d) { return d.dy; })
    .attr("width", sankey.nodeWidth())
    .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
    .style("stroke", function(d) { return d3.rgb(d.color).darker(2); });

node.append("text")
    .attr("x", -6)
    .attr("y", function(d) { return d.dy / 2; })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");

}).catch(function(error) {
console.log(error);
});