selected_color = "";
selected_emo = "";

row1 = ["#D40000", "#FF7D00", "#FFE854", "#00B400", "#008000", "#0089E0", "#0000C8", "#DE00DE", "#000001"]
row2 = ["#FF0000", "#FFA854", "#FFFF54", "#54FF54", "#009600", "#59BDFF", "#5151FF", "#FF54FF", "#757575"]
row3 = ["#FF8C8C", "#FFC48C", "#FFFFB1", "#8CFF8C", "#8CC68C", "#A5DBFF", "#8C8CFF", "#FFC6FF", "#9E9E9E"]
row4 = ["#FFC5C5", "#FFE1C5", "#FEFFDD", "#C5FFC5", "#C5E2C5", "#D5EEFF", "#C5C5FF", "#FFE2FF", "#FFFFFF"]

colors = ["red", "orange", "yellow", "light_green", "deep_green", "light_blue", "deep_blue", "purple", "achromatic"];
rows = ["row1", "row2", "row3", "row4"];
emobuttons = ["emobuttonexcited", "emobuttonhappy", "emobuttonaccept", "emobuttonneutral", "emobuttondisapprove", "emobuttonconcerned", "emobuttonangry"];
emoboxes = ["emoboxexcited", "emoboxhappy", "emoboxaccept", "emoboxneutral", "emoboxdisapprove", "emoboxconcerned", "emoboxangry"]
emo = ["Excitement", "Happiness", "Acceptance", "Neutral", "Disapproval", "Concern", "Anger"]

populate_emo();
populate_color();

function populate_emo() {

    emotionColor = localStorage.getItem("excited")
    document.getElementById("emoboxexcited").setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin black;");
    emotionColor = localStorage.getItem("happy")
    document.getElementById("emoboxhappy").setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin black;");    
    emotionColor = localStorage.getItem("accept")
    document.getElementById("emoboxaccept").setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin black;");    
    emotionColor = localStorage.getItem("neutral")
    document.getElementById("emoboxneutral").setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin black;");
    emotionColor = localStorage.getItem("disapprove")
    document.getElementById("emoboxdisapprove").setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin black;");
    emotionColor = localStorage.getItem("concerned")
    document.getElementById("emoboxconcerned").setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin black;");
    emotionColor = localStorage.getItem("angry")
    document.getElementById("emoboxangry").setAttribute("style", "background-color:" + emotionColor + "; outline:solid thin black;");
}

function fill_color(divColorHTML, shades, i) {
    for (var j in shades) {
        divColorHTML = divColorHTML + '<div class="square_color" ' + 'id=color_' + i + "_" + j + ' style="background-color:' + shades[j] + '"\/>' + '</div>'
    }
    return divColorHTML;
}

function populate_color() {

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

        var divColorHTML = "";
        divColor.innerHTML = fill_color(divColorHTML, shades, i);
        var element = document.getElementById("survey_color");
        element.appendChild(divColor);
    }
}

function clear_buttons(){
    for (var i = 0; i < emoboxes.length; i++){
        console.log(emoboxes[i])
        box_color = document.getElementById(emoboxes[i]).getAttribute("style").slice(0, 24);
        document.getElementById(emoboxes[i]).setAttribute("style", box_color + ";outline: solid thin #000000;")
    }
}

function clear_colors(){
    if (last_color) {
        temp_color = document.getElementById(last_color).getAttribute("style").slice(0, 24);
        document.getElementById(last_color).setAttribute("style", temp_color + "; outline:none");
    }
}

$(document).ready(function () {
    $('.emoButtons').click(function () {
        id = $(this).attr('id')
        console.log(id)
        document.getElementById("survey_color").setAttribute("style", "display:flex");

        if(id == "emobuttonexcited"){
            clear_buttons();
            clear_colors()
            document.getElementById("survey_alert_bar").setAttribute("style", "visibility:hidden");
            box_color = document.getElementById("emoboxexcited").getAttribute("style").slice(0, 24);
            document.getElementById("emoboxexcited").setAttribute("style", box_color + ";outline:solid thick #000000;")
            selected_emo = "emoboxexcited";
            tagColor(box_color.slice(17, 24))
        }
        if(id == "emobuttonhappy"){
            clear_buttons();
            clear_colors()
            document.getElementById("survey_alert_bar").setAttribute("style", "visibility:hidden");
            box_color = document.getElementById("emoboxhappy").getAttribute("style").slice(0, 24);
            document.getElementById("emoboxhappy").setAttribute("style", box_color + ";outline:solid thick #000000;")
            selected_emo = "emoboxhappy";
            tagColor(box_color.slice(17, 24))
        }
        if(id == "emobuttonaccept"){
            clear_buttons();
            clear_colors()
            document.getElementById("survey_alert_bar").setAttribute("style", "visibility:hidden");
            box_color = document.getElementById("emoboxaccept").getAttribute("style").slice(0, 24);
            document.getElementById("emoboxaccept").setAttribute("style", box_color + ";outline:solid thick #000000;")
            selected_emo = "emoboxaccept";
            tagColor(box_color.slice(17, 24))
        }
        if(id == "emobuttonneutral"){
            clear_buttons();
            clear_colors()
            document.getElementById("survey_alert_bar").setAttribute("style", "visibility:hidden");
            box_color = document.getElementById("emoboxneutral").getAttribute("style").slice(0, 24);
            document.getElementById("emoboxneutral").setAttribute("style", box_color + ";outline:solid thick #000000;")
            selected_emo = "emoboxneutral";
            tagColor(box_color.slice(17, 24))
        }
        if(id == "emobuttondisapprove"){
            clear_buttons();
            clear_colors()
            document.getElementById("survey_alert_bar").setAttribute("style", "visibility:hidden");
            box_color = document.getElementById("emoboxdisapprove").getAttribute("style").slice(0, 24);
            document.getElementById("emoboxdisapprove").setAttribute("style", box_color + ";outline:solid thick #000000;")
            selected_emo = "emoboxdisapprove";
            tagColor(box_color.slice(17, 24))
        }
        if(id == "emobuttonconcerned"){
            clear_buttons();
            clear_colors()
            document.getElementById("survey_alert_bar").setAttribute("style", "visibility:hidden");
            box_color = document.getElementById("emoboxconcerned").getAttribute("style").slice(0, 24);
            document.getElementById("emoboxconcerned").setAttribute("style", box_color + ";outline:solid thick #000000;")
            selected_emo = "emoboxconcerned";
            tagColor(box_color.slice(17, 24))
        }
        if(id == "emobuttonangry"){
            clear_buttons();
            clear_colors()
            document.getElementById("survey_alert_bar").setAttribute("style", "visibility:hidden");
            box_color = document.getElementById("emoboxangry").getAttribute("style").slice(0, 24);
            document.getElementById("emoboxangry").setAttribute("style", box_color + ";outline:solid thick #000000;")
            selected_emo = "emoboxangry";
            tagColor(box_color.slice(17, 24))
        }   

        str = "revision" + "," + id;
        logInteraction(str)
    });
});

