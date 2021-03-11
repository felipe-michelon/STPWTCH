let minutes = document.getElementById("minutes")
let seconds = document.getElementById("seconds")
let milliseconds = document.getElementById("milliseconds")

let interval

function updateBody(milliseconds, seconds, minutes){
  minutes.innerText = minutes.toString().padStart(2, '0')
  seconds.innerText = seconds.toString().padStart(2, '0')
  milliseconds.innerText = milliseconds.toString().substring(0, 2).padStart(2, '0')
}

function updateTimer () {
  var currentMilliseconds = new Date().getMilliseconds()
  var currentMinutes = parseInt(minutes.innerText)
  var currentSeconds = parseInt(seconds.innerText)
  var displayedMilliseconds = parseInt(milliseconds.innerText)

  if(currentMilliseconds < displayedMilliseconds) {
    currentSeconds += 1
  }

  if(currentSeconds === 60) {
    currentSeconds = 0
    currentMinutes += 1
  }

  updateBody(currentMilliseconds, currentSeconds, currentMinutes)
}

function startTimer() {
  interval = setInterval(updateTimer, 10)
}

function stopTimer() {
  clearInterval(interval)
}

function resetTimer() {
  clearInterval(interval)
  updateBody(0, 0, 0)
}
