/* -------------------------8<---------------------------------------------- */
/*                                                                       .|  */
/* spaceInvader.js                           /     (__)          |/          */
/*                                                 (oo)------/'   ,__,    ,  */
/* By: phipno <phipno@gmail.com>                |  (__)     ||    (oo)_____/ */
/*                                                    ||---/||    (__)    || */
/* Created: 2024/05/29 12:56 by phipno       |/                 ,    ||--w|| */
/*                                         ,,       !              |'        */
/*                                              ,           ,|             | */
/* -----[ mooooooo ]-------------------------------------------------------- */

const originalState = {
	numCells: (600 / 40) * (600 / 40),
	cells: [],
	shipPosition: 217,
	alienPositions: [
		3, 4, 5, 6, 7, 8, 9, 10, 11,
		18, 19, 20, 21, 22, 23, 24, 25, 26,
		33, 34, 35, 36, 37, 38, 39, 40, 41,
		48, 49, 50, 51, 52, 53, 54, 55, 56
		],
	gameover: false,
	gameStarted: false,
	score: 0
}
		
let currentState = {}

function clearGrids() {
	const gridElement = document.querySelector(".grid-container");

	if (gridElement)
		gridElement.remove();
}

export const setupGame = (element) => {
	currentState = JSON.parse(JSON.stringify(originalState));
	currentState.element = element;

	clearGrids();
	deleteMesseage();
	//draw the grid
	drawGrid();
	//draw spaceship
	drawSpaceShip();
	//draw aliens
	drawAliens();
	//instructions and score
	drawScoreboard();
}

const drawGrid = () => {
	//create containing element
	const gridContainer = document.createElement("div")
	gridContainer.classList.add("grid-container")
	const grid = document.createElement("div")
	grid.classList.add("grid")
	gridContainer.insertBefore(grid, gridContainer.children[0])
	//create a lot of cells - 15 x 15
	for (let i = 0; i < currentState.numCells; i++) {
		const cell = document.createElement("div")
		grid.append(cell)
		currentState.cells.push(cell)
	}
		//append the cells to the element	
	currentState.element.insertBefore(gridContainer, currentState.element.children[0])
}

const drawSpaceShip = () => {
	currentState.cells[currentState.shipPosition].classList.add("spaceship")
	//find bottom row, middle cell, add bg immage
}

const controllShip = (event) => {
	if (state.gameover) return
	if (event.code === "ArrowLeft") {
		moveShip("left")
	} else if (event.code === "ArrowRight") {
		moveShip("right")
	} else if (event.code === "Space" ) {
		fire()
	}
}

export const moveShip = (direction) => {
	//remove image from current pos
	if (currentState.gameStarted) {
		currentState.cells[currentState.shipPosition].classList.remove("spaceship")
		//figure out delta
		if (direction === "left" && currentState.shipPosition % 15 !== 0) {
			currentState.shipPosition--
		} else if (direction === "right" && currentState.shipPosition % 15 !== 14) {
				currentState.shipPosition++
		}
		currentState.cells[currentState.shipPosition].classList.add("spaceship")
	}
}

export const fire = () => {
	//use an interval
	if (currentState.gameStarted) {
		let interval;
		let laserposition = currentState.shipPosition
		interval = setInterval(() => {
			currentState.cells[laserposition].classList.remove("laser")
			laserposition-=15
			if (laserposition < 0) {
				clearInterval(interval)
				return
			}
			if (currentState.alienPositions.includes(laserposition)) {
				clearInterval(interval)
				currentState.alienPositions.splice(currentState.alienPositions.indexOf(laserposition), 1)
				currentState.cells[laserposition].classList.remove("alien", "laser")
				currentState.cells[laserposition].classList.add("explosion")
				currentState.score++
				currentState.scoreElement.innerText = currentState.score
				setTimeout(() => {
					currentState.cells[laserposition].classList.remove("explosion")
				}, 200)
				return
			}
			currentState.cells[laserposition].classList.add("laser")
		}, 50)
	}
}

const drawAliens = () => {
	currentState.cells.forEach((cell, index) => {
		if (cell.classList.contains("alien")) {
			cell.classList.remove("alien")
		}
		if (currentState.alienPositions.includes(index)) {
			cell.classList.add("alien")
		}
	})
}

const atEdge = (side) => {
	if (side === "left") {
		return currentState.alienPositions.some(position => position % 15 === 0)
	} else if (side === "right") {
		return currentState.alienPositions.some(position => position % 15 === 14)
	}
}

export const play = (event) => {
	//start movement of aliens
	if (currentState.gameStarted)
		return;
	if (currentState.gameover) {
		setupGame(event.target.parentElement.parentElement)
	}
	let interval;
	let direction = "right";
	let movement;
	currentState.gameStarted = true;
	interval = setInterval(() => {
		if (direction === "right") {
			if (atEdge("right")) {
				movement = 15 - 1
				direction = "left"
			} else {
				movement = 1
			} 
		} else if (direction === "left") {
			if (atEdge("left")) {
				movement = 15 + 1
				direction = "right"
			} else {
				movement = -1
			}
		}
		currentState.alienPositions = currentState.alienPositions.map(position => position + movement);
		drawAliens();
		checkGameState(interval);
	}, 300)
	//set up ship controls
}

const checkGameState = (interval) => {
	if (currentState.alienPositions.length === 0) {
		currentState.gameover = true
		currentState.gameStarted = false
		clearInterval(interval)
		drawMessage("HUMAN WIN!")
	} else if (currentState.alienPositions.some(position => position >= currentState.shipPosition)) {
		clearInterval(interval)
		currentState.gameover = true
		currentState.gameStarted = false
		currentState.cells[currentState.shipPosition].classList.remove("spaceship")
		currentState.cells[currentState.shipPosition].classList.add("explosion")
		drawMessage("GAME OVER!")
	}
}

const drawMessage = (message) => {
	const messageElement = document.createElement("div")
	messageElement.classList.add("message")
	const h1 = document.createElement("h1")
	h1.innerText = message
	messageElement.append(h1)
	currentState.element.append(messageElement)
}

const deleteMesseage = () => {
	const messageElement = document.querySelector(".message")

	if (messageElement)
		messageElement.remove();
}


const drawScoreboard = () => {
	const scoreElement = document.createElement('span')
	scoreElement.innerText = currentState.score
	const score = document.getElementById('score');
	
	// score.append(scoreElement)
	currentState.scoreElement = scoreElement
}


/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
