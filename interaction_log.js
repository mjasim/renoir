var userID;
var recordInteractions = true;//if true interaction data will be saved
if (localStorage.getItem("userID_community") === null) {
    userID = makeRandomId()
    localStorage.setItem('userID_community', userID);
}
else{
    userID = localStorage.getItem('userID_community');
}
console.log('user ID', userID);

function logInteraction(str)
{
    if(recordInteractions == true){
        var dt = new Date();
        var utcDate = dt.toUTCString();
        str = userID + "," + utcDate + "," + str + '\n';

        request= new XMLHttpRequest();
        request.open("POST", "interaction_log.php?q=" + userID, true);
        //request.setRequestHeader("Content-type", "application/json");
        request.send(str);
    }
}
function makeRandomId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
