var root = am5.Root.new("chartdiv")

var chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
        startAngle: 180,
        endAngle: 360,
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

// Create range
var rangeDataItem = axis.makeDataItem({
    value: 0,
    endValue: 100
});

var range = axis.createAxisRange(rangeDataItem);

rangeDataItem.get("axisFill").setAll({
    fill: "#abc",
    fillOpacity: 0.6
});

function createRange(start, end, color, label) {
  
    var rangeDataItem = axis.makeDataItem({
      value: start,
      endValue: end
    });
  
    var range = axis.createAxisRange(rangeDataItem);
    
    rangeDataItem.get("axisFill").setAll({
      visible: true,
      fill: color,
      fillOpacity: 0.8,
      innerRadius: -40
    });
    
    rangeDataItem.get("tick").setAll({
      visible: false
    });
    
    rangeDataItem.get("label").setAll({
      text: label,
      inside: true,
      innerRadius: -50,
      fontSize: "0.9em",
      fill: am5.color(0xffffff)
    });
  
  }
  
  createRange(0, 70, am5.color(0xff621f), "Good");
  createRange(70, 90, am5.color(0x946B49), "Better");
  createRange(90, 100, am5.color(0x297373), "Best");

// Create clock hand
var handDataItem = axis.makeDataItem({
    value: 50
  });
  handDataItem.set("value", 80);
  var hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
    sprite: am5radar.ClockHand.new(root, {
      radius: am5.percent(99)
    })
  }));
  
  axis.createAxisRange(handDataItem);