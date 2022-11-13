const bodyColored = document.querySelector('body');
const bodyColoredtext = document.querySelector('.text');
const buttonStart = document.getElementById("start");
const myAudio = new Audio('levelup.mp3');
const [frstInp, scndInp] = [...document.querySelectorAll('input')];
const timeSeconds = document.querySelector('.container-input__items-sec');
const timeMinutes = document.querySelector('.container-input__items-min');
let sateInterval = localStorage.getItem("sateInterval") ? localStorage.getItem("sateInterval") : false;
let interval;

if (sateInterval === "true") {
    getStorageItems();
    startTimer();
} else {
    getStorageItems();
}


let timeMinutesStorage = () => {
    localStorage.setItem("timeMinutes", timeMinutes.value);
}

let timeSecondsStorage = () => {
    localStorage.setItem("timeSeconds", timeSeconds.value);
}

function setStateIntervalStorage() {
    localStorage.setItem("sateInterval", sateInterval);
}

// Loop audio
myAudio.addEventListener('timeupdate', function() {
    let buffer = .1
    if(this.currentTime > this.duration - buffer) {
        myAudio.volume = 0.2;
        this.currentTime = 0;
        this.play();
    }
});

// Next skip input
const inpHandler = evt => {
    if (!evt.target.value || evt.target.value.length < 2) return;
    switch (evt.target) {
    case frstInp: scndInp.focus(); break;
    case scndInp: scndInp.blur();
    }
};
[frstInp, scndInp].forEach(i => i.addEventListener('input', inpHandler));

// timeSeconds.addEventListener("keydown", checkMaxKeyInput(event));

// Попытки сделать граммотное ограничение ввода в инпут
function checkMaxKeyInput(event) {
    const strTimeSeconds = String(timeSeconds.value);
    const strTimeMinutes = String(timeMinutes.value);
    
    if (event.code === "Backspace") {
        return;
    }

    if (strTimeSeconds.length < 2) {
        return;
    } else {
        event.preventDefault();
    }

    if (strTimeMinutes.length < 2) {
        return;
    } else {
        event.preventDefault();
    }
    // let checkMaxValueInput = parseInt(value);
    // if(checkMaxValueInput >= 0 && checkMaxValueInput <= 60) {
    //     if(this.value.length==2){
    //         if (this.value.length==2 && key("BackSpace") ) {
    //             this.value.length[1].split
    //             return
    //         } else {
    //             false
    //         }
    //     } else {
    //         false;
    //     }
    // } else {
    // return false;
    // }
}

// Buttons for setting the time 
document.getElementById("min-one").addEventListener('click', () => {
    timeMinutes.value = 1 + Number(timeMinutes.value);
});

document.getElementById("min-five").addEventListener('click', () => {
    timeMinutes.value = 5 + Number(timeMinutes.value);
});

document.getElementById("min-ten").addEventListener('click', () => {
    timeMinutes.value = 10 + Number(timeMinutes.value);
});

// Button strat
function startTimer() {
    sateInterval = true;
    setStateIntervalStorage();
    clearInterval(interval);
    interval = setInterval(subtractTime, 1000);
    document.querySelectorAll('.container-button__items-time').forEach(function(button) {
        button.disabled = true;
    });
    document.querySelectorAll('.container-input__items').forEach(function(button) {
        button.disabled = true;
    });
}

// Button stop
document.getElementById("stop").addEventListener('click', () => {
    sateInterval = false;
    setStateIntervalStorage();
    console.log(localStorage);
    timeSecondsStorage();
    timeMinutesStorage();
    clearInterval(interval);
});

// Button reset
document.getElementById("reset").addEventListener('click', () => {
    sateInterval = false;
    setStateIntervalStorage();
    clearInterval(interval);
    timeSeconds.value = "";
    timeMinutes.value = "";
    document.querySelectorAll('.container-button__items-time').forEach(function(button) {button.disabled = false;});
    document.querySelectorAll('.container-input__items').forEach(function(button) {button.disabled = false;});
    bodyColored.style.backgroundColor = "white";
    bodyColoredtext.style.display = "none";
    myAudio.pause();
});

// The main function of the timer
function subtractTime() {
    if (Number(timeMinutes.value) === 0 && Number(timeSeconds.value) === 0) {
        bodyColoredtext.style.display = "block";
        bodyColored.style.backgroundColor = "#900020";
        myAudio.volume = 0.2;
        myAudio.play();
        clearInterval(interval);
    } else if (Number(timeSeconds.value) > 0) {
        timeSeconds.value--;
    } else if (Number(timeSeconds.value) === 0 || Number(timeMinutes.value) > 0) {
        timeMinutes.value = Number(timeMinutes.value) - 1;
        timeSeconds.value = 59;
    }
    timeSecondsStorage();
    timeMinutesStorage();
}

function getStorageItems() {
    timeMinutes.value = localStorage.getItem("timeMinutes");
    timeSeconds.value = localStorage.getItem("timeSeconds");
}