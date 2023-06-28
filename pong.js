const c = document.querySelector('#gameBoard');
const ctx = c.getContext('2d');

const boardHeight = c.height;
const boardWidth = c.width;
const paddleHeight = 100;
const paddleWidth = 25;
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;
let ballDirectionX;
let ballDirectionY;
let ballTransition = 5;
let paddleTransion = 50;
ballRadius = 15;

const paddle1 = {
    x: 0,
    y: 0
};

const paddle2 = {
    x: boardWidth - paddleWidth,
    y: 0
};

window.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'w') {
        movePaddles(1, 'up');
        console.log(event.key)
    } else if (event.key.toLowerCase() === 's') {
        movePaddles(1, 'down');
    } else if (event.key === 'ArrowUp') {
        movePaddles(2, 'up');
    } else if (event.key === 'ArrowDown') {
        movePaddles(2, 'down');
    }
});

drawPaddles();
drawBall();
createBall();

let gameIntervalId = 0;


runGame();


function runGame() {
    gameIntervalId = setInterval(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        checkGameOver();
        drawBall();
    }, 50);
}

function clearBoard() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, boardWidth, boardHeight);
}

function checkGameOver() {
    if (ballX - ballRadius <= 0 || ballX >= boardWidth + ballRadius) {
        clearInterval(gameIntervalId);
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER, F5 to play again", boardWidth / 2, boardHeight / 2);
    }
}

function movePaddles(identifier, direction) {
    if (identifier === 1) {
        if (direction === 'up' && paddle1.y != 0) {
            paddle1.y -= paddleTransion;
        } else if (direction === 'down' && paddle1.y < boardHeight - paddleHeight) {
            paddle1.y += paddleTransion;
        }
    } else {
        if (direction === 'up' && paddle2.y != 0) {
            paddle2.y -= paddleTransion;
        } else if (direction === 'down' && paddle2.y < boardHeight - paddleHeight) {
            paddle2.y += paddleTransion;
        }
    }
}

function checkPaddleCollision() {
    if (ballX - ballRadius <= paddle1.x + paddleWidth &&
        ballY >= paddle1.y && ballY <= paddle1.y + paddleHeight) {
        ballX = paddleWidth + ballRadius;
        ballDirectionX *= -1;
        ballTransition += 3;

    }
    if (ballX + ballRadius >= boardWidth - paddleWidth &&
        ballY >= paddle2.y && ballY <= paddle2.y + paddleHeight) {
        ballX = boardWidth - paddleWidth - ballRadius;
        ballDirectionX *= -1;
        ballTransition += 3;

    }
}

function moveBall() {
    ballX += ballDirectionX * ballTransition;
    ballY += ballDirectionY * ballTransition;
    if (ballY <= 0 + ballRadius || ballY >= boardHeight - ballRadius) {
        ballDirectionY *= -1;
    }
    checkPaddleCollision();
}

function createBall() {
    if (Math.round(Math.random()) == 1) {
        ballDirectionX = 1;
    } else {
        ballDirectionX = -1;
    }

    if (Math.round(Math.random()) == 1) {
        ballDirectionY = 1;
    } else {
        ballDirectionY = -1;
    }

}


function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawPaddles() {
    ctx.fillStyle = 'red';
    ctx.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    ctx.fillStyle = 'green';
    ctx.fillRect(paddle2.x, paddle2.y, paddleWidth, paddleHeight);
    console.log(boardWidth + ' ' + boardHeight);
}