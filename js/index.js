// screens
const gameSplashScreen = document.querySelector(".splash-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("gameover-screen");
const gameOverScreen2 = document.getElementById("gameover-screen-2");

// buttons
let soundBtnSplashScreen = document.getElementById("sound-button-splash-screen");
let soundBtnGameScreen = document.getElementById("sound-button-game-screen");
let soundBtnGameOverScreen = document.getElementById("sound-button-gameover-screen");
let soundBtnGameOverScreen2 = document.getElementById("sound-button-gameover-screen-2");

// sounds
let initialBgSound = new Audio("../sounds/initial-background-sound.mp3");
initialBgSound.volume = 0.2;
let gameBgSound = new Audio("../sounds/game-background-sound.mp3");
gameBgSound.volume = 0.2;
let gameoverBgSound = new Audio("../sounds/gameover-sound.mp3");
gameoverBgSound.volume = 0.1;
let congratulationsBgSound = new Audio("../sounds/success.mp3");
congratulationsBgSound.volume = 0.1;

// other variables
let clickedCards = [];
let w, h, cards, backCard, batman, superman, joker, deadpool, magneto, wolverine;
let tries = 0;
let x1, x2, x3, x4, y1, y2, y3, posX, posY;

function preload() {
    backCard = loadImage('../images/dc-comics-backcard.png')
    bgImg = loadImage('../images/dc-comics-background.jpg');
    batman = loadImage('../images/hero0.png');
    joker = loadImage('../images/hero1.png');
    wolverine = loadImage('../images/hero2.png');
    magneto = loadImage('../images/hero3.png');
    deadpool = loadImage('../images/hero4.png');
    superman = loadImage('../images/hero5.png');
}

function setup() {
    const canvas = createCanvas(540, 500);
    canvas.parent("game-screen");
    select('canvas').position(270, 40);

    w = (width - 50) / 4;
    h = 365 / 3;
    x1 = 10;
    x2 = 142.5;
    x3 = 275;
    x4 = 407.5;
    y1 = 10;
    y2 = 141.69;
    y3 = 273.37;
    posX = 0;
    posY = 0;

    cards = shuffle([10, 10, 20, 20, 30, 30, 40, 40, 50, 50, 60, 60]);
}

function draw() {
    background('#FFFFFF');

    for (let i = 0; i < cards.length; i++) {
        if (i == 0) {
            posX = x1;
            posY = y1;
        } else if (i == 1) {
            posX = x1;
            posY = y2;
        } else if (i == 2) {
            posX = x1;
            posY = y3;
        } else if (i == 3) {
            posX = x2;
            posY = y1;
        } else if (i == 4) {
            posX = x2;
            posY = y2;
        } else if (i == 5) {
            posX = x2;
            posY = y3;
        } else if (i == 6) {
            posX = x3;
            posY = y1;
        } else if (i == 7) {
            posX = x3;
            posY = y2;
        } else if (i == 8) {
            posX = x3;
            posY = y3;
        } else if (i == 9) {
            posX = x4;
            posY = y1;
        } else if (i == 10) {
            posX = x4;
            posY = y2;
        } else if (i == 11) {
            posX = x4;
            posY = y3;
        }

        image(backCard, posX, posY, w, h);

        if (clickedCards[0] == i || clickedCards[1] == i) {

            if (cards[i] == 10) {
                image(batman, posX, posY, w, h);
            }

            if (cards[i] == 20) {
                image(superman, posX, posY, w, h);
            }

            if (cards[i] == 30) {
                image(joker, posX, posY, w, h);
            }

            if (cards[i] == 40) {
                image(wolverine, posX, posY, w, h);
            }

            if (cards[i] == 50) {
                image(magneto, posX, posY, w, h);
            }

            if (cards[i] == 60) {
                image(deadpool, posX, posY, w, h);
            }
        }
    }

    noStroke();
    fill(0);
    textSize(15);
    text('Tries: ' + tries, 20, height - 50, 200, 100);
    text('You only have 15 tries before gameover.', 100, height - 50, 300, 100);

    if (cards.length == 0) {
        gameScreen.style.display = "none";
        gameOverScreen.style.display = "";
        tries = 0;
        cards = shuffle([10, 10, 20, 20, 30, 30, 40, 40, 50, 50, 60, 60]);
        clickedCards = [];

        if (soundBtnGameScreen.textContent == "Sound off") {
            soundBtnGameOverScreen.innerText = "Sound off";
            congratulationsBgSound.play();
        }
    }

    if (tries > 15) {
        gameScreen.style.display = "none";
        gameOverScreen2.style.display = "";
        tries = 0;
        cards = shuffle([10, 10, 20, 20, 30, 30, 40, 40, 50, 50, 60, 60]);
        clickedCards = [];

        if (soundBtnGameScreen.textContent == "Sound off") {
            gameoverBgSound.play();
        }
    }
}

function mousePressed() {

    if (clickedCards.length == 2) {
        if (cards[clickedCards[0]] == cards[clickedCards[1]] && clickedCards[0] != clickedCards[1]) {
            if (clickedCards[0] < clickedCards[1]) {
                cards.splice(clickedCards[1], 1)
                cards.splice(clickedCards[0], 1)
            } else {
                cards.splice(clickedCards[0], 1)
                cards.splice(clickedCards[1], 1)
            }

        }
        clickedCards = [];
    } else {
        for (let i = 0; i < cards.length; i++) {

            if (i == 0) {
                posX = x1;
                posY = y1;
            } else if (i == 1) {
                posX = x1;
                posY = y2;
            } else if (i == 2) {
                posX = x1;
                posY = y3;
            } else if (i == 3) {
                posX = x2;
                posY = y1;
            } else if (i == 4) {
                posX = x2;
                posY = y2;
            } else if (i == 5) {
                posX = x2;
                posY = y3;
            } else if (i == 6) {
                posX = x3;
                posY = y1;
            } else if (i == 7) {
                posX = x3;
                posY = y2;
            } else if (i == 8) {
                posX = x3;
                posY = y3;
            } else if (i == 9) {
                posX = x4;
                posY = y1;
            } else if (i == 10) {
                posX = x4;
                posY = y2;
            } else if (i == 11) {
                posX = x4;
                posY = y3;
            }

            if (mouseX >= posX && mouseX < posX + w && mouseY >= posY && mouseY < posY + h) {
                if (i != clickedCards[0]) {
                    clickedCards.push(i);

                    if (clickedCards.length == 2) tries += 1;
                }
            }
        }
    }
}

function startGame() {
    gameScreen.style.display = "";
    gameSplashScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    gameOverScreen2.style.display = "none";
}

window.onload = () => {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    gameOverScreen2.style.display = "none";

    document.getElementById('start-button').onclick = () => {
        if (soundBtnSplashScreen.textContent == "Sound off") {
            initialBgSound.pause();
            gameBgSound.play();
        }
        startGame();
    };

    document.getElementById('restart-button').onclick = () => {

        if (soundBtnGameScreen.textContent == "Sound off") {
            gameBgSound.play();
        } else {
            gameBgSound.pause();
        }

        startGame();
    };

    document.getElementById('restart-button-2').onclick = () => {
        startGame();
    };

    document.getElementById('sound-button-splash-screen').onclick = () => {

        if (soundBtnSplashScreen.textContent == "Sound on") {
            initialBgSound.play();
            soundBtnSplashScreen.innerText = "Sound off";
            soundBtnGameScreen.innerText = "Sound off";
            soundBtnGameOverScreen.innerText = "Sound off";
            soundBtnGameOverScreen2.innerText = "Sound off";
        } else {
            initialBgSound.pause();
            soundBtnSplashScreen.innerText = "Sound on";
            soundBtnGameScreen.innerText = "Sound on";
            soundBtnGameOverScreen.innerText = "Sound on";
            soundBtnGameOverScreen2.innerText = "Sound on";
        }
    };

    document.getElementById('sound-button-game-screen').onclick = () => {
        if (soundBtnGameScreen.textContent == "Sound on") {
            gameBgSound.play();
            soundBtnGameScreen.innerText = "Sound off";
            soundBtnSplashScreen.innerText = "Sound off";
            soundBtnGameOverScreen.innerText = "Sound off";
            soundBtnGameOverScreen2.innerText = "Sound off";
        } else {
            gameBgSound.pause();
            soundBtnGameScreen.innerText = "Sound on";
            soundBtnSplashScreen.innerText = "Sound on";
            soundBtnGameOverScreen.innerText = "Sound on";
            soundBtnGameOverScreen2.innerText = "Sound on";
        }
    };

    document.getElementById('sound-button-gameover-screen').onclick = () => {
        if (soundBtnGameOverScreen.textContent == "Sound on") {
            gameBgSound.play();
            soundBtnGameOverScreen.innerText = "Sound off";
            soundBtnGameScreen.innerText = "Sound off";
            soundBtnSplashScreen.innerText = "Sound off";
            soundBtnGameOverScreen2.innerText = "Sound off";
        } else {
            initialBgSound.pause();
            gameBgSound.pause();
            soundBtnGameOverScreen.innerText = "Sound on";
            soundBtnGameScreen.innerText = "Sound on";
            soundBtnSplashScreen.innerText = "Sound on";
            soundBtnGameOverScreen2.innerText = "Sound on";
        }
    };

    document.getElementById('sound-button-gameover-screen-2').onclick = () => {
        if (soundBtnGameOverScreen2.textContent == "Sound on") {
            gameBgSound.play();
            soundBtnGameOverScreen2.innerText = "Sound off";
            soundBtnGameScreen.innerText = "Sound off";
            soundBtnSplashScreen.innerText = "Sound off";
            soundBtnGameOverScreen2.innerText = "Sound off";
        } else {
            initialBgSound.pause();
            gameBgSound.pause();
            soundBtnGameOverScreen2.innerText = "Sound on";
            soundBtnGameOverScreen.innerText = "Sound on";
            soundBtnGameScreen.innerText = "Sound on";
            soundBtnSplashScreen.innerText = "Sound on";
        }
    };
}