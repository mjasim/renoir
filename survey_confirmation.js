populate_emo();

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

$(document).ready(function () {
    $('.square_emo').click(function () {
        id = $(this).attr('id')
        console.log(id)
        localStorage.setItem("revision", "1")
        if(id == "emoboxexcited"){
            window.open('survey_excitement.html', '_self')
        }
        if(id == "emoboxhappy"){
            window.open('survey_happiness.html', '_self')
        }
        if(id == "emoboxaccept"){
            window.open('survey_acceptance.html', '_self')
        }
        if(id == "emoboxneutral"){
            window.open('survey_neutral.html', '_self')
        }
        if(id == "emoboxdisapprove"){
            window.open('survey_disapproval.html', '_self')
        }
        if(id == "emoboxconcerned"){
            window.open('survey_concern.html', '_self')
        }
        if(id == "emoboxangry"){
            window.open('survey_anger.html', '_self')
        }        
        str = "revision" + "," + id;
        logInteraction(str)
    });
});

$(document).ready(function () {
    $('#survey_footer_next').click(function () {
        window.open('questionnaire.html', '_self')
    });
});