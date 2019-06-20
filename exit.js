stat = null;
raw_json = null;

d3.json("stat_stack.json", function (err, myjson) {
    raw_json = JSON.parse(JSON.stringify(myjson))
    stat = JSON.parse(JSON.stringify(myjson))

    if (localStorage.getItem("excited") === null) {
        //remove this one
        //makeRevision(JSON.parse(JSON.stringify(stat)))
        draw_stack();
    }
    else {
        makeRevision(JSON.parse(JSON.stringify(stat)))
        draw_stack();
    }

    var str = localStorage.getItem("email_address") + "," + localStorage.getItem("age_group") + "," +
        localStorage.getItem("gender") + "," + localStorage.getItem("nation") + "," +
        localStorage.getItem("race") + "," + localStorage.getItem("continent") + "," +
        localStorage.getItem("live") + "," + localStorage.getItem("exp") + "," +
        localStorage.getItem("excited") + "," + localStorage.getItem("happy") + "," +
        localStorage.getItem("accept") + "," + localStorage.getItem("neutral") + "," +
        localStorage.getItem("disapprove") + "," + localStorage.getItem("concerned") + "," +
        localStorage.getItem("angry") + "," + localStorage.getItem("excited_reason") + "," +
        localStorage.getItem("happy_reason") + "," + localStorage.getItem("accept_reason") + "," +
        localStorage.getItem("neutral_reason") + "," + localStorage.getItem("disapprove_reason") + "," +
        localStorage.getItem("concerned_reason") + "," + localStorage.getItem("angry_reason");
    console.log(str);

    logData(str);

    localStorage.clear();
})


function inc_idx_color(temp_stat, emo, color) {

    color = color.slice(1, 7)
    for (var i = 0; i < temp_stat.length; i++) {
        if (temp_stat[i].emotion == emo) {
            // console.log("here")
            // console.log("x", emo, color, temp_stat[i], temp_stat[i][color])
            temp_stat[i][color] = parseInt(temp_stat[i][color]) + 1;
            // console.log("y", emo, color, temp_stat[i], temp_stat[i][color])
        }
    }
}

// save revisions
function makeRevision(temp_stat) {

    // console.log("before", JSON.stringify(temp_stat))
    //write update//
    inc_idx_color(temp_stat, "Excitement", localStorage.getItem("excited"));
    inc_idx_color(temp_stat, "Happiness", localStorage.getItem("happy"));
    inc_idx_color(temp_stat, "Acceptance", localStorage.getItem("accept"));
    inc_idx_color(temp_stat, "Neutral", localStorage.getItem("neutral"));
    inc_idx_color(temp_stat, "Disapproval", localStorage.getItem("disapprove"));
    inc_idx_color(temp_stat, "Concern", localStorage.getItem("concerned"));
    inc_idx_color(temp_stat, "Anger", localStorage.getItem("angry"));

    console.log('make revision');
    var save_data = JSON.stringify(temp_stat);
    // console.log("after", save_data)

    request = new XMLHttpRequest();
    request.open("POST", "save_file.php");
    request.setRequestHeader("Content-type", "application/json");
    request.send(save_data);

    stat = temp_stat;
}


