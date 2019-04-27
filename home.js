// Get the video
var video = document.getElementById("homeVideo");

// Get the button
var btn = document.getElementById("homeBtn");

// Pause and play the video, and change the button text
function vidButtonFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}