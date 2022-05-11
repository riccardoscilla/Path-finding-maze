class Game {
    constructor() {

        let grid = new Grid()

        startEventListener(grid)

        // drawRecursiveBacktracking(grid)
        // drawContour(grid)
        // grid.drawPattern()
    }
}


window.onload = function () {
    new Game()


};


