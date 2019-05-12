$(document).ready(function () {
    $('#exitBtn').click(function () {
        value = $("#commentBox").val();
        localStorage.setItem("comment", value)
        console.log(localStorage);

        document.getElementById("finalComment").setAttribute("style", "visibility:visible")

        str = localStorage.getItem("email_address") + "," + localStorage.getItem("first_name") + "," + 
        localStorage.getItem("last_name") + "," + localStorage.getItem("age_group") + "," + 
        localStorage.getItem("gender") + "," + localStorage.getItem("race") + "," + 
        localStorage.getItem("exp") + "," + localStorage.getItem("excited") + "," + 
        localStorage.getItem("happy") + "," + localStorage.getItem("neutral") + "," + 
        localStorage.getItem("concerned") + "," + localStorage.getItem("angry") + "," + 
        localStorage.getItem("cultural_preference") + "," + localStorage.getItem("excited_reason") + "," + 
        localStorage.getItem("happy_reason") + "," + localStorage.getItem("neutral_reason") + "," +
        localStorage.getItem("concerned_reason") + "," + localStorage.getItem("angry_reason") + "," +
        localStorage.getItem("color_comment") + "," + localStorage.getItem("comment"); 

        console.log(str);
        logInteraction(str);

        localStorage.clear();
    });
});