function draw_stack() {
    // console.log(stat)
    count = 0;
    for (var i in stat[0]) {
        if (i != "emotion") {
            count = count + parseInt(stat[0][i])
        }
    }

    document.getElementById("count").innerText = count;
    if (count == "1" || count == "0") {
        document.getElementById("aggnote").innerText = "This is an aggregation of the colors chosen by " + count + " participant so far.";
    }
    else {
        document.getElementById("aggnote").innerText = "This is an aggregation of the colors chosen by " + count + " participants so far.";
    }


    // var group = ["Laptops", "Processor", "Ram"]
    var group = ["D40000", "FF0000", "FF8C8C", "FFC5C5", "FF7D00", "FFA854", "FFC48C", "FFE1C5", "FFE854", "FFFF54", "FFFFB1", "FEFFDD", "00B400", "54FF54", "8CFF8C", "C5FFC5", "008000", "009600", "8CC68C", "C5E2C5", "0089E0", "59BDFF", "A5DBFF", "D5EEFF", "0000C8", "5151FF", "8C8CFF", "C5C5FF", "DE00DE", "FF54FF", "FFC6FF", "FFE2FF", "000001", "757575", "9E9E9E", "FFFFFF"];
    //var group = ["D40000", "FF7D00", "FFE854", "00B400", "008000", "0089E0", "0000C8", "DE00DE", "000001", "FF0000", "FFA854", "FFFF54", "54FF54", "009600", "59BDFF", "5151FF", "FF54FF", "757575", "FF8C8C", "FFC48C", "FFFFB1", "8CFF8C", "8CC68C", "A5DBFF", "8C8CFF", "FFC6FF", "9E9E9E", "FFC5C5", "FFE1C5", "FEFFDD", "C5FFC5", "C5E2C5", "D5EEFF", "C5C5FF", "FFE2FF", "FFFFFF"];
    var parseDate = d3.timeFormat("%b-%Y");
    var mainDiv = "#charts";
    var mainDivName = "charts";

    var salesData = stat

    // console.log(salesData)

    var layers = d3.stack()
        .keys(group)
        .offset(d3.stackOffsetDiverging)
        (salesData);

    var svg = d3.select("svg"),
        margin = {
            top: 20,
            right: 30,
            bottom: 60,
            left: 60
        },
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var x = d3.scaleBand()
        .rangeRound([margin.left, width - margin.right])
        .padding(0.15);

    x.domain(salesData.map(function (d) {
        return d.emotion;
    }))

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);

    y.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])

    function stackMin(layers) {
        return d3.min(layers, function (d) {
            return d[0];
        });
    }

    function stackMax(layers) {
        return d3.max(layers, function (d) {
            return d[1];
        });
    }

    // var z = d3.scaleOrdinal(["#D40000", "#FF7D00", "#FFE854", "#00B400", "#008000", "#0089E0", "#0000C8", "#DE00DE", "#000001", "#FF0000", "#FFA854", "#FFFF54", "#54FF54", "#009600", "#59BDFF", "#5151FF", "#FF54FF", "#757575", "#FF8C8C", "#FFC48C", "#FFFFB1", "#8CFF8C", "#8CC68C", "#A5DBFF", "#8C8CFF", "#FFC6FF", "#9E9E9E", "#FFC5C5", "#FFE1C5", "#FEFFDD", "#C5FFC5", "#C5E2C5", "#D5EEFF", "#C5C5FF", "#FFE2FF", "#FFFFFF"]);
    var z = d3.scaleOrdinal(["#D40000", "#FF0000", "#FF8C8C", "#FFC5C5", "#FF7D00", "#FFA854", "#FFC48C", "#FFE1C5", "#FFE854", "#FFFF54", "#FFFFB1", "#FEFFDD", "#00B400", "#54FF54", "#8CFF8C", "#C5FFC5", "#008000", "#009600", "#8CC68C", "#C5E2C5", "#0089E0", "#59BDFF", "#A5DBFF", "#D5EEFF", "#0000C8", "#5151FF", "#8C8CFF", "#C5C5FF", "#DE00DE", "#FF54FF", "#FFC6FF", "#FFE2FF", "#000001", "#757575", "#9E9E9E", "#FFFFFF"]);

    var maing = svg.append("g")
        .selectAll("g")
        .data(layers);
    var g = maing.enter().append("g")
        .attr("fill", function (d) {
            return z(d.key);
        })

    var rect = g.selectAll("rect")
        .data(function (d) {
            d.forEach(function (d1) {
                d1.key = d.key;
                return d1;
            });
            return d;
        })
        .enter().append("rect")
        .attr("data", function (d) {
            var data = {};
            data["key"] = d.key;
            data["value"] = d.data[d.key];
            var total = 0;
            group.map(function (d1) {
                total = total + d.data[d1]
            });
            data["total"] = total;
            // console.log(data)
            return JSON.stringify(data);
        })
        .attr("width", x.bandwidth)
        .attr("x", function (d) {
            return x(d.data.emotion);
        })
        .attr("y", function (d) {
            return y(d[1]);
        })
        .attr("height", function (d) {
            //console.log(d)
            return y(d[0]) - y(d[1]);
        })
        .style("outline", "solid thin black");

    rect.on("mouseover", function () {
        var currentEl = d3.select(this);
        var fadeInSpeed = 120;
        d3.select("#recttooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function () {
                return 1;
            });
        d3.select("#recttooltip_" + mainDivName).attr("transform", function (d) {
            var mouseCoords = d3.mouse(this.parentNode);
            var xCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                    .attr("width"));
            } else {
                xCo = mouseCoords[0] + 10;
            }
            var x = xCo;
            var yCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                yCo = mouseCoords[1] + 10;
            } else {
                yCo = mouseCoords[1];
            }
            var x = xCo;
            var y = yCo;
            return "translate(" + x + "," + y + ")";
        });
        //CBT:calculate tooltips text
        var tooltipData = JSON.parse(currentEl.attr("data"));
        var tooltipsText = "";
        d3.selectAll("#recttooltipText_" + mainDivName).text("");
        var yPos = 0;
        d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text("#" + tooltipData.key + ":  " + tooltipData.value);
        yPos = yPos + 1;
        d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text("Total" + ":  " + tooltipData.total);
        //CBT:calculate width of the text based on characters
        var dims = helpers.getDimensions("recttooltipText_" + mainDivName);
        d3.selectAll("#recttooltipText_" + mainDivName + " tspan")
            .attr("x", dims.w + 4);

        d3.selectAll("#recttooltipRect_" + mainDivName)
            .attr("width", dims.w + 10)
            .attr("height", dims.h + 20);

    });

    rect.on("mousemove", function () {
        var currentEl = d3.select(this);
        currentEl.attr("r", 7);
        d3.selectAll("#recttooltip_" + mainDivName)
            .attr("transform", function (d) {
                var mouseCoords = d3.mouse(this.parentNode);
                var xCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                        .attr("width"));
                } else {
                    xCo = mouseCoords[0] + 10;
                }
                var x = xCo;
                var yCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    yCo = mouseCoords[1] + 10;
                } else {
                    yCo = mouseCoords[1];
                }
                var x = xCo;
                var y = yCo;
                return "translate(" + x + "," + y + ")";
            });
    });
    rect.on("mouseout", function () {
        var currentEl = d3.select(this);
        d3.select("#recttooltip_" + mainDivName)
            .style("opacity", function () {
                return 0;
            })
            .attr("transform", function (d, i) {
                // klutzy, but it accounts for tooltip padding which could push it onscreen
                var x = -500;
                var y = -500;
                return "translate(" + x + "," + y + ")";
            });
    });

    svg.append("g")
        .style("font", "14px Sans-Serif")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.bottom * 0.5)
        .attr("dx", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "1em")
        .attr("text-anchor", "middle")
    // .text("Emotions");

    svg.append("g")
        .style("font", "14px Sans-Serif")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y)
        .tickFormat(function(e){
            if(Math.floor(e) != e)
            {
                return;
            }
            return e;
        }))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height / 2))
        .attr("y", 15 - (margin.left))
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        // .attr("font-size", "1em")
        // .attr("font-weigth", "bold")
        .attr("text-anchor", "middle")
        .text("People surveyed");

    var rectTooltipg = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("id", "recttooltip_" + mainDivName)
        .attr("style", "opacity:0")
        .attr("transform", "translate(-500,-500)");

    rectTooltipg.append("rect")
        .attr("id", "recttooltipRect_" + mainDivName)
        .attr("x", 0)
        .attr("width", 120)
        .attr("height", 80)
        .attr("opacity", 0.71)
        .style("fill", "#000000");

    rectTooltipg
        .append("text")
        .attr("id", "recttooltipText_" + mainDivName)
        .attr("x", 30)
        .attr("y", 15)
        .attr("fill", function () {
            return "#fff"
        })
        .style("font-size", function (d) {
            return 10;
        })
        .style("font-family", function (d) {
            return "arial";
        })
        .text(function (d, i) {
            return "";
        });

    var helpers = {
        getDimensions: function (id) {
            var el = document.getElementById(id);
            var w = 0,
                h = 0;
            if (el) {
                var dimensions = el.getBBox();
                w = dimensions.width;
                h = dimensions.height;
            } else {
                console.log("error: getDimensions() " + id + " not found.");
            }
            return {
                w: w,
                h: h
            };
        }
    };

}

