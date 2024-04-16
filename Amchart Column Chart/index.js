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