function tagColor(current_fill) {
    console.log("here");
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 9; j++) {
            var id = "color_" + i + "_" + j;
            console.log(current_fill)
            var this_fill = document.getElementById(id).getAttribute("style").slice(0, 24);
            if (this_fill.slice(17, 24) == current_fill) {
                document.getElementById(id).setAttribute("style", this_fill + "; outline: dashed thick #000000; z-index:1000;")
            }
            else {
                document.getElementById(id).setAttribute("style", this_fill)
            }
        }
    }
}

last_color = ""

$(document).ready(function () {
    $('.square_color').click(function () {
        id = $(this).attr('id')
        selected_color = id;
        console.log(selected_color)
        new_color = document.getElementById(selected_color).getAttribute("style").slice(0, 24);

        if(selected_emo == "emoboxexcited"){
            emotionColor = localStorage.getItem("excited")
        }
        else if(selected_emo == "emoboxhappy"){
            emotionColor = localStorage.getItem("happy")
        }
        else if(selected_emo == "emoboxaccept"){
            emotionColor = localStorage.getItem("accept")
        }
        else if(selected_emo == "emoboxneutral"){
            emotionColor = localStorage.getItem("neutral")
        }
        else if(selected_emo == "emoboxdisapprove"){
            emotionColor = localStorage.getItem("disapprove")
        }
        else if(selected_emo == "emoboxconcerned"){
            emotionColor = localStorage.getItem("concerned")
        }
        else if(selected_emo == "emoboxangry"){
            emotionColor = localStorage.getItem("angry")
        }

        if (emotionColor !== null) {
            tagColor(emotionColor)
        }

        console.log(new_color.slice(17, 24))

        document.getElementById(selected_emo).setAttribute("style", new_color + "; outline:solid thick #000000;");

        if (last_color) {
            temp_color = document.getElementById(last_color).getAttribute("style").slice(0, 24);
            document.getElementById(last_color).setAttribute("style", temp_color + "; outline:none");
            if (emotionColor !== null) {
                tagColor(emotionColor)
            }
        }

        document.getElementById(selected_color).setAttribute("style", new_color + "; outline:solid thick #000000; z-index:2000");
        last_color = selected_color;

        str = "color" + "," + selected_color;
        logInteraction(str)
    });
});

function check_duplicate() {

    for(var i = 0; i < emoboxes.length; i++){
        this_color = document.getElementById(emoboxes[i]).getAttribute("style").slice(17,24);

        for(j = 0; j < emoboxes.length; j++){
            if(j == i){
                continue;
            }
            else{
                other_color = document.getElementById(emoboxes[j]).getAttribute("style").slice(17,24);
                if(this_color == other_color){
                    document.getElementById("survey_alert_bar").setAttribute("style", "visibility:visible");
                    document.getElementById("survey_alert_bar").innerHTML = '<span class="pingIcon"><i class="fas fa-exclamation-circle fa-lg" style="color:crimson;margin-left:10px;">&nbsp;&nbsp;</i>' + emo[i] + " has duplicate with " + emo[j] + ". Please select a different color." + '</span>';
                    return true;
                }
            }
        }
    }
    
    return false;
}

$(document).ready(function () {
    $('#survey_footer_next').click(function () {

        if (!check_duplicate()) {
            console.log("all clear")
            localStorage.setItem("excited", document.getElementById("emoboxexcited").getAttribute("style").slice(17, 24));
            localStorage.setItem("happy", document.getElementById("emoboxhappy").getAttribute("style").slice(17, 24))
            localStorage.setItem("accept", document.getElementById("emoboxaccept").getAttribute("style").slice(17, 24))
            localStorage.setItem("neutral", document.getElementById("emoboxneutral").getAttribute("style").slice(17, 24))
            localStorage.setItem("disapprove", document.getElementById("emoboxdisapprove").getAttribute("style").slice(17, 24))
            localStorage.setItem("concerned", document.getElementById("emoboxconcerned").getAttribute("style").slice(17, 24))
            localStorage.setItem("angry", document.getElementById("emoboxangry").getAttribute("style").slice(17, 24))
            console.log(localStorage)
            window.open('questionnaire.html', '_self')
        }
        else{
            console.log("Errors");
        }
    });
});