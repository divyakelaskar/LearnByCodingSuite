var root = am5.Root.new("chartdiv")

var chart = root.container.children.push(
    am5radar.RadarChart.new(root, {}) 
);

var axis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
        min:0,
        max:100,
        renderer: am5radar.AxisRendererCircular.new(root, {})  
    })
);

