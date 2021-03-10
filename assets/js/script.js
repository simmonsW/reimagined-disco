var startTime = 10;

var timerEl = document.getElementById('timer');

// timer function

setInterval(updateTimer, 1000);

function updateTimer() {
  var seconds = startTime;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  if (seconds == 0) {
    return;
  };

  timerEl.innerHTML = seconds;
  startTime--;
  
};
