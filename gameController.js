import Player from "./player.js";
import { UIController } from "./uiController.js";

function GameController() {
    const playerOne = Player("human");
    const computer = Player("computer");

    let currentPlayer = playerOne;
    let gameOver = false;

    playerOne.placeShipsRandomly();
    computer.placeShipsRandomly();

    const uiController = UIController(
        playerOne.gameboard,
        computer.gameboard,
        handlePlayerAttack
    )

    function switchTurn() {
        currentPlayer = currentPlayer === playerOne ? computer : playerOne
    }

    function handleComputerTurn() {
        const attackResult = computer.attack(playerOne.gameboard)
        uiController.updatePlayerBoard();

        checkGameStatus(playerOne);
    }

    function handlePlayerAttack(x, y) {
        if (gameOver) return;

        const attackResult = computer.gameboard.receiveAttack(x, y);
        uiController.updateComputerBoard();


        checkGameStatus(computer)

        if (!gameOver) {
            setTimeout(handleComputerTurn, 500);
        }
    }

    function checkGameStatus(attackedPlayer) {
        if (attackedPlayer.gameboard.allShipsSunk()) {
            gameOver = true;
            uiController.displayGameOver(
                attackedPlayer === computer ? "Player Wins!" : "Computer Wins!"
            );
        }
    }

    function initGame() {
        uiController.renderBoards();
    }


    return {
        initGame,
    };
}


export { GameController };