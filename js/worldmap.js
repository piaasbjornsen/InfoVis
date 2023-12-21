// Initial setup
const svgContainer = d3.select("#worldmap-svg");
const containerWidth = svgContainer.node().getBoundingClientRect().width; // Get container width
const worldmap =
	"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const worldattackcount = "assets/csv/code_attacks.csv";
const data = new Map();

const svgMap = svgContainer
	.append("svg")
	.attr("width", containerWidth) // Set SVG width to container width
	.attr("height", containerWidth); // Maintain aspect ratio (width:height = 800:500)

let centered, world;

// Style of geographic projection and scaling
const projection = d3
	.geoRobinson()
	.scale(130)
	.translate([containerWidth / 2, (containerWidth * 0.625) / 2]); // Adjust translate based on aspect ratio

const path = d3.geoPath().projection(projection);

// Define color scale
const colorScale = d3
	.scaleThreshold()
	.domain([10, 100, 300, 500, 1000, 3000, 10000, 15000])
	.range(d3.schemeOrRd[9]);

// Add tooltip
const tooltip = d3
	.select("body")
	.append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

// Load external data and boot
// Load external data and boot
const promise1 = d3.json(worldmap);
const promise2 = d3.csv(worldattackcount);

Promise.all([promise1, promise2])
	.then(([topo, attackData]) => {

		// Create a map from attackData for efficient lookup	 
		const attackDataMap = new Map(attackData.map(d => [d.code, +d.count]));

		// Update the total property in topo data
		topo.features.forEach(feature => {
			const code = feature.id;

			const matchingAttack = attackData.find(entry => entry.code === code);
			feature.attackCount = (feature.attackCount || 0) + (matchingAttack ? +matchingAttack.count : 0);
		});



		ready(null, topo, attackData);
	})
	.catch(error => {
		console.error('Error loading data:', error);
		ready(error, null, null);
	});
// Add clickable background
svgMap
	.append("rect")
	.attr("class", "background")
	.attr("width", containerWidth) // Change variable name from 'width' to 'mapWidth'
	.attr("height", containerWidth * 0.625) // Change variable name from 'height' to 'mapHeight'
	.on("click", click);

// ----------------------------
// Start of Choropleth drawing
// ----------------------------

function ready(error, topo, attackData) {

	if (error) {
		console.error("Error in ready function:", error);
		// Handle errors more gracefully if needed
	}
	let mouseOver = function (event, d) {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", 0.5)
			.style("stroke", "transparent");

		d3.select(this)
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "black");

		tooltip
			.style("left", event.pageX + 15 + "px")
			.style("top", event.pageY - 28 + "px")
			.transition()
			.duration(400)
			.style("opacity", 1)
			.text(d.properties.name + ": " + d.attackCount);
	};

	let mouseLeave = function () {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "transparent");
		tooltip.transition().duration(300).style("opacity", 0);
	};

	// Draw the map
	world = svgContainer.append("g").attr("class", "world");
	world
		.selectAll("path")
		.data(topo.features)
		.enter()
		.append("path")
		.attr("d", d3.geoPath().projection(projection))
		.attr("data-name", function (d) {
			return d.properties.name;
		})
		.attr("fill", function (d) {
			return colorScale(d.attackCount);
		})
		.style("stroke", "transparent")
		.attr("class", function (d) {
			return "Country";
		})
		.attr("id", function (d) {
			return d.properties.id;
		})
		.style("opacity", 1)
		.on("mouseover", mouseOver)
		.on("mouseleave", mouseLeave)
		.on("click", click);
	// Legend
	const x = d3.scaleLinear().domain([2.6, 75.1]).rangeRound([600, 860]);

	const legend = svgMap
		.append("g") // Change variable name from 'svg' to 'svgMap'
		.attr("id", "legend");

	const legend_entry = legend
		.selectAll("g.legend")
		.data(
			colorScale.range().map(function (d) {
				d = colorScale.invertExtent(d);
				if (d[0] == null) d[0] = x.domain()[0];
				if (d[1] == null) d[1] = x.domain()[1];
				return d;
			})
		)
		.enter()
		.append("g")
		.attr("class", "legend_entry");

	const ls_w = 20,
		ls_h = 20;

	legend_entry
		.append("rect")
		.attr("x", 20)
		.attr("y", function (d, i) {
			return containerWidth * 0.625 - i * ls_h - 2 * ls_h; // Change variable name from 'height' to 'mapHeight'
		})
		.attr("width", ls_w)
		.attr("height", ls_h)
		.style("fill", function (d) {
			return colorScale(d[0]);
		})
		.style("opacity", 0.8);

	legend_entry
		.append("text")
		.attr("x", 50)
		.attr("y", function (d, i) {
			return containerWidth * 0.625 - i * ls_h - ls_h - 6; // Change variable name from 'height' to 'mapHeight'
		})
		.text(function (d, i) {
			if (i === 0) return "< " + d[1];
			if (i === 8) return " > " + 15000;
			if (d[1] < d[0]) return d[0];
			return d[0] + " - " + d[1];
		});

	legend.append("text").attr("x", 15).attr("y", 235).text("Attacks");
}

// Zoom functionality
function click(d) {

	var x, y, k;

	if (d && centered !== d) {
		// Calculate centroid and set translation values and scale
		var centroid = path.centroid(d);
		x = -(centroid[0] * 6);
		y = centroid[1] * 6;
		k = 3;
		centered = d;
	} else {
		// Reset translation values and scale
		x = 0;
		y = 0;
		k = 1;
		centered = null;
	}

	// Apply the 'active' class to the clicked country and transition
	world.selectAll("path")
		.classed("active", function (country) { return centered && country === centered; });

	// // Apply the translation and scale with transition
	// world.transition()
	// 	.duration(750)
	// 	.attr("transform", "translate(" + x + "," + y + ") scale(" + k + ")");

	// // Access attackCount property from the bound data
	// var d = event.target.__data__;
	// if (d) {
	// 	var attackCount = d.attackCount;
	// 	console.log("Attack Count:", attackCount);
	// }
}
