let timerElement = document.getElementById("timer")
let lapsElement = document.getElementById("laps")
let startStopButton = document.getElementById("startstop")
let resetButton = document.getElementById("reset")
let addLapButton = document.getElementById("addLap")

let elapsedTime = 0
let laps = []
let startTimestamp
let interval

function startTimer() {
  startTimestamp = new Date().getTime() - elapsedTime
  interval ||= setInterval(updateTimer, 10)
  addLapButton.classList.remove("hidden")
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
  if (interval) {
    laps.push(elapsedTime)
    updateLapElement()
  }
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
  if (interval) {
    lapsElement.innerHTML = null
    laps.forEach(lap =>  {
      let el = document.createElement("span")
      el.innerText = formatToTimer(lap)
      lapsElement.appendChild(el)
    })
  } else {
    addLapButton.classList.add("hidden")
    lapsElement.innerHTML = null
  }
}

startStopButton.addEventListener("click", function () {
  if (interval) {
    this.innerText = "start"
    stopTimer()
  } else {
    this.innerText = "stop"
    startTimer()
  }
})

resetButton.addEventListener("click", function () {
  if (interval) {
    startStopButton.innerText = "start"
  }

  resetTimer()
})

addLapButton.addEventListener("click", addLap)