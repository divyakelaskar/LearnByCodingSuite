var root = am5.Root.new("chartdiv")

var chart = root.container.children.push(
    am5radar.RadarChart.new(root, {
        startAngle: -180,
        endAngle: 0,
    }) 
);

var axis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
        min:0,
        max:100,
        renderer: am5radar.AxisRendererCircular.new(root, {})  
    })
);

