selected_emo = "emoboxangry";
selected_color = "";

row1 = ["#D40000", "#FF7D00", "#FFE854", "#00B400", "#008000", "#0089E0", "#0000C8", "#DE00DE", "#000001"]
row2 = ["#FF0000", "#FFA854", "#FFFF54", "#54FF54", "#009600", "#59BDFF", "#5151FF", "#FF54FF", "#757575"]
row3 = ["#FF8C8C", "#FFC48C", "#FFFFB1", "#8CFF8C", "#8CC68C", "#A5DBFF", "#8C8CFF", "#FFC6FF", "#9E9E9E"]
row4 = ["#FFC5C5", "#FFE1C5", "#FEFFDD", "#C5FFC5", "#C5E2C5", "#D5EEFF", "#C5C5FF", "#FFE2FF", "#FFFFFF"]

all_emo = ["emoboxexcited", "emoboxhappy", "emoboxneutral", "emoboxconcerned", "emoboxangry"]
colors = ["red", "orange", "yellow", "light_green", "deep_green", "light_blue", "deep_blue", "purple", "achromatic"];
rows = ["row1", "row2", "row3", "row4"];

emo = {
    emoboxexcited: "Excited",
    emoboxhappy: "Happy",
    emoboxneutral: "Neutral",
    emoboxconcerned: "Concerned",
    emoboxangry: "Angry"
}

if(localStorage.getItem("revision") == 1){
    document.getElementById("survey_footer_jump").setAttribute("style", "visibility:visible");
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
    emotionColor = localStorage.getItem("angry")
    // console.log(emotionColor)
    if (emotionColor === null) {
        document.getElementById("emoboxangry").setAttribute("style", "background-color:#000000; color:#E9ECEF")
    }
    else {
        document.getElementById(selected_emo).innerHTML = "<h4>You selected the color of this ribbon for Anger. To change it, select another color. To proceed, click Next.</h4>"
        document.getElementById("emoboxangry").setAttribute("style", "background-color:" + emotionColor)
    }

    if (emotionColor == "#000001" || emotionColor == "#0000C8" || emotionColor == "#D40000" || emotionColor == "#5151FF" || emotionColor == "#009600" || emotionColor == "#008000") {
        document.getElementById(selected_emo).setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin #000000;color: #E9ECEF");
    }
    else if (emotionColor === null) {
        document.getElementById("emoboxangry").setAttribute("style", "background-color:#000000; color:#E9ECEF")
    }
    else {
        document.getElementById(selected_emo).setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin #000000; color:#000000");
    }

    tagColor(emotionColor)
}

function populate_color() {

    // var red = ["#D40000", "#FF0000", "#FF8C8C", "#FFC5C5"];
    // var orange = ["#FF7D00", "#FFA854", "#FFC48C", "#FFE1C5"];
    // var yellow = ["#FFE854", "#FFFF54", "#FFFFB1", "#FEFFDD"];
    // var light_green = ["#00B400", "#54FF54", "#8CFF8C", "#C5FFC5"];
    // var deep_green = ["#008000", "#009600", "#8CC68C", "#C5E2C5"];
    // var light_blue = ["#0089E0", "#59BDFF", "#A5DBFF", "#D5EEFF"];
    // var deep_blue = ["#0000C8", "#5151FF", "#8C8CFF", "#C5C5FF"];
    // var purple = ["#DE00DE", "#FF54FF", "#FFC6FF", "#FFE2FF"];
    // var achromatic = ["#000000", "#757575", "#9E9E9E", "#FFFFFF"];

    for (var i in rows) {
        divColor = document.createElement("div")
        divColor.className = "colorDiv"
        divColor.id = "colorDivId-" + rows[i];

        if (rows[i] == "row1")
            shades = row1;
        else if (rows[i] == "row2")
            shades = row2;
        else if (rows[i] == "row3")
            shades = row3;
        else if (rows[i] == "row4")
            shades = row4;
        // else if (colors[i] == "orange")
        //     shades = orange;
        // else if (colors[i] == "yellow")
        //     shades = yellow;
        // else if (colors[i] == "light_green")
        //     shades = light_green;
        // else if (colors[i] == "deep_green")
        //     shades = deep_green;
        // else if (colors[i] == "light_blue")
        //     shades = light_blue;
        // else if (colors[i] == "deep_blue")
        //     shades = deep_blue;
        // else if (colors[i] == "purple")
        //     shades = purple;
        // else if (colors[i] == "achromatic")
        //     shades = achromatic;

        var divColorHTML = "";
        divColor.innerHTML = fill_color(divColorHTML, shades, i);
        var element = document.getElementById("survey_color");
        element.appendChild(divColor);
    }
}

