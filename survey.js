selected_emo = "";
selected_color = "";

all_emo = ["emoboxexcited", "emoboxhappy", "emoboxneutral", "emoboxconcerned", "emoboxangry"]
colors = ["red", "yellow", "green", "blue", "purple", "gray"];

emo = {
    emoboxexcited: "Excited",
    emoboxhappy: "Happy",
    emoboxneutral: "Neutral",
    emoboxconcerned: "Concerned",
    emoboxangry: "Angry"
}

populate_color();
populate_emo();

function fill_color(divColorHTML, shades, i) {
    for (var j in shades) {
        divColorHTML = divColorHTML + '<div class="square_color" ' + 'id=color_' + i + "_" + j + ' style="background-color:' + shades[j] + '"\/>' + '</div>'
    }
    return divColorHTML;
}

function populate_emo() {
    for (var i = 0; i < all_emo.length; i++) {
        emotionColor = localStorage.getItem(emo[all_emo[i]].toLowerCase())
        // console.log(emotionColor)
        if (emotionColor === null) {
            document.getElementById(all_emo[i]).setAttribute("style", "background-color:#E9ECEF")
        }
        else {
            document.getElementById(all_emo[i]).setAttribute("style", "background-color:" + emotionColor)
        }
    }
}

function populate_color() {

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

        var divColorHTML = "";
        divColor.innerHTML = fill_color(divColorHTML, shades, i);
        var element = document.getElementById("survey_color");
        element.appendChild(divColor);
    }
}

function tagColor(current_fill) {
    for (var i in colors) {
        for (var j in shades) {
            var id = "color_" + i + "_" + j;
            var this_fill = document.getElementById(id).getAttribute("style").slice(0, 24);
            if (this_fill == current_fill) {
                document.getElementById(id).setAttribute("style", this_fill + "; outline:dashed thick black;")
            }
            else {
                document.getElementById(id).setAttribute("style", this_fill)
            }
        }
    }
}



function check_missing() {
    var empty = [];
    for (var i = 0; i < all_emo.length; i++) {
        var current_fill = document.getElementById(all_emo[i]).getAttribute("style").slice(0, 24);
        console.log(current_fill)
        if (current_fill == "background-color:#E9ECEF") {
            empty.push(all_emo[i])
        }
    }

    if (empty.length != 0) {
        var log = "You missed ";
        for (var i in empty) {
            log = log + emo[empty[i]] + ", ";
        }

        log = log.slice(0, -2);
        console.log(log);
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + log + '</span>';
        str = "missing"
        logInteraction(str)
        return true
    }
    else {
        return false
    }
}

function check_duplicate() {
    var box = [];
    for (var i = 0; i < all_emo.length; i++) {
        var x = document.getElementById(all_emo[i]).getAttribute("style").slice(0, 24)
        for (var j = i; j < all_emo.length; j++) {
            var y = document.getElementById(all_emo[j]).getAttribute("style").slice(0, 24)
            if (x == y && all_emo[i] != all_emo[j]) {
                box.push(emo[all_emo[i]])
                box.push(emo[all_emo[j]])
            }
        }
    }

    if (box.length != 0) {
        var log = "There are duplicates in ";

        box = Array.from(new Set(box))
        for (var i in box) {
            log = log + box[i] + ", ";
        }

        log = log.slice(0, -2);
        console.log(log);
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i></span>' + log;
        str = "duplicate"
        logInteraction(str)
        return true
    }
    else {
        return false
    }
}


$(document).ready(function () {
    $('.square_emo').click(function () {
        id = $(this).attr('id')
        selected_emo = id;

        for (var i = 0; i < all_emo.length; i++) {
            var current_fill = document.getElementById(all_emo[i]).getAttribute("style").slice(0, 24);
            console.log(current_fill)
            document.getElementById(all_emo[i]).setAttribute("style", current_fill);
        }

        var current_fill = document.getElementById(selected_emo).getAttribute("style").slice(0, 24);
        document.getElementById(selected_emo).setAttribute("style", current_fill + "; outline:solid thick black;");

        tagColor(current_fill);

        str = "emo" + "," + selected_emo;
        logInteraction(str)
    });
});

last_color = ""

$(document).ready(function () {
    $('.square_color').click(function () {
        id = $(this).attr('id')
        selected_color = id;

        new_color = document.getElementById(selected_color).getAttribute("style").slice(0, 24);

        document.getElementById(selected_emo).setAttribute("style", new_color + "; outline:solid thick black;");

        if (last_color) {
            temp_color = document.getElementById(last_color).getAttribute("style").slice(0, 24);
            document.getElementById(last_color).setAttribute("style", temp_color + "; outline:none");
        }

        document.getElementById(selected_color).setAttribute("style", new_color + "; outline:solid thick black");
        last_color = selected_color;

        str = "color" + "," + selected_color;
        logInteraction(str)
    });
});

$(document).ready(function () {
    $('#survey_footer_next').click(function () {

        if (!check_missing()) {
            if (!check_duplicate()) {
                console.log("all clear")
                localStorage.setItem("excited", document.getElementById("emoboxexcited").getAttribute("style").slice(17, 24));
                localStorage.setItem("happy", document.getElementById("emoboxhappy").getAttribute("style").slice(17, 24))
                localStorage.setItem("neutral", document.getElementById("emoboxneutral").getAttribute("style").slice(17, 24))
                localStorage.setItem("concerned", document.getElementById("emoboxconcerned").getAttribute("style").slice(17, 24))
                localStorage.setItem("angry", document.getElementById("emoboxangry").getAttribute("style").slice(17, 24))
                value = $("#colorCommentBox").val();
                localStorage.setItem("color_comment", value)
                console.log(localStorage)
                window.open('questionnaire.html', '_self')
            }
        }
        else {
            console.log("Errors")
        }
    });
});