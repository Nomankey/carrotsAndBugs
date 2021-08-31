//DOM
const gameMain = document.querySelector(".game-main");
const startBtn = document.querySelector(".game-header-startBtn");
const gameTimer = document.querySelector(".game-header-timer");
const gameCounter = document.querySelector(".game-header-counter");
const popUp = document.querySelector(".pop-up");
const popUpBtn = document.querySelector(".pop-up-reBtn");
const popUpMessage = document.querySelector(".pop-up-message");

const bgMusic = new Audio("./sound/bg.mp3");
const bugMusic = new Audio("./sound/bug_pull.mp3");
const carrotMusic = new Audio("./sound/carrot_pull.mp3");
const winMusic = new Audio("./sound/game_win.mp3");
const alertMusic = new Audio("./sound/alert.wav");

const gameMainRect = gameMain.getBoundingClientRect();
const carrotSize = 80;

let started = false;
let count = 0;
let timer = null;


const carrotCount = 5;
const bugCount = 5;
const  gameDuration = 5;

const popUpText = "You good?"


const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const addItem = (name, num, imgPath) => {
    const x1 = 0;
    const y1 = 0;
    const x2 = gameMainRect.width - carrotSize;
    const y2 = gameMainRect.height - carrotSize;
    
    for(let i = 0; i < num; i++) {
        const item = document.createElement("img");
        item.setAttribute("class", name);
        item.setAttribute("src", imgPath);
        item.style.position = "absolute";
        
        const x = getRandomNumber(x1, x2);
        const y = getRandomNumber(y1, y2);
        
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        
        gameMain.appendChild(item);
    }
}

const showStopBtn = () => {
    const btn = startBtn.querySelector(".fas");
    btn.classList.add("fa-stop");
    btn.classList.remove("fa-play");
    startBtn.style.visibility = "visible";
}

const hideStartBtn = () => {
    startBtn.style.visibility = "hidden";
}

const showTimerAndCounter = () => {
    gameTimer.style.visibility = "visible";
    gameCounter.style.visibility = "visible";
}

const updateTimer = (second) => {
    gameTimer.innerHTML = `${second >= 60 ? Math.floor(second/60) : 0}:${second < 60 ? second : second % 60}`;
}

const countDownTimer = () => {
    let timeRemaining = gameDuration;
    updateTimer(timeRemaining);
    timer = setInterval(() => {
        if(timeRemaining <= 0) {
            clearInterval(timer);
            finishGame(false);
            return
        }
        updateTimer(--timeRemaining);
    }, 1000);
    return timer;
}

const stopCountDownTimer = () => clearInterval(timer);

const showPopUp = (text) => {
    popUpMessage.textContent = text;
    popUp.classList.remove("pop-up-hidden");
};

const hidePopUp = () => {
    popUp.classList.add("pop-up-hidden");
}
 
const inIt = () => {
    gameMain.innerHTML = "";
    gameCounter.textContent = carrotCount;
    count = 0;
    addItem("carrot", carrotCount, "img/carrot.png");
    addItem("bug", bugCount, "img/bug.png");
    showStopBtn();
    showTimerAndCounter();
    countDownTimer();
    playMusic(bgMusic);
}

const startGame = () => {
    started = true;
    inIt();
};

const stopGame = () => {
    started = false;
    stopCountDownTimer();
    showPopUp(popUpText);
    hideStartBtn();
    playMusic(alertMusic);
    stopMusic(bgMusic);
};

const updateScoreBoard = () => gameCounter.textContent = carrotCount - count;

const finishGame = (win) => {
    started = false;
    hideStartBtn();
    win? playMusic(winMusic) : playMusic(bugMusic);
    stopMusic(bgMusic);
    showPopUp(win? "YOU WON" : "YOU LOST");
}

const playMusic = (music) => {
    music.currentTime = 0;
    music.play();
}

const stopMusic = (music) => music.pause();


startBtn.onclick = () => {
    started = !started;
    started? startGame() : stopGame();
}

gameMain.onclick = e => {
    const target = e.target
    if(target.className === "carrot") {
        target.remove();
        playMusic(carrotMusic);
        count ++;
        updateScoreBoard();
        if(count === carrotCount) {
            finishGame(true);
            stopCountDownTimer();

        }
    } else if(target.className === "bug") {
        finishGame(false);
        stopCountDownTimer();
    }
};

popUpBtn.onclick = () => {
    startGame();
    hidePopUp();
}

