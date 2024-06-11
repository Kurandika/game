var runWorker = 0;
var runImage = 1;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function controller(event) {
    if (event.key === "Enter") {
        if (runWorker === 0) {
            run();
            runSound.play();
            updateScore();
            moveBackground();
            flameMargin.forEach(createFlame);
            
        }
    }

    if (event.key === " ") {
        if (jumpWorker === 0) {
            if (runWorker != 0){

                clearInterval(runWorker);
                runSound.pause();
                
                jump();
                jumpSound.play();

            }

        }
    }
}

function run() {
    runWorker = setInterval(() => {
        runImage = runImage + 1;
        if (runImage === 9) {
            runImage = 1;
        }
        document.getElementById("boy").src = "run" + runImage + ".png";
    }, 150);
}

var jumpImage = 1;
var jumpWorker = 0;
var jumpMarginTop = 450;
var jumpSound = new Audio("jump.mp3");

function jump() {
    jumpWorker = setInterval(() => {
        jumpImage = jumpImage + 1;

        // Fly
        if (jumpImage < 8) {
            jumpMarginTop = jumpMarginTop - 10;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }

        // Land
        if (jumpImage > 7) {
            jumpMarginTop = jumpMarginTop + 10;
            document.getElementById("boy").style.marginTop = jumpMarginTop + "px";
        }

        if (jumpImage == 13) {
            jumpImage = 1;
            clearInterval(jumpWorker);
            jumpWorker = 0;
            run();
            runSound.play();
        }

        document.getElementById("boy").src = "jump" + jumpImage + ".png";
    }, 150);
}

var scoreWorker = 0;
var score = 0;

function updateScore() {
    scoreWorker = setInterval(() => {
        if(score == 2000){
            alert("Game won!! press 'OK' to restart")
            window.location.reload();
        }
        score = score + 10;
        document.getElementById("score").innerHTML = score;
    }, 100);
}

var backgroundWorker = 0;
var backgroundPosition = 0;

function moveBackground() {
    backgroundWorker = setInterval(() => {
        backgroundPosition = backgroundPosition - 20;
        document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";
    }, 50);
}

var flameWorker = 0;
var flameMargin = [500, 1000, 2000,2500,3000.3500,4000,4500,5000,5500];

function createFlame(x) {
    var flame = document.createElement("img");
        flame.src = "flame.gif";
            flame.className = "flame";
            flame.style.marginLeft = x + "px";

            document.getElementById("background").appendChild(flame);

            //flame move
    flameWorker = setInterval(() => {
        
            if(flameWorker !=0){
                x = x - 10;
                flame.style.marginLeft = x + "px";
            }
            //dead line
            if(x==150){

                if(jumpWorker == 0){

                clearInterval(runWorker);
                runSound.pause();

                clearInterval(jumpWorker);
                clearInterval(scoreWorker);
                clearInterval(backgroundWorker);
                clearInterval(flameWorker);
                dead();
                deadSound.play();

                }

                
                
                
            }
                
    }, 100);
}

var deadImage = 1;
var deadWorker = 0;
var deadSound = new Audio("dead.mp3");

function dead() {
    deadWorker = setInterval(() => {
       deadImage = deadImage + 1;

       if(deadImage==11){
        deadImage=1;
        clearInterval(deadWorker);
        alert("Game over! press 'OK'to restart")
        window.location.reload();
       }
       document.getElementById("boy").src = "dead" +deadImage+ ".png";
    }, 100);
}
