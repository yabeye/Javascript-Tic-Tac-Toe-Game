/* Now The Fun Begins */
const X_MARK = 'x'
const O_MARK = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const newGameBtn = document.getElementById('new-game')
const gameCountLabel = document.getElementById('game-count');
const player1Score = document.getElementById('player-1-score')
const player2Score = document.getElementById('player-2-score')
const board = document.getElementById('board')
const cells = document.querySelectorAll('[data-cell]')
const resultArea = document.getElementById('result-area')
const summaryResultText = document.getElementById('current-result-text')
const resultMessageText = document.getElementById('result-message-text')
const restartGameBtn = document.getElementById('restart')

let gameCount = 1;
let xTurn = false;
let isItFirstTimeGame = false;

function restart() {
    xTurn = !xTurn;
    removeClassesFrom(board)
    addClassTo(board)
    resultArea.classList.remove('show')
    cells.forEach(cell => {
        cell.classList.remove(X_MARK)
        cell.classList.remove(O_MARK)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {
            once: true
        })
    })
}

function startNewGame() {
    if (isItFirstTimeGame)
        if (!confirm('Would you want to play a new game?')) {
            resultArea.classList.add('show')
            return
        }
    summaryResultText.innerHTML = `Current Result : X= ${player1Score.innerHTML} , O=${player2Score.innerHTML} and Total-Game = ${gameCount-1}`
    isItFirstTimeGame = true
    restart()
    gameCount = 1
    gameCountLabel.innerHTML = `Game 1`
    player1Score.innerHTML = 0
    player2Score.innerHTML = 0

}


function removeClassesFrom(elementName) {
    elementName.classList.remove(X_MARK)
    elementName.classList.remove(O_MARK)
}

function addClassTo(elementName) {
    elementName.classList.add(tellTurn())
}

function tellTurn() {
    return (xTurn ? 'x' : 'o');
}

function handleClick(e) {
    const cell = e.target
    addClassTo(cell)
    let currentTurn = tellTurn()
    if (checkWin(currentTurn)) {
        // Display winning message//
        //Winner is current Mark 
        gameCount += 1
        gameCountLabel.innerHTML = `Game ${gameCount}`
        if (currentTurn === X_MARK) {
            player1Score.innerHTML = parseInt(player1Score.innerHTML) + 1
        } else {
            player2Score.innerHTML = parseInt(player2Score.innerHTML) + 1
        }
        summaryResultText.innerHTML = `Current Result : X= ${player1Score.innerHTML} , O=${player2Score.innerHTML} and Total-Game = ${gameCount-1}`
        resultMessageText.innerHTML = `${(currentTurn.toUpperCase())} Wins`
        resultArea.classList.add('show')
        document.getElementById('draw').classList.remove('show')
        document.getElementById('win').classList.add('show')
    } else if (checkDraw()) {
        // Display Draw Message // 
        gameCount += 1
        gameCountLabel.innerHTML = `Game ${gameCount}`
        summaryResultText.innerHTML = `Current Result : X= ${player1Score.innerHTML} , O=${player2Score.innerHTML} and Total-Game = ${gameCount-1}`
        resultMessageText.innerHTML = "Tie Game"
        resultArea.classList.add('show')
        document.getElementById('win').classList.remove('show')
        document.getElementById('draw').classList.add('show')
    } else {
        xTurn = !xTurn
        // Update board class Here //
        removeClassesFrom(board)
        addClassTo(board)

    }

}

function checkWin(currentMark) {
    return WINNING_COMBINATIONS.some(combs => {
        return [...combs].every(index => {
            return cells[index].classList.contains(currentMark)
        })
    })
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_MARK) || cell.classList.contains(O_MARK)
    })
}

// Main //
startNewGame()
newGameBtn.addEventListener('click', startNewGame)
restartGameBtn.addEventListener('click', restart)