
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

const box = 20;

let snake;
let food;
let direction;
let score;
let game;
let running = false;

function initializeGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0;

    scoreText.textContent = score;
    message.textContent = "Game Started!";

    createFood();
    running = true;

    clearInterval(game);
    game = setInterval(drawGame, 150);
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    if (snake.some(part => part.x === food.x && part.y === food.y)) {
        createFood();
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }
    else if (key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
    else if (key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }
    else if (key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
});

function drawGame() {
    ctx.clearRect(0, 0, 400, 400);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ff88" : "#00cc70";
        ctx.fillRect(part.x, part.y, box, box);
    });

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    // Check food
    if (headX === food.x && headY === food.y) {
        score++;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }

    const newHead = { x: headX, y: headY };

    // Check collision
    if (
        headX < 0 || headX >= 400 ||
        headY < 0 || headY >= 400 ||
        snake.some(part => part.x === headX && part.y === headY)
    ) {
        clearInterval(game);
        running = false;
        message.textContent = "Game Over! Score: " + score;
        startBtn.textContent = "Play Again";
        return;
    }

    snake.unshift(newHead);
}

startBtn.addEventListener("click", function() {
    if (!running) {
        initializeGame();
        startBtn.textContent = "Restart Game";
    } else {
        initializeGame();
    }
});
