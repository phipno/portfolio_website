const originalState = {
    numCells: (600 / 40) * (600 / 40),
    cells: [],
    snake: [175], // Direction: -1 (left), 1 (right), -15 (up), 15 (down)
    direction: 1,
    food: [20, 100, 200],
    gameover: false,
    gameStarted: false,
    score: 0,
    interval: null,
  };
  
export let currentState = {};

export const setupGameSnake = (element) => {
  currentState = JSON.parse(JSON.stringify(originalState));
  currentState.element = element;
  console.log(element)

  clearGrid();
  drawGrid();
  drawSnake();
  drawControlls();
  drawFood();
  // drawScoreboard();
};

const drawControlls = () => {
  const controlls = document.querySelector(".controlls");
  controlls.innerHTML =  `
  <button class="move" onclick="moveSnake(-1)"><-</button>
  <div class="up-down">
    <button class="move" onclick="moveSnake(-15)">^</button>
    <button class="move" onclick="moveSnake(15)">^</button>
  </div>
  <button class="move" onclick="moveSnake(1)">-></button>
  `;
}

const clearGrid = () => {
  const gridElement = document.querySelector(".grid-container");
  if (gridElement) gridElement.remove();
};

const drawGrid = () => {
  //create containing element
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");
  const grid = document.createElement("div");
  grid.classList.add("grid");
  gridContainer.insertBefore(grid, gridContainer.children[0]);
  //create a lot of cells - 15 x 15
  for (let i = 0; i < currentState.numCells; i++) {
    const cell = document.createElement("div");
    grid.append(cell);
    currentState.cells.push(cell);
  }
  console.log(currentState.element)
  currentState.element.insertBefore(
    gridContainer,
    currentState.element.children[0]
  );
};

const drawSnake = () => {
  currentState.cells.forEach((cell) => cell.classList.remove("snake"));
  currentState.snake.forEach((index) => {
    currentState.cells[index].classList.add("snake");
  });
};

const drawFood = () => {
  currentState.cells.forEach((cell) => cell.classList.remove("food"));
  currentState.food.forEach((index) => {
    currentState.cells[index].classList.add("food");
  });
};


export const moveSnake = (newDirection) => {
  const head = currentState.snake[0] + currentState.direction;

  // Check for collisions with walls or itself
  if (
    head < 0 || // Out of bounds (top)
    head >= currentState.numCells || // Out of bounds (bottom)
    (currentState.direction === -1 && head % 15 === 14) || // Wraparound (left wall)
    (currentState.direction === 1 && head % 15 === 0) || // Wraparound (right wall)
    currentState.snake.includes(head) // Collision with itself
  ) {
    console.log("Game Over");
    endGame();
    return;
  }

  // Add new head to the snake
  currentState.snake.unshift(head);

  // Check if the snake eats food
  if (currentState.food.includes(head)) {
    currentState.food = currentState.food.filter((index) => index !== head); // Remove eaten food
    placeFood(); // Place new food
    currentState.score++;
  } else {
    currentState.snake.pop(); // Remove the tail if no food is eaten
  }

  drawSnake();
};

const placeFood = () => {
  let newFoodPosition;
  do {
    newFoodPosition = Math.floor(Math.random() * currentState.numCells);
  } while (
    currentState.snake.includes(newFoodPosition) || // Avoid placing food on the snake
    currentState.food.includes(newFoodPosition) // Avoid placing food on existing food
  );

  currentState.food.push(newFoodPosition);
  drawFood();
};

const endGame = () => {
  currentState.gameover = true;
  stopIntervalSnake();
  drawMessage("GAME OVER!");
};

export const playSnake = () => {
  if (currentState.gameStarted) return;
  currentState.gameStarted = true;
  if (currentState.gameover) {
    setupGame(currentState.element);
  }
  currentState.interval = setInterval(() => {
    moveSnake();
  }, 300);
};

export const stopIntervalSnake = () => {
  if (currentState.interval) {
    clearInterval(currentState.interval);
    currentState.interval = null;
  }
};

const drawMessage = (message) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  const h1 = document.createElement("h1");
  h1.innerText = message;
  messageElement.appendChild(h1);
  currentState.element.appendChild(messageElement);
};

const drawScoreboard = () => {
  const scoreElement = document.createElement("span");
  scoreElement.innerText = `Score: ${currentState.score}`;
  const scoreContainer = document.getElementById("score");
  scoreContainer.innerHTML = ""; // Clear previous score
  scoreContainer.appendChild(scoreElement);
  currentState.scoreElement = scoreElement;
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && currentState.direction !== 15) {
    currentState.direction = -15; // Move up
  } else if (event.key === "ArrowDown" && currentState.direction !== -15) {
    currentState.direction = 15; // Move down
  } else if (event.key === "ArrowLeft" && currentState.direction !== 1) {
    currentState.direction = -1; // Move left
  } else if (event.key === "ArrowRight" && currentState.direction !== -1) {
    currentState.direction = 1; // Move right
  }
});

/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
