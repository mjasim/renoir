var x = "";

function validate_form(formId, feedbackId, feedbackMessage) {
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
  $('#demo_footer_next').click(function () {

    x = parseInt(0);

    localStorage.setItem("email_address", validate_form("inputEmail", "emailFeedback", "Please input a valid email address")); 
    localStorage.setItem("first_name", validate_form("inputFirstName", "fnameFeedback", "Please input a valid first name"));
    localStorage.setItem("last_name", validate_form("inputLastName", "lnameFeedback", "Please input a valid last name"));
    localStorage.setItem("age_group", validate_form("ageSelect", "ageFeedback", "Please select your age group"));
    localStorage.setItem("gender", validate_form("genderSelect", "genderFeedback", "Please select your gender"));
    localStorage.setItem("race", validate_form("raceSelect", "raceFeedback", "Please select your ethnicity"))
    localStorage.setItem("exp", validate_form("expSelect", "expFeedback", "Please select number of years"))
  
    console.log("x = ", x)

    if (x == 0) {
      console.log(localStorage)
      window.open('survey.html', '_self')
    }
  });
});

$(document).ready(function () {
  $('#inputEmail').change(function () {
    document.getElementById("emailFeedback").innerHTML = "";
  });
});

$(document).ready(function () {
  $('#inputFirstName').change(function () {
    document.getElementById("fnameFeedback").innerHTML = "";
  });
});

$(document).ready(function () {
  $('#inputLastName').change(function () {
    document.getElementById("lnameFeedback").innerHTML = "";
  });
});

$(document).ready(function () {
  $('#ageSelect').change(function () {
    document.getElementById("ageFeedback").innerHTML = "";
  });
});

$(document).ready(function () {
  $('#genderSelect').change(function () {
    document.getElementById("genderFeedback").innerHTML = "";
  });
});

$(document).ready(function () {
  $('#raceSelect').change(function () {
    document.getElementById("raceFeedback").innerHTML = "";
  });
});

$(document).ready(function () {
  $('#expSelect').change(function () {
    document.getElementById("expFeedback").innerHTML = "";
  });
});