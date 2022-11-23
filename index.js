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
	score: 0
}

const setupGame = (element) => {
	state.element = element
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
	for (let i = 0; i < state.numCells; i++) {
		const cell = document.createElement("div")
		grid.append(cell)
		state.cells.push(cell)
	}
	//append the cells to the element	
	state.element.append(grid)
}

const drawSpaceShip = () => {
	state.cells[state.shipPosition].classList.add("spaceship")
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

const moveShip = (direction) => {
	//remove image from current pos
	state.cells[state.shipPosition].classList.remove("spaceship")
	//figure out delta
	if (direction === "left" && state.shipPosition % 15 !== 0) {
		state.shipPosition--
	} else if (direction === "right" && state.shipPosition % 15 !== 14) {
		state.shipPosition++
	}
	//add image to new pos
	state.cells[state.shipPosition].classList.add("spaceship")
}

const fire = () => {
	//use an interval
	let interval;
	let laserposition = state.shipPosition
	interval = setInterval(() => {
		state.cells[laserposition].classList.remove("laser")
		laserposition-=15
		if (laserposition < 0) {
			clearInterval(interval)
			return
		}
		if (state.alienPositions.includes(laserposition)) {
			clearInterval(interval)
			state.alienPositions.splice(state.alienPositions.indexOf(laserposition), 1)
			state.cells[laserposition].classList.remove("alien", "laser")
			state.cells[laserposition].classList.add("explosion")
			state.score++
			state.scoreElement.innerText = state.score
			setTimeout(() => {
				state.cells[laserposition].classList.remove("explosion")
			}, 200)
			return
		}
		state.cells[laserposition].classList.add("laser")
	}, 100)
}

const drawAliens = () => {
	state.cells.forEach((cell, index) => {
		if (cell.classList.contains("alien")) {
			cell.classList.remove("alien")
		}
		if (state.alienPositions.includes(index)) {
			cell.classList.add("alien")
		}
	})
		
}

const atEdge = (side) => {
	if (side === "left") {
		return state.alienPositions.some(position => position % 15 === 0)
	} else if (side === "right") {
		return state.alienPositions.some(position => position % 15 === 14)
	}
}

const play = () => {
	//start movement of aliens
	let interval
	let direction = "right"
	let movement
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
		state.alienPositions = state.alienPositions.map(position => position + movement)
		drawAliens()
		checkGameState(interval)
	}, 400)
	//set up ship controls
	window.addEventListener("keydown", controllShip)
}

const checkGameState = (interval) => {
	if (state.alienPositions.length === 0) {
		state.gameover = true
		clearInterval(interval)
		drawMessage("HUMAN WIN!")
	} else if (state.alienPositions.some(position => position >= state.shipPosition)) {
		clearInterval(interval)
		state.gameover = true
		state.cells[state.shipPosition].classList.remove("spaceship")
		state.cells[state.shipPosition].classList.add("explosion")
		drawMessage("GAME OVER!")
	}
}

const drawMessage = (message) => {
	const messageElement = document.createElement("div")
	messageElement.classList.add("message")
	const h1 = document.createElement("h1")
	h1.innerText = message
	messageElement.append(h1)
	state.element.append(messageElement)
}

const drawScoreboard = () => {
	const heading = document.createElement("h1")
	heading.innerText = 'Space Invaders'
	const paragraph1 = document.createElement("p")
	paragraph1.innerText = 'Press SPACE to shoot.'
	const paragraph2 = document.createElement("p")
	paragraph2.innerText = 'Press ← and → to move'
	const scoreboard = document.createElement('div')
	scoreboard.classList.add('scoreboard')
	const scoreElement = document.createElement('span')
	scoreElement.innerText = state.score
	const heading3 = document.createElement('h3')
	heading3.innerText = 'Score: '
	heading3.append(scoreElement)
	scoreboard.append(heading, paragraph1, paragraph2, heading3)
  
	state.scoreElement = scoreElement
	state.element.append(scoreboard)
}
  
//query the page for the place to insert game
const appElement = document.querySelector(".app")

//do all things needed to draw the game
setupGame(appElement)

//play the game - start to move, move aliens
play()