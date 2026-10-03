const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.menu')
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active')
    navLinks.classList.toggle('active')
});

let seconds = 0;
let timer  = null;
const startTimer = document.querySelector('.js-start');
const pauseTimer = document.querySelector('.js-pause');
const resetTimer = document.querySelector('.js-reset');
const timerDisplay = document.querySelector('.js-timer')
 

startTimer.addEventListener('click', () =>{
    if(timer !== null){
        return;
    }
    timer = setInterval(() =>{
    seconds++;
    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor((seconds % 3600)/60);
    let remainingSeconds = seconds % 60
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },1000)
})

pauseTimer.addEventListener('click', () =>{
    clearInterval(timer);
    timer = null;
})

resetTimer.addEventListener('click', () =>{
    clearInterval(timer);
    seconds = 0;
    timer = null
    timerDisplay.textContent = '00:00:00';
})

let countdown = null;
let countdownSeconds = 0;
let setTime = 0;
const countdownDislay = document.querySelector('.js-countdown')
const startCountdown = document.querySelector('.js-countdown-start');
const pauseCountdown = document.querySelector('.js-countdown-pause');
const resetCountdown = document.querySelector('.js-countdown-reset');
const progressFill = document.querySelector('.progress-fill')

startCountdown.addEventListener('click', () =>{
    if(countdown !== null){
        return;
    }
    if( countdownSeconds === 0){
        const secondsInput = Number(document.querySelector('.js-seconds').value) ;
        const minutesInput = Number(document.querySelector('.js-minutes').value);
        countdownSeconds =  (minutesInput*60) + secondsInput;
        setTime = (minutesInput*60) + secondsInput;
    }
        let minutesRemainig = Math.floor(countdownSeconds/60);
        let secondsRemaining = countdownSeconds % 60
        countdownDislay.textContent = `${String(minutesRemainig).padStart(2,'0')}:${String(secondsRemaining).padStart(2,'0')}`
        countdown = setInterval(() =>{
        countdownSeconds--;

        if(countdownSeconds <= 0){
            clearInterval(countdown);
            countdown = null
            countdownDislay.textContent = '00:00';
            progressFill.style.width = '0%'
            return;
        }
        let percentage = (countdownSeconds/setTime)*100
        progressFill.style.width = `${percentage}%`
        let minutesRemainig = Math.floor(countdownSeconds/60);
        let secondsRemaining = countdownSeconds % 60
        countdownDislay.textContent = `${String(minutesRemainig).padStart(2,'0')}:${String(secondsRemaining).padStart(2,'0')}`
    },1000)
})
resetCountdown.addEventListener('click', () =>{
    clearInterval(countdown);
    countdownSeconds = 0;
    countdown = null
    progressFill.style.width = '0%'
    countdownDislay.textContent = '00:00';
})
pauseCountdown.addEventListener('click', () =>{
    clearInterval(countdown);
    countdown = null
})