const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Initialize game variables
let score = 0;
let snake = [];
let food = {};
let direction = "right";

// Initialize the snake and food
const init = () => {
    snake = [];
    for (let i = 5; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
    food = { x: Math.floor(Math.random() * canvas.width / 10), y: Math.floor(Math.random() * canvas.height / 10) };
};

// Draw the snake and food on the canvas
const draw = () => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "white";
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }

    // Draw the food
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

    // Display score
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);
};

// Move the snake in the specified direction
const move = () => {
    let x = snake[0].x;
    let y = snake[0].y;

    switch (direction) {
        case "right":
            x++;
            break;
        case "left":
            x--;
            break;
        case "up":
            y--;
            break;
        case "down":
            y++;
            break;
    }

    // Check for collision with walls
    if (x < 0 || x >= canvas.width / 10 || y < 0 || y >= canvas.height / 10) {
        gameOver();
        return;
    }

    // Check for collision with snake body
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // Check for collision with food
    if (x === food.x && y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * canvas.width / 10), y: Math.floor(Math.random() * canvas.height / 10) };
    } else {
        snake.pop();
    }

    // Add new head
    let newHead = { x: x, y: y };
    snake.unshift(newHead);
};
