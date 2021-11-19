let timeEl = document.querySelector("p.time");
let secondsLeft = 60;

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time: ${secondsLeft}s`;

       
    }, 1000);
}