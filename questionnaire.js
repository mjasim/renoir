var x = "";

var icon_colors = ["red", "blue", "green", "orange", "purple"];

populate_icons();

function populate_icons(){
    document.getElementById("excitedIcon").setAttribute("style", "color:" + localStorage.getItem("excited"))
    document.getElementById("happyIcon").setAttribute("style", "color:" + localStorage.getItem("happy"))
    document.getElementById("neutralIcon").setAttribute("style", "color:" + localStorage.getItem("neutral"))
    document.getElementById("concernedIcon").setAttribute("style", "color:" + localStorage.getItem("concerned"))
    document.getElementById("angryIcon").setAttribute("style", "color:" + localStorage.getItem("angry"))
}

function validate_q(formId, feedbackId, feedbackMessage) {
    var value = "";
    if (document.getElementById(formId).checkValidity()) {
        document.getElementById(feedbackId).innerHTML = "";
        value = $("#" + formId).val();
        console.log(value);
    }
    else {
        document.getElementById(feedbackId).innerHTML = '<i class="fas fa-times-circle"></i>' + "\xa0" + feedbackMessage;
        x = x + 1;
    }
    return value;
}

$(document).ready(function () {
    $('#questionnaire_footer_next').click(function () {

        x = parseInt(0);

        localStorage.setItem("cultural_preference", validate_q("cultureSelect", "cultureFeedback", "Please input your cultural preference"));
        localStorage.setItem("excited_reason", validate_q("inputExcited", "excitedFeedback", "Please input a response"));
        localStorage.setItem("happy_reason", validate_q("inputHappy", "happyFeedback", "Please input a response"));
        localStorage.setItem("neutral_reason", validate_q("inputNeutral", "neutralFeedback", "Please input a response"));
        localStorage.setItem("concerned_reason", validate_q("inputConcerned", "concernedFeedback", "Please input a response"));
        localStorage.setItem("angry_reason", validate_q("inputAngry", "angryFeedback", "Please input a response"));

        console.log("x = ", x)

        if (x == 0) {
            console.log(localStorage)
            window.open('exit.html', '_self')
        }
    });
});

$(document).ready(function () {
    $('#cultureSelect').change(function () {
        document.getElementById("cultureFeedback").innerHTML = "";
    });
});

$(document).ready(function () {
    $('#inputExcited').change(function () {
        document.getElementById("excitedFeedback").innerHTML = "";
    });
});

$(document).ready(function () {
    $('#inputHappy').change(function () {
        document.getElementById("happyFeedback").innerHTML = "";
    });
});

$(document).ready(function () {
    $('#inputNeutral').change(function () {
        document.getElementById("neutralFeedback").innerHTML = "";
    });
});

$(document).ready(function () {
    $('#inputConcerned').change(function () {
        document.getElementById("concernedFeedback").innerHTML = "";
    });
});

$(document).ready(function () {
    $('#inputAngry').change(function () {
        document.getElementById("angryFeedback").innerHTML = "";
    });
});