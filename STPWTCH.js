let timerElement = document.getElementById("timer")
let lapsElement = document.getElementById("laps")
let startStopButton = document.getElementById("startstop")
let resetLapButton = document.getElementById("resetlap")

let elapsedTime = 0
let laps = []
let startTimestamp
let interval

function startTimer() {
  startTimestamp = new Date().getTime() - elapsedTime
  interval ||= setInterval(updateTimer, 10)
}

function stopTimer() {
  clearInterval(interval)
  interval = null
}

function resetTimer() {
  stopTimer()
  elapsedTime = 0
  laps = []
  updateTimerElement()
  updateLapElement()
}

function addLap() {
  laps.push(elapsedTime)
  updateLapElement()
}

function updateTimer () {
  elapsedTime = new Date().getTime() - startTimestamp

  updateTimerElement()
}

function formatToTimer(totalMilliseconds) {
  let diffInMin = Math.floor(totalMilliseconds / 60000).toString().padStart(2, '0')
  let diffInSec = Math.floor((totalMilliseconds % 60000) / 1000).toString().padStart(2, '0')
  let diffInMs = Math.floor((totalMilliseconds % 60000) / 10).toString().slice(-2).padStart(2, '0')

  return `${diffInMin}:${diffInSec}.${diffInMs}`
}

function updateTimerElement(){
  timerElement.innerText = formatToTimer(elapsedTime)
}

function updateLapElement() {
  lapsElement.innerHTML = null
  if (interval) {
    laps.forEach(lap =>  {
      let el = document.createElement("span")
      el.innerText = formatToTimer(lap)
      lapsElement.appendChild(el)
    })
  }
}

startStopButton.addEventListener("click", function () {
  if (interval) {
    this.innerText = "start"
    resetLapButton.innerText = "reset"
    stopTimer()
  } else {
    this.innerText = "stop"
    resetLapButton.innerText = "lap"
    startTimer()
  }
})

resetLapButton.addEventListener("click", function () {
  if (interval) {
    addLap()
  } else {
    resetTimer()
  }
})
