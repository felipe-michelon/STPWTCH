let minutes = document.getElementById("minutes")
let seconds = document.getElementById("seconds")
let milliseconds = document.getElementById("milliseconds")

let elapsedTime = 0
let startTimestamp
let interval

function startTimer() {
  startTimestamp = new Date().getTime() - elapsedTime
  interval = setInterval(updateTimer, 10)
}

function stopTimer() {
  clearInterval(interval)
}

function resetTimer() {
  clearInterval(interval)
  elapsedTime = 0
  updateBody({
    elapsedMinutes: 0,
    elapsedSeconds: 0,
    elapsedMilliseconds: 0,
  })
}

function updateTimer () {
  elapsedTime = new Date().getTime() - startTimestamp

  updateBody(calculateElapsedTime(elapsedTime))
}

function calculateElapsedTime(totalMilliseconds) {
  let diffInMin = Math.floor(totalMilliseconds / 60000)
  let diffInSec = Math.floor((totalMilliseconds % 60000) / 1000)
  let diffInMs = Math.floor((totalMilliseconds % 60000) / 10)

  return {
    elapsedMinutes: diffInMin,
    elapsedSeconds: diffInSec,
    elapsedMilliseconds: diffInMs,
  }
}

function updateBody({elapsedMinutes, elapsedSeconds, elapsedMilliseconds}){
  minutes.innerText = elapsedMinutes.toString().padStart(2, '0')
  seconds.innerText = elapsedSeconds.toString().padStart(2, '0')
  milliseconds.innerText = elapsedMilliseconds.toString().slice(-2).padStart(2, '0')
}