function tagColor(current_fill) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 9; j++) {
            var id = "color_" + i + "_" + j;
            var this_fill = document.getElementById(id).getAttribute("style").slice(0, 24);
            if (this_fill.slice(17, 24) == current_fill) {
                document.getElementById(id).setAttribute("style", this_fill + "; outline: dashed thick #000000; z-index:1000")
            }
            else {
                document.getElementById(id).setAttribute("style", this_fill)
            }
        }
    }
}

function check_duplicate() {
    other_color = [];
    this_color = "";

    if (selected_color != "") {
        this_color = document.getElementById(selected_color).getAttribute("style").slice(17, 24);
    }
    else {
        this_color = localStorage.getItem("angry")
    }

    console.log(this_color)

    if (this_color == localStorage.getItem("happy")) {
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + "Duplicate with Happiness. Please select a different color." + '</span>';
        str = "duplicate"
        logInteraction(str)
        return true
    }
    else if (this_color == localStorage.getItem("accept")) {
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + "Duplicate with Acceptance. Please select a different color." + '</span>';
        str = "duplicate"
        logInteraction(str)
        return true
    }
    else if (this_color == localStorage.getItem("neutral")) {
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + "Duplicate with Neutral. Please select a different color." + '</span>';
        str = "duplicate"
        logInteraction(str)
        return true
    }
    if (this_color == localStorage.getItem("disapprove")) {
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + "Duplicate with Disapproval. Please select a different color." + '</span>';
        str = "duplicate"
        logInteraction(str)
        return true
    }
    else if (this_color == localStorage.getItem("concerned")) {
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + "Duplicate with Concern. Please select a different color." + '</span>';
        str = "duplicate"
        logInteraction(str)
        return true
    }
    else if (this_color == localStorage.getItem("excited")) {
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + "Duplicate with Excitement. Please select a different color." + '</span>';
        str = "duplicate"
        logInteraction(str)
        return true
    }
    else {
        return false
    }
}


function check_missing() {
    var current_fill = document.getElementById("emoboxangry").getAttribute("style").slice(0, 24);
    console.log(current_fill)
    if (current_fill == "background-color:#000000") {
        document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
        document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + "Please select a color." + '</span>';

        str = "missing"
        logInteraction(str)
        return true
    }

    else {
        return false
    }
}

// function check_duplicate() {
//     var box = [];
//     for (var i = 0; i < all_emo.length; i++) {
//         var x = document.getElementById(all_emo[i]).getAttribute("style").slice(0, 24)
//         for (var j = i; j < all_emo.length; j++) {
//             var y = document.getElementById(all_emo[j]).getAttribute("style").slice(0, 24)
//             if (x == y && all_emo[i] != all_emo[j]) {
//                 box.push(emo[all_emo[i]])
//                 box.push(emo[all_emo[j]])
//             }
//         }
//     }

//     if (box.length != 0) {
//         var log = "There are duplicates in ";

//         box = Array.from(new Set(box))
//         for (var i in box) {
//             log = log + box[i] + ", ";
//         }

//         log = log.slice(0, -2);
//         console.log(log);
//         document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
//         document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i></span>' + log;
//         str = "duplicate"
//         logInteraction(str)
//         return true
//     }
//     else {
//         return false
//     }
// }


// $(document).ready(function () {
//     $('.square_emo').click(function () {
//         id = $(this).attr('id')
//         selected_emo = id;

