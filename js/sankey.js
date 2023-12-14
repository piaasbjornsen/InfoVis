var root = am5.Root.new("chartdiv"); 

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create series
var series = root.container.children.push(
  am5flow.Sankey.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    nodeWidth: 20
  })
);

series.nodes.get("colors").set("step", 2);

// Set data
series.data.setAll([
  { from: "2011", to: "Iraq", value: 10 },
  { from: "2012", to: "B", value: 10 },
  { from: "2013", to: "B", value: 10 },
  { from: "2014", to: "B", value: 10 },
  { from: "2015", to: "B", value: 10 },
  { from: "2016", to: "B", value: 10 },
  { from: "2017", to: "B", value: 10 },
  { from: "2018", to: "B", value: 10 },
  { from: "2019", to: "B", value: 10 },
  { from: "2020", to: "B", value: 10 },
  { from: "2021", to: "B", value: 10 },
  { from: "B", to: "C", value: 8 },
  { from: "C", to: "D", value: 4 },
  { from: "C", to: "E", value: 3 },
  { from: "D", to: "G", value: 5 },
  { from: "D", to: "I", value: 2 },
  { from: "D", to: "H", value: 3 },
  { from: "E", to: "H", value: 6 },
  { from: "G", to: "J", value: 5 },
  { from: "I", to: "J", value: 1 },
  { from: "H", to: "J", value: 9 }
]);

series.links.template.setAll({
    fillStyle: "solid"
  });

series.nodes.rectangles.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color("black"),
  strokeWidth: 1,
  cornerRadiusTL: 4,
  cornerRadiusTR: 4,
  cornerRadiusBL: 4,
  cornerRadiusBR: 4,
});

series.nodes.labels.template.setAll({
  x: am5.percent(50),
  centerX: am5.percent(50),
  textAlign: "center"
});