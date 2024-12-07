function UIController(playerBoard, computerBoard, attackCallback) {
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");
    const gameStatusElement = document.getElementById("game-status");


    function renderBoard(board, boardElement, isPlayerBoard = true) {
        boardElement.innerHTML = "";
        boardElement.className = "board"
        boardElement.style.gridTemplateColumns = "repeat(10, 1fr)"
        
        const gridData = board.getGrid();

        gridData.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellElement = document.createElement("div")
                cellElement.classList.add("board-cell");


                switch (cell) {
                    case ".":
                        cellElement.classList.add("empty")
                        break;
                    case "O":
                        cellElement.classList.add("ship");
                        break;
                    case "H":
                        cellElement.classList.add("hit")
                        break;
                    case "X":
                        cellElement.classList.add("sunk");
                        break;
                }

                if (!isPlayerBoard) {
                    cellElement.dataset.x = x;
                    cellElement.dataset.y = y;
                    cellElement.addEventListener("click", () => attackCallback(x, y));
                }

                boardElement.appendChild(cellElement)
            });
        });
    }

    function renderBoards() {
        renderBoard(playerBoard, playerBoardElement);
        renderBoard(computerBoard, computerBoardElement, false);
    }

    function updatePlayerBoard() {
        renderBoard(playerBoard, playerBoardElement);
    }

    function updateComputerBoard() {
        renderBoard(computerBoard, computerBoardElement, false);
    }

    function displayGameOver(message) {
        gameStatusElement.textContent = message;
    }

    return {
        renderBoards,
        updatePlayerBoard,
        updateComputerBoard,
        displayGameOver
    };
}


export { UIController };

