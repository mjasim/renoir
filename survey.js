populate_color();

function fill_color(divColorHTML, shades) {
    for (var j in shades) {
        divColorHTML = divColorHTML + '<svg width="20%" height="100%" viewBox="0 0 100 100" style="padding-bottom:10px">' + '<rect class="colorBox" rx="1" ry="1" width="100%" height="100%"' + 'style="fill:' + shades[j] + '"\/>' + '</svg>'
    }
    return divColorHTML;
}

function populate_color() {

    var colors = ["red", "yellow", "green", "blue", "purple", "gray"];
    var red = ["#E53935", "#F44336", "#EF5350", "#E57373", "#EF9A9A"];
    var yellow = ["#FDD835", "#FFEB3B", "#FFEE58", "#FFF176", "#FFF59D"];
    var green = ["#43A047", "#4CAF50", "#66BB6A", "#81C784", "#A5D6A7"];
    var blue = ["#1E88E5", "#2196F3", "#42A5F5", "#64B5F6", "#90CAF9"];
    var purple = ["#5E35B1", "#673AB7", "#7E57C2", "#9575CD", "#B39DDB"];
    var gray = ["#757575", "#9E9E9E", "#BDBDBD", "#E0E0E0", "#EEEEEE"];

    for (var i in colors) {
        divColor = document.createElement("div")
        divColor.className = "colorDiv"
        divColor.id = "colorDivId-" + colors[i];

        if (colors[i] == "red")
            shades = red;
        else if (colors[i] == "yellow")
            shades = yellow;
        else if (colors[i] == "green")
            shades = green;
        else if (colors[i] == "blue")
            shades = blue;
        else if (colors[i] == "purple")
            shades = purple;
        else if (colors[i] == "gray")
            shades = gray;

        var divColorHTML = "<div class=\"color_body" + colors[i] + "\">";
        divColor.innerHTML = divColorHTML + fill_color(divColorHTML, shades);
        var element = document.getElementById("survey_color");
        element.appendChild(divColor);
    }
}