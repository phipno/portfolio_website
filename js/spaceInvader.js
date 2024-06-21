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

const state = {
	numCells: (600/40) * (600/40),
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

let copyState = state;

export const setupGame = (element) => {
	let copyState = state;
	copyState.element = element
	//draw the grid
	drawGrid()
	//draw spaceship
	drawSpaceShip()
	//draw aliens
	drawAliens()
	//instructions and score
	drawScoreboard()
}

const drawGrid = () => {
	//create containing element
	const grid = document.createElement("div")
	grid.classList.add("grid")
	//create a lot of cells - 15 x 15
	for (let i = 0; i < copyState.numCells; i++) {
		const cell = document.createElement("div")
		grid.append(cell)
		copyState.cells.push(cell)
	}
	//append the cells to the element	
	copyState.element.insertBefore(grid, copyState.element.children[0])
}

const drawSpaceShip = () => {
	copyState.cells[copyState.shipPosition].classList.add("spaceship")
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
	if (copyState.gameStarted) {
		copyState.cells[copyState.shipPosition].classList.remove("spaceship")
		//figure out delta
		if (direction === "left" && copyState.shipPosition % 15 !== 0) {
			copyState.shipPosition--
		} else if (direction === "right" && copyState.shipPosition % 15 !== 14) {
			copyState.shipPosition++
		}
		//add image to new pos
		copyState.cells[copyState.shipPosition].classList.add("spaceship")
	}
}

export const fire = () => {
	//use an interval
	if (copyState.gameStarted) {
		let interval;
		let laserposition = copyState.shipPosition
		interval = setInterval(() => {
			copyState.cells[laserposition].classList.remove("laser")
			laserposition-=15
			if (laserposition < 0) {
				clearInterval(interval)
				return
			}
			if (copyState.alienPositions.includes(laserposition)) {
				clearInterval(interval)
				copyState.alienPositions.splice(copyState.alienPositions.indexOf(laserposition), 1)
				copyState.cells[laserposition].classList.remove("alien", "laser")
				copyState.cells[laserposition].classList.add("explosion")
				copyState.score++
				copyState.scoreElement.innerText = copyState.score
				setTimeout(() => {
					copyState.cells[laserposition].classList.remove("explosion")
				}, 200)
				return
			}
			copyState.cells[laserposition].classList.add("laser")
		}, 50)
	}
}

const drawAliens = () => {
	copyState.cells.forEach((cell, index) => {
		if (cell.classList.contains("alien")) {
			cell.classList.remove("alien")
		}
		if (copyState.alienPositions.includes(index)) {
			cell.classList.add("alien")
		}
	})
		
}

const atEdge = (side) => {
	if (side === "left") {
		return copyState.alienPositions.some(position => position % 15 === 0)
	} else if (side === "right") {
		return copyState.alienPositions.some(position => position % 15 === 14)
	}
}

export const play = () => {
	//start movement of aliens
	if (copyState.gameStarted)
		return;
	// if (copyState.gameover)
	// 		setupGame()
	let interval
	let direction = "right"
	let movement
	copyState.gameStarted = true
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
		copyState.alienPositions = copyState.alienPositions.map(position => position + movement)
		drawAliens()
		checkGameState(interval)
	}, 400)
	//set up ship controls
	window.addEventListener("keydown", controllShip)
}

const checkGameState = (interval) => {
	if (copyState.alienPositions.length === 0) {
		copyState.gameover = true
		copyState.gameStarted = false
		clearInterval(interval)
		drawMessage("HUMAN WIN!")
	} else if (copyState.alienPositions.some(position => position >= copyState.shipPosition)) {
		clearInterval(interval)
		copyState.gameover = true
		copyState.gameStarted = false
		copyState.cells[copyState.shipPosition].classList.remove("spaceship")
		copyState.cells[copyState.shipPosition].classList.add("explosion")
		drawMessage("GAME OVER!")
	}
}

const drawMessage = (message) => {
	const messageElement = document.createElement("div")
	messageElement.classList.add("message")
	const h1 = document.createElement("h1")
	h1.innerText = message
	messageElement.append(h1)
	copyState.element.append(messageElement)
}

const drawScoreboard = () => {
	const scoreElement = document.createElement('span')
	scoreElement.innerText = copyState.score
	const score = document.getElementById('score');
	
	// score.append(scoreElement)
	copyState.scoreElement = scoreElement
}


/* "~._.~"~._.~"~._.~"~._.~"~._.~"~. E O F .~"~._.~"~._.~"~._.~"~._.~"~._.~" */
