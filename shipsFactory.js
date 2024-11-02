// Ship factory
function Ships() {
    return {
        ship: {
            length: Math.floor(Math.random * 5),
            hit: 0,
            isSunk: false,
        }
    }
}