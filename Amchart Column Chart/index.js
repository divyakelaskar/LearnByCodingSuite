var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);
myTheme.rule(Axislabel, ["minor"]).setAll({
    dy: 1
});

root.setThemes([
    am5themes_Animated.new(root),
    myTheme,
    am5themes_Responsive.new(root)
])

var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    paddingLeft: 0
}));

var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomX"
}));

// dotted line for easy visibility
cursor.lineY.set("visible", false);
cursor.lineX.set("visible", false);

var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}