//         for (var i = 0; i < all_emo.length; i++) {
//             var current_fill = document.getElementById(all_emo[i]).getAttribute("style").slice(0, 24);
//             console.log(current_fill)
//             document.getElementById(all_emo[i]).setAttribute("style", current_fill);
//         }

//         var current_fill = document.getElementById(selected_emo).getAttribute("style").slice(0, 24);
//         document.getElementById(selected_emo).setAttribute("style", current_fill + "; outline:solid thick black;");

//         tagColor(current_fill);

//         str = "emo" + "," + selected_emo;
//         logInteraction(str)
//     });
// });

last_color = ""

$(document).ready(function () {
    $('.square_color').click(function () {
        id = $(this).attr('id')
        selected_color = id;
        console.log(selected_color)
        new_color = document.getElementById(selected_color).getAttribute("style").slice(0, 24);

        document.getElementById(selected_emo).innerHTML = "<h4>You selected the color of this ribbon for Anger. To change it, select another color. To proceed, click Next.</h4>"

        emotionColor = localStorage.getItem("angry")
        if (emotionColor !== null) {
            tagColor(emotionColor)
        }

        console.log(new_color.slice(17, 24))

        if (new_color.slice(17, 24) == "#000001" || new_color.slice(17, 24) == "#0000C8" || new_color.slice(17, 24) == "#D40000" || new_color.slice(17, 24) == "#5151FF" || new_color.slice(17, 24) == "#009600" || new_color.slice(17, 24) == "#008000") {
            document.getElementById(selected_emo).setAttribute("style", new_color + "; outline:solid thin #000000;color: #E9ECEF");
        }
        else {
            document.getElementById(selected_emo).setAttribute("style", new_color + "; outline:solid thin #000000; color:#000000");
        }

        // document.getElementById(selected_emo).setAttribute("style", new_color + "; outline:solid thin black;");

        if (last_color) {
            temp_color = document.getElementById(last_color).getAttribute("style").slice(0, 24);
            document.getElementById(last_color).setAttribute("style", temp_color + "; outline:none");
            if(emotionColor !== null){
                tagColor(emotionColor);
            }
        }

        document.getElementById(selected_color).setAttribute("style", new_color + "; outline:solid thick #000000; z-index:2000");
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
                //localStorage.setItem("excited", document.getElementById("emoboxexcited").getAttribute("style").slice(17, 24));
                // localStorage.setItem("happy", document.getElementById("emoboxhappy").getAttribute("style").slice(17, 24))
                // localStorage.setItem("neutral", document.getElementById("emoboxneutral").getAttribute("style").slice(17, 24))
                // localStorage.setItem("concerned", document.getElementById("emoboxconcerned").getAttribute("style").slice(17, 24))
                localStorage.setItem("angry", document.getElementById("emoboxangry").getAttribute("style").slice(17, 24))
                // value = $("#colorCommentBox").val();
                // localStorage.setItem("color_comment", value)
                console.log(localStorage)
                window.open('survey_revision.html', '_self')

            }
        }
        else {
            console.log("Errors")
        }
    });
});

// $(document).ready(function () {
//     $('#survey_footer_jump').click(function () {

//         if (!check_missing()) {
//             if (!check_duplicate()) {
//                 console.log("all clear")
//                 //localStorage.setItem("excited", document.getElementById("emoboxexcited").getAttribute("style").slice(17, 24));
//                 // localStorage.setItem("happy", document.getElementById("emoboxhappy").getAttribute("style").slice(17, 24))
//                 // localStorage.setItem("neutral", document.getElementById("emoboxneutral").getAttribute("style").slice(17, 24))
//                 // localStorage.setItem("concerned", document.getElementById("emoboxconcerned").getAttribute("style").slice(17, 24))
//                 localStorage.setItem("angry", document.getElementById("emoboxangry").getAttribute("style").slice(17, 24))
//                 // value = $("#colorCommentBox").val();
//                 // localStorage.setItem("color_comment", value)
//                 console.log(localStorage)
//                 window.open('survey_revision.html', '_self')
//             }
//         }
//         else {
//             console.log("Errors")
//         }
//     });
// });