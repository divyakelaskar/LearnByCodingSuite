var root = am5.Root.new("chartdiv")

var chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
        startAngle: -180,
        endAngle: 0,
        radius: am5.percent(50), // from center to circumference
        innerRadius: -40 // from circumference to center
    })
);

var axis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        renderer: am5radar.AxisRendererCircular.new(root, {})
    })
);

// axis renderer
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
    strokeOpacity: 0.1,
    minGridDistance: 50
});

// Create range axis data item
var rangeDataItem = axis.makeDataItem({
    value: 0,
    endValue: 100
});

// Create a range
var range = axis.createAxisRange(rangeDataItem);

rangeDataItem.get("axisFill").setAll({
    fill: "#abc",
    fillOpacity: 0.6
});