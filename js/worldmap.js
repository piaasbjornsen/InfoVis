// Initial setup
const svgContainer = d3.select("#worldmap-div");
const containerWidth = svgContainer.node().getBoundingClientRect().width; // Get container width
const containerHeight = containerWidth * 0.625; // Set height proportionally
const worldmap = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const worldattackcount = "assets/csv/code_attacks.csv";

const svgMap = svgContainer
	.append("svg")
	.attr("width", containerWidth)
	.attr("height", containerHeight);

let centered;

// Style of geographic projection and scaling - initially set up for the container's width
const projection = d3.geoRobinson()
	.scale(containerWidth / 6.5)
	.translate([containerWidth / 2, containerHeight / 2]);

const path = d3.geoPath().projection(projection);

// Define color scale
const colorScale = d3.scaleThreshold()
	.domain([10, 100, 300, 500, 1000, 3000, 10000, 15000])
	.range(d3.schemeOrRd[9]);

// Add tooltip
const tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

// Load external data and boot
Promise.all([
	d3.json(worldmap),
	d3.csv(worldattackcount, d => ({ code: d.code, count: +d.count }))
])
	.then(([topo, attackData]) => {
		ready(null, topo, attackData);
	})
	.catch(error => {
		console.error("Error loading data:", error);
		ready(error, null, null);
	});

function ready(error, topo, attackData) {
	if (error) {
		console.error("Error in ready function:", error);
		return;
	}

	let attackDataMap = new Map(attackData.map(d => [d.code, d.count]));

	topo.features.forEach(feature => {
		feature.total = attackDataMap.get(feature.id) || 0;
	});

	let mouseOver = function (event, d) {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", .5)
			.style("stroke", "transparent");
		d3.select(this)
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "black");
		tooltip
			.style("left", (event.pageX + 15) + "px")
			.style("top", (event.pageY - 28) + "px")
			.transition().duration(400)
			.style("opacity", 1)
			.text(d.properties.name + ': ' + d.total);
	};

	let mouseLeave = function () {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "transparent");
		tooltip.transition().duration(300)
			.style("opacity", 0);
	};

	// Draw the map
	let world = svgMap.append("g").attr("class", "world");
	world.selectAll("path")
		.data(topo.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("fill", d => colorScale(d.total))
		.attr("class", "Country")
		.on("mouseover", mouseOver)
		.on("mouseleave", mouseLeave)
		.on("click", click);

// Legend setup
const legendMargin = { top: 20, right: 20, bottom: 30, left: 20 };
const legendHeight = containerHeight * 0.4; // 40% of container height
const legendRectSize = 20; // Height of each legend rectangle
const numberOfRects = colorScale.range().length;

const legend = svgMap.append("g")
  .attr("id", "legend")
  .attr("transform", `translate(${legendMargin.left}, ${containerHeight - legendHeight - legendMargin.bottom})`);

const legendEntry = legend.selectAll("g.legend_entry")
  .data(colorScale.range().map(d => colorScale.invertExtent(d))) // Keep original order
  .enter().append("g")
  .attr("class", "legend_entry")
  .attr("transform", (d, i) => `translate(0, ${legendHeight - (i + 1) * legendRectSize})`); // Place topmost rect at the bottom

legendEntry.append("rect")
  .attr("width", legendRectSize)
  .attr("height", legendRectSize)
  .style("fill", (d, i) => i === 0 ? colorScale.range()[0] : colorScale(d[0])); // Adjust color for the first rect

legendEntry.append("text")
  .attr("x", legendRectSize + 5) // Offset by 5px from the right of the rect
  .attr("y", legendRectSize / 2) // Align vertically to the middle of the rect
  .attr("dy", "0.35em") // Center text vertically
  .text(function(d, i) {
	if (i === 0) return "< " + d[1];
	if (i === 8) return " > " + 15000;
	if (d[1] < d[0]) return d[0];
	return d[0]+ " - " + d[1];
})
  .style("font-size", "10px");

// Calculate the position for the "Attacks" text
const attacksTextYPosition = legendHeight - (numberOfRects * legendRectSize) - 10;

legend.append("text")
  .attr("x", 0)
  .attr("y", attacksTextYPosition)
  .text("Attacks")
  .style("font-size", "12px");




}

// Zoom functionality
function click(d) {
	var x, y, k;

	if (d && centered !== d) {
		var centroid = path.centroid(d);
		x = -(centroid[0] * 6);
		y = (centroid[1] * 6);
		k = 3;
		centered = d;
	} else {
		x = 0;
		y = 0;
		k = 1;
		centered = null;
	}

	world.selectAll("path")
		.classed("active", centered && function (d) { return d === centered; });

	world.transition()
		.duration(750)
		.attr("transform", "translate(" + x + "," + y + ") scale(" + k + ")");
}
