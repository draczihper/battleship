import { GameController } from "./gameController.js";

document.addEventListener("DOMContentLoaded", () => {
    const game = GameController();
    game.initGame();
});