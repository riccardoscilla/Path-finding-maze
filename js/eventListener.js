var mouseDown = false
document.addEventListener("mousedown", () => { mouseDown = true })
document.addEventListener("mouseup", () => { mouseDown = false })

function wallEventListener(grid) {
    let cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        cell.addEventListener("mouseenter", function (event) { 

            if (!mouseDown)
                return

            // console.log(cell.id)
            grid.clearPath()

            cell_obj = grid.find(cell)
            if (cell_obj.isWall)
                grid.pattern.push([cell_obj, "empty"])
            else
                grid.pattern.push([cell_obj, "wall"])

            grid.drawPattern()

        }, false);
        cell.addEventListener("click", function (event) { 

            cell_obj = grid.find(cell)

            // console.log(cell.id)
            grid.clearPath()
            
  
            if (cell_obj.isWall)
                grid.pattern.push([cell_obj, "empty"])
            else
                grid.pattern.push([cell_obj, "wall"])

            grid.drawPattern()

        }, false);
    })
    
}



function clearEventListener(grid) {
    let clear_btn = document.querySelector(".clear")
    clear_btn.addEventListener("click", function () {
        grid.reset()
    })
}

function mazeEventListener(grid) {
    document.querySelector("nav").addEventListener("click", function (el) {
        // console.log(el.target.classList)
        if (!el.target.className)
            return
        // maze button
        if (el.target.classList.contains("maze")){
            grid.reset()

            if (el.target.classList.contains("random"))
                drawRandom(grid)
            else if (el.target.classList.contains("recursive-division"))
                drawRecursiveDivision(grid)
            else if (el.target.classList.contains("recursive-backtracking"))
                drawRecursiveBacktracking(grid)

            grid.drawPattern()
        }
        
        // console.log(el.target.className)
    })
}

function algorithmEventListener(grid){
    document.querySelector("nav").addEventListener("click", function (el) {
        if (!el.target.className)
            return
        // algorithm button
        if (el.target.classList.contains("algo")){
            grid.setAlgorithm(el.target.innerHTML)
            document.querySelector(".solve-text").innerHTML = "Solve: "+grid.algo_name+"!"
        }
    })
}

function solveEventListener(grid) {
    let solve_btn = document.querySelector(".solve")
    solve_btn.addEventListener("click", function () {

        // complete task with time-transaction instant
        if (grid.pattern.length !== 0){
            let pattern_tmp = [...grid.pattern]
            let transition_time_tmp = grid.transition_time
            grid.resetPattern()
            grid.setTransitionTime(0)
            grid.pattern = Array.from(pattern_tmp)
            grid.drawPattern()

            grid.resetPattern()
            grid.setTransitionTime(transition_time_tmp)
        }

        // if algo not specified --> tooltip

        
        grid.clearPath()
        console.log(grid.algo_name)
        
        if (grid.algo_name === "Dijkstra")
            Dijkstra(grid)
        else if (grid.algo_name === "A* Search")
            Astar(grid)
        // else if (grid.algo_name === "IDA* Search")
        //     IDAstar(grid)
        else if (grid.algo_name === "DFS")
            DFS(grid)
        else if (grid.algo_name === "BFS")
            BFS(grid)
        
        grid.drawPattern()
    })
}

function gridsizeEventListener(grid) {
    document.querySelector("nav").addEventListener("click", function (el) {
        if (!el.target.className)
            return
        // maze button
        if (el.target.classList.contains("gridsize")){

            if (el.target.classList.contains("grid-small"))
                grid.setSize(21,9)
            else if (el.target.classList.contains("grid-medium"))
                grid.setSize(43,19)
            else if (el.target.classList.contains("grid-large"))
                grid.setSize(65,29)

            grid.destroy()
            grid.create()
            wallEventListener(grid) // must re-trigger the event on td (removed in grid.destroy())
            
        }
    })
}

function transitionTimeEventListener(grid) {
    document.querySelector("nav").addEventListener("click", function (el) {
        if (!el.target.className)
            return
        // transition speed button
        if (el.target.classList.contains("transition")){


            let pattern_tmp = [...grid.pattern]
            grid.resetPattern()

            // console.log(grid.pattern.length)


            if (el.target.classList.contains("transition-slow"))
                grid.setTransitionTime(500)
            else if (el.target.classList.contains("transition-middle"))
                grid.setTransitionTime(100)
            else if (el.target.classList.contains("transition-fast"))
                grid.setTransitionTime(10)
            else if (el.target.classList.contains("transition-instant"))
                grid.setTransitionTime(0)

            // console.log(grid.transition_time)

            grid.pattern = Array.from(pattern_tmp)
            grid.drawPattern()
        }
    })
}

function titleEventListener(grid) {
    let title_btn = document.querySelector(".logo")
    title_btn.addEventListener("click", function () {

        grid.setTransitionTime(10)
        grid.setSize(43,19)

        grid.destroy()
        grid.create()
        wallEventListener(grid) // must re-trigger the event on td (removed in grid.destroy())

        drawCellsDiagonal(grid, titlePath)
    })
}


function windowResizeEventListener(grid) {
    window.addEventListener('resize', function(event){
        let aspect = getAspect()

        if (aspect !== grid.aspect){
            grid.setAspect(aspect)
        }
    })
}

function startEventListener(grid){
    titleEventListener(grid)
    wallEventListener(grid)
    windowResizeEventListener(grid)

    mazeEventListener(grid)
    algorithmEventListener(grid)

    solveEventListener(grid)

    clearEventListener(grid)
    gridsizeEventListener(grid)
    transitionTimeEventListener(grid)
}
