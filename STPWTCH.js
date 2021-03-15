let timerElement = document.getElementById("timer")

let elapsedTime = 0
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
  updateBody()
}

function updateTimer () {
  elapsedTime = new Date().getTime() - startTimestamp

  updateBody()
}

function formatToTimer(totalMilliseconds) {
  let diffInMin = Math.floor(totalMilliseconds / 60000).toString().padStart(2, '0')
  let diffInSec = Math.floor((totalMilliseconds % 60000) / 1000).toString().padStart(2, '0')
  let diffInMs = Math.floor((totalMilliseconds % 60000) / 10).toString().slice(-2).padStart(2, '0')

  return `${diffInMin}:${diffInSec}.${diffInMs}`
}

function updateBody(){
  timerElement.innerText = formatToTimer(elapsedTime)
}
