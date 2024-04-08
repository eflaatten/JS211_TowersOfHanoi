let stone = null

let selectedStone = null
let selectedColID = null

// Moves start at 0
let moves = 0

// Selecting one of the towers and stone
const selectCol = (col) => {
  const currentCol = col.getAttribute("data-col")
  const colID = col.id

  if(selectedStone){
    const currentSize = parseInt(selectedStone.getAttribute('data-size'))
    moveStone(currentSize, currentCol)
    selectedStone = null
  } else {
    selectedStone = col.lastElementChild
  }

  console.log("Yay, we clicked an item", col)
  console.log("Here is the stone's id: ", colID)
  console.log("Here is the stone's data-size: ", currentCol)
} 

// Selecting the stone
const pickUpStone = (colID) => {
  const selectedCol = document.getElementById(colID)

  if(selectedCol.children.length > 0){
    selectedColID = colID
  }
  console.log(stone)
}

// Moving the stone to the target column
const moveStone = (size, target) => {

  // Check if move is legal
  if(isLegal(size, target)){
    const targetColEl = document.querySelector(`[data-col=${target}]`)

    // Place the stone in the target column
    targetColEl.appendChild(selectedStone)

    // Play sound when stone is placed
    playStonePlacedSound()

    // Moves go up by 1
    moves++

    // Calling the function to update the move count
    updateMoveCount()
  } else {
    playIllegalMoveSound()
    showErrorMessage('Illegal move!')
    console.log('Illegal move')
  }

  // Checking for win after every move
  if(checkForWin()){
    gameWonSound()
    showSuccessMessage('Well done!')
    console.log('You win!')
  }
}

// Dropping the stone into the target column
const dropStone = (colID) => {
  const targetCol  = document.getElementById(colID)

  if(selectedStone && selectedColID !== colID){
    targetCol.appendChild(selectedStone)
    console.log('dropped stone into', colID)
  }
}

// Function to check if the move is legal
const isLegal = (size, target) => {
  const destinationColEl = document.querySelector(`.tower[data-col="${target}"]`)
  const topStone = destinationColEl.lastElementChild

  if(!topStone){
    return true
  }
  // else, if the top stone is smaller than the stone being moved
  return parseInt(size) < parseInt(topStone.getAttribute("data-size"))
}

const checkForWin = () => {
  const winningStack = document.querySelector('.tower[data-col="right"]')
  return winningStack.children.length === 4
}

// Resetting the game
const reset = () => {
  const leftStack = document.querySelector('.tower[data-col="left"]')
  const stones = document.querySelectorAll('.stone')
  const messageContainer = document.getElementById('messageContainer')

  // Removing the win message
  while(messageContainer.firstChild){
    messageContainer.removeChild(messageContainer.firstChild)
  }
  // setting the move count to 0 and updating it
  moves = 0
  updateMoveCount()

  // Resetting the stones to the left tower in the correct order
  const stoneArr = []
  // Sorting the stones by size
  stones.forEach(stone => {
    const size = parseInt(stone.getAttribute('data-size'))
    stoneArr.push({element: stone, size: size})
  })

  stoneArr.sort((a, b) => b.size - a.size)

  return stoneArr.forEach(stone => leftStack.appendChild(stone.element))
}

// Functions for HTML elements

// Function to show the illegal move message
const showErrorMessage = (message) => {
  const messageContainer = document.getElementById('messageContainer')
  const errorMessage = document.createElement('div')

  errorMessage.textContent = message
  errorMessage.classList.add('error')
  messageContainer.appendChild(errorMessage)
  setTimeout(() => {
      messageContainer.removeChild(errorMessage)
  }, 2000) 
}

// Function to show the win message
const showSuccessMessage = (message) => {
  const messageContainer = document.getElementById('messageContainer')
  const successMessage = document.createElement('div')

  successMessage.textContent = message
  successMessage.classList.add('success')
  messageContainer.appendChild(successMessage)
}

// Function to show the updated move count
const updateMoveCount = () => {
  const moveCountEl = document.getElementById('move-count')
  moveCountEl.textContent = `Moves: ${moves}`
}

// Audio for the game

const playStonePlacedSound = () => {
  const stonePlaced = document.getElementById('stonePlacedSound')
  stonePlaced.play()
}

const playIllegalMoveSound = () => {
  const illegalMove = document.getElementById('illegalMoveSound')
  illegalMove.play()
}

const gameWonSound = () => {
  const gameWon = document.getElementById('winSound')
  gameWon.play()
}

