let timers = [];

function startNewTimer(){

    const nt = document.querySelector(".no-timers");

    nt.classList.add("hide");
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if(totalSeconds > 0){
        const timer = {
            totalSeconds,
            secondsLeft: totalSeconds,
            intervalId: setInterval(()=>{
                timer.secondsLeft--;
                updateTimersDisplay();
                if(timer.secondsLeft === 0){
                    clearInterval(timer.intervalId);
                    timerEnded(timer);
                }
            }, 1000),
        }
        timers.push(timer);
        updateTimersDisplay();
    }

}

function stopTimer(timer) {
    clearInterval(timer.intervalId);
    timers = timers.filter(t => t !== timer);
    updateTimersDisplay();
  }
  
  function timerEnded(timer) {
    const index = timers.indexOf(timer);
    timers[index].ended = true;
    updateTimersDisplay();
  }

function updateTimersDisplay(){
    const activeTimersContainer = document.querySelector(".current-timers");
    activeTimersContainer.innerHTML = '';
    
    timers.forEach(timer =>{
        const timerElement = document.createElement("div");
        timerElement.classList.add("timerInputs");
        timerElement.classList.add("h1")

        if(timer.ended){
            timerElement.classList.add("timerEnded");
            timerElement.innerText = "Time is Up";
        }

        timerElement.innerHTML = `<span>${formatTime(timer.secondsLeft)}</span>`;

        const stopButton = document.createElement("button");
        stopButton.innerText = "Stop Timer";
        stopButton.classList.add("btn");
        stopButton.onclick = () => stopTimer(timer);

        timerElement.appendChild(stopButton);
        activeTimersContainer.appendChild(timerElement);
    })
}

function formatTime(seconds){

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60 );
    const secondsLeft = seconds % 60;

    return `${pad(hours)} : ${pad(minutes)} : ${pad(secondsLeft)}`
}

function pad(value){
    return value.toString().padStart(2 , '0');
}