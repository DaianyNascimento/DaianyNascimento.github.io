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
/*let flipCardSound = new Audio("../sounds/flipcard-sound.mp3");
flipCardSound = 0.2;*/

// other variables
let clickedCards = [];
let w, h, cards, backCard, batman, superman, joker;
let tries = 0;
let gameCards = [];
let heros = [];

function preload() {
    backCard = loadImage('../images/DC_Comics_logo.png')
    bgImg = loadImage('../images/dc-comics-background.jpg');
    batman = loadImage('../images/hero0.png');
    superman = loadImage('../images/hero5.png');
    joker = loadImage('../images/hero1.png');


    for (let i = 0; i < 5; i++) {
        heros[i] = loadImage('../images/hero' + i + '.png');
    }
}

function setup() {
    const canvas = createCanvas(540, 500);
    canvas.parent("game-screen");
    select('canvas').position(270, 40);

    w = (width - 50) / 4;
    h = 365 / 3;

    cards = shuffle([10, 10, 20, 20, 30, 30]);
    //let hero = random(heros);

    for (let x = 10; x < width; x += w + 10) {
        for (let y = 10; y < 405; y += h + 10) {
            gameCards.push(new GameCards(x, y, backCard));
        }
    }
}

function draw() {
    background('#FFFFFF');

    for (let i = 0; i < cards.length; i++) {
        image(backCard, 90 + (i * 70), 100, 55, 80);

        if (clickedCards[0] == i || clickedCards[1] == i) {

            if (cards[i] == 10) {
                image(batman, 91 + (i * 70), 101, 53, 78);
            }

            if (cards[i] == 20) {
                image(superman, 91 + (i * 70), 101, 53, 78);
            }

            if (cards[i] == 30) {
                image(joker, 91 + (i * 70), 101, 53, 78);
            }
        }
    }

    noStroke();
    fill(0);
    textSize(15);
    text('Tries: ' + tries, 20, height - 50, 200, 100);
    text('You only have 10 tries before gameover.', 100, height - 50, 300, 100);

    if (cards.length == 0) {
        gameScreen.style.display = "none";
        gameOverScreen.style.display = "";
        tries = 0;
        cards = shuffle([10, 10, 20, 20, 30, 30]);
        clickedCards = []

        if (soundBtnGameScreen.textContent == "Sound of") {
            soundBtnGameOverScreen.innerText = "Sound of";
            congratulationsBgSound.play();
        }
    }

    if (tries > 10) {
        gameScreen.style.display = "none";
        gameOverScreen2.style.display = "";
        tries = 0;
        cards = shuffle([10, 10, 20, 20, 30, 30]);
        clickedCards = [];

        if (soundBtnGameScreen.textContent == "Sound of") {
            gameoverBgSound.play();
        }
    }

    for (let i = 0; i < gameCards.length; i++) {
        //gameCards[i].draw();
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

            let pos = 90 + i * 70;

            if (mouseX >= pos && mouseX <= pos + 55 && mouseY >= 100 && mouseY <= 180) {

                if (i != clickedCards[0]) {
                    clickedCards.push(i);
                    tries += 1;
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
class GameCards {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    draw() {
        image(this.img, this.x, this.y, w, h);
    }
}

window.onload = () => {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    gameOverScreen2.style.display = "none";

    document.getElementById('start-button').onclick = () => {
        if (soundBtnSplashScreen.textContent == "Sound of") {
            initialBgSound.pause();
            gameBgSound.play();
        }
        startGame();
    };

    document.getElementById('restart-button').onclick = () => {

        if (soundBtnGameScreen.textContent == "Sound of") {
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
            soundBtnSplashScreen.innerText = "Sound of";
            soundBtnGameScreen.innerText = "Sound of";
            soundBtnGameOverScreen.innerText = "Sound of";
            soundBtnGameOverScreen2.innerText = "Sound of";
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
            soundBtnGameScreen.innerText = "Sound of";
            soundBtnSplashScreen.innerText = "Sound of";
            soundBtnGameOverScreen.innerText = "Sound of";
            soundBtnGameOverScreen2.innerText = "Sound of";
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
            soundBtnGameOverScreen.innerText = "Sound of";
            soundBtnGameScreen.innerText = "Sound of";
            soundBtnSplashScreen.innerText = "Sound of";
            soundBtnGameOverScreen2.innerText = "Sound of";
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
            soundBtnGameOverScreen2.innerText = "Sound of";
            soundBtnGameScreen.innerText = "Sound of";
            soundBtnSplashScreen.innerText = "Sound of";
            soundBtnGameOverScreen2.innerText = "Sound of";
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