$(document).ready(function () {
    $('#exitBtn').click(function () {
        value = $("#commentBox").val();
        // localStorage.setItem("comment", value)
        // console.log(localStorage);

        document.getElementById("finalComment").setAttribute("style", "visibility:visible")

        // str = localStorage.getItem("email_address") + "," + localStorage.getItem("first_name") + "," +
        //     localStorage.getItem("last_name") + "," + localStorage.getItem("age_group") + "," +
        //     localStorage.getItem("gender") + "," + localStorage.getItem("nation") + "," +
        //     localStorage.getItem("race") + "," + localStorage.getItem("continent") + "," +
        //     localStorage.getItem("live") + "," + localStorage.getItem("exp") + "," +
        //     localStorage.getItem("excited") + "," + localStorage.getItem("happy") + "," +
        //     localStorage.getItem("accept") + "," + localStorage.getItem("neutral") + "," +
        //     localStorage.getItem("disapprove") + "," + localStorage.getItem("concerned") + "," +
        //     localStorage.getItem("angry") + "," + localStorage.getItem("excited_reason") + "," +
        //     localStorage.getItem("happy_reason") + "," + localStorage.getItem("accept_reason") + "," +
        //     localStorage.getItem("neutral_reason") + "," + localStorage.getItem("disapprove_reason") + "," +
        //     localStorage.getItem("concerned_reason") + "," + localStorage.getItem("angry_reason") + "," +
        //     localStorage.getItem("comment");

        console.log(value);
        logData(value);

        localStorage.clear();
    });
});