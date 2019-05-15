stat = null;
raw_json = null;

d3.json("stat.json", function (err, myjson) {
    raw_json = JSON.parse(JSON.stringify(myjson))
    stat = JSON.parse(JSON.stringify(myjson))

    if (localStorage.getItem("excited") === null) {
        makeRevision(JSON.parse(JSON.stringify(stat)))
        draw_stat();
    }
    else {
        makeRevision(JSON.parse(JSON.stringify(stat)))
        draw_stat();
    }
})

function fill_agg(stat, emo, cell) {
    obj = indexOfMax(stat[emo])
    document.getElementById(cell).innerText = obj.val;
    document.getElementById(cell).setAttribute("style", "background-color:" + stat.colors[obj.idx] + ";");
    //console.log("inside fill", obj)
}

function inc_idx_color(temp_stat, color) {
    for (var i = 0; i < temp_stat["colors"].length; i++) {
        if (temp_stat["colors"][i] == color) {
            temp_stat["excited"][i] = parseInt(temp_stat["excited"][i]) + 1;
            console.log(i, temp_stat["excited"][i])
        }
    }
}

// save revisions
function makeRevision(temp_stat) {

    console.log("inside", temp_stat)
    //write update//
    temp_stat["count"] = parseInt(temp_stat["count"]) + 1;
    inc_idx_color(temp_stat, localStorage.getItem("excited"));
    inc_idx_color(temp_stat, localStorage.getItem("happy"));
    inc_idx_color(temp_stat, localStorage.getItem("neutral"));
    inc_idx_color(temp_stat, localStorage.getItem("concerned"));
    inc_idx_color(temp_stat, localStorage.getItem("angry"));

    console.log('make revision');
    var save_data = JSON.stringify(temp_stat);

    request = new XMLHttpRequest();
    request.open("POST", "save_file.php");
    request.setRequestHeader("Content-type", "application/json");
    request.send(save_data);

    save_data = temp_stat;
    stat = temp_stat;

    return save_data;
}

function draw_stat() {

    document.getElementById("count").innerText = stat.count;

    fill_agg(stat, "excited", "emoboxexcited");
    fill_agg(stat, "happy", "emoboxhappy");
    fill_agg(stat, "neutral", "emoboxneutral");
    fill_agg(stat, "concerned", "emoboxconcerned");
    fill_agg(stat, "angry", "emoboxangry");
}

function indexOfMax(arr) {

    var max = arr[0];
    var maxIndex = 0;
    resObj = {
        val: null,
        idx: null
    }

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    resObj.val = arr[maxIndex]
    resObj.idx = maxIndex

    return resObj;
}

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
        logData(str);

        localStorage.clear();
    });
});