var mouse_down = false
document.addEventListener("mousedown", () => { mouse_down = true })
document.addEventListener("mouseup", () => { mouse_down = false })

var dragging_start = false
var dragging_goal = false

function DDEventListener(grid) {
    grid.element.addEventListener("mousedown", function (event) {
        event.preventDefault()

        if (event.target.classList.contains("start")) {
            // add instant termination maze
            completePatternInstant(grid)
            grid.clearPath()
            dragging_start = true
        }
        else if (event.target.classList.contains("goal")) {
            // add instant termination maze
            completePatternInstant(grid)
            grid.clearPath()
            dragging_goal = true
        }


    })

    document.addEventListener("mouseup", function (event) {
        event.preventDefault()

        dragging_start = false
        grid.start.cell.classList.add("start")

        dragging_goal = false
        grid.goal.cell.classList.add("goal")

    })

    grid.element.addEventListener("mouseenter", function (event) {
        event.preventDefault()

        if (dragging_start) {
            grid.start.cell.classList.remove("start")
        }
        else if (dragging_goal) {
            grid.goal.cell.classList.remove("goal")
        }

    })

    grid.element.addEventListener("mouseleave", function (event) {
        event.preventDefault()

        if (dragging_start) {
            grid.start.cell.classList.add("start")
            grid.start.isStart = true
        }
        else if (dragging_goal) {
            grid.goal.cell.classList.add("goal")
            grid.goal.isGoal = true
        }

    })



    let cells = document.querySelectorAll("td");
    cells.forEach(cell => {

        cell.addEventListener("mouseenter", function (event) {
            let cell_obj = grid.find(event.target)
            let cell_class = event.target.lastChild.classList

            if (!mouse_down)
                return

            if (dragging_start) {
                if (cell_class.contains("goal")) {
                    grid.start.cell.classList.add("start")
                    return
                }

                cell_class.remove("wall")
                cell_class.add("start")
                cell_obj.isStart = true
                grid.start = cell_obj
            }
            else if (dragging_goal) {
                if (cell_class.contains("start")) {
                    grid.goal.cell.classList.add("goal")
                    return
                }

                cell_class.remove("wall")
                cell_class.add("goal")
                cell_obj.isGoal = true
                grid.goal = cell_obj
            }
            else {
                if (cell_class.contains("start") || cell_class.contains("goal"))
                    return
                
                completePatternInstant(grid)
                grid.clearPath()               
                cell_class.toggle("wall")
                cell_obj.isWall = cell_class.contains("wall") ? true : false
            }

        }, false)

        cell.addEventListener("mouseleave", function (event) {
            let cell_obj = grid.find(event.target)
            let cell_class = event.target.lastChild.classList

            if (dragging_start) {
                if (cell_obj.isWall)
                    cell_class.add("wall")

                grid.start.cell.classList.remove("start")
                cell_class.remove("start")
                cell_obj.isStart = false
            }
            else if (dragging_goal) {
                if (cell_obj.isWall)
                    cell_class.add("wall")

                grid.goal.cell.classList.remove("goal")
                cell_class.remove("goal")
                cell_obj.isGoal = false
            }

        }, false)

        cell.addEventListener("click", function (event) {
            let cell_obj
            let cell_class
            if (event.target.lastChild) { //td
                cell_obj = grid.find(event.target)
                cell_class = event.target.lastChild.classList
            } 
            else { // div cell
                cell_obj = grid.find(event.target.parentElement)
                cell_class = event.target.classList
            }

            if (cell_class.contains("start") || cell_class.contains("goal"))
                return

            completePatternInstant(grid)
            grid.clearPath()
            cell_class.toggle("wall")
            cell_obj.isWall = cell_class.contains("wall") ? true : false

        }, false);

    })
}

// ####################################################################

function toggleTooltip(msg) {
    let tooltip = document.querySelector(".tooltip")
    tooltip.innerHTML = msg

    tooltip.style.visibility = "visible"
    tooltip.style.opacity = "1"

    var timeOut = setTimeout(function () {
        tooltip.style.visibility = "hidden"
        tooltip.style.opacity = "0"
    }, 2000);
}


function clearEventListener(grid) {
    let clear_btn = document.querySelector(".clear")
    clear_btn.addEventListener("click", function () {
        grid.reset()
    })
}

function mazeEventListener(grid) {
    document.querySelector("nav").addEventListener("click", function (el) {
        if (!el.target.className)
            return
        // maze button
        if (el.target.classList.contains("maze")) {
            document.querySelector(".maze-label").innerHTML = el.target.innerHTML

            grid.reset()

            if (el.target.classList.contains("random"))
                drawRandom(grid)
            else if (el.target.classList.contains("recursive-division"))
                drawRecursiveDivision(grid)
            else if (el.target.classList.contains("recursive-backtracking"))
                drawRecursiveBacktracking(grid)

            grid.drawPattern()
        }

    })
}

function algorithmEventListener(grid) {
    document.querySelector("nav").addEventListener("click", function (el) {
        if (!el.target.className)
            return
        // algorithm button
        if (el.target.classList.contains("algo")) {
            grid.setAlgorithm(el.target.innerHTML)
            document.querySelector(".algo-label").innerHTML = grid.algo_name
        }
    })
}

function completePatternInstant(grid){
    if (grid.pattern.length !== 0) {
        let pattern_tmp = [...grid.pattern]
        let transition_time_tmp = grid.transition_time
        grid.resetPattern()
        grid.setTransitionTime(0)
        grid.pattern = Array.from(pattern_tmp)
        grid.drawPattern()

        grid.resetPattern()
        grid.setTransitionTime(transition_time_tmp)
    }

}

function solveEventListener(grid) {
    let solve_btn = document.querySelector(".solve")
    solve_btn.addEventListener("click", function () {

        // complete task with time-transaction instant
        completePatternInstant(grid)

        // if algo not specified --> tooltip
        if (!grid.algo_name) {
            toggleTooltip("No algo selected")
            return
        }


        grid.clearPath()
        console.log(grid.algo_name)

        if (grid.algo_name === "Dijkstra")
            Dijkstra(grid)
        else if (grid.algo_name === "A* Search")
            Astar(grid)
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
        if (el.target.classList.contains("gridsize")) {

            if (el.target.classList.contains("grid-small"))
                grid.setSize(21, 9)
            else if (el.target.classList.contains("grid-medium"))
                grid.setSize(43, 19)
            else if (el.target.classList.contains("grid-large"))
                grid.setSize(65, 29)

            grid.destroy()
            grid.create()

            DDEventListener(grid) // must re-trigger the event on td (removed in grid.destroy())

        }
    })
}

function benchmarkEventListener(grid) {
    document.querySelector(".benchmark").addEventListener("click", function () {
        toggleTooltip("Feature not implemented yet")
    })
}

function transitionTimeEventListener(grid) {
    document.querySelector("nav").addEventListener("click", function (el) {
        if (!el.target.className)
            return
        // transition speed button
        if (el.target.classList.contains("transition")) {


            let pattern_tmp = [...grid.pattern]
            grid.resetPattern()

            if (el.target.classList.contains("transition-slow"))
                grid.setTransitionTime(500)
            else if (el.target.classList.contains("transition-middle"))
                grid.setTransitionTime(100)
            else if (el.target.classList.contains("transition-fast"))
                grid.setTransitionTime(10)
            else if (el.target.classList.contains("transition-instant"))
                grid.setTransitionTime(0)

            grid.pattern = Array.from(pattern_tmp)
            grid.drawPattern()
        }
    })
}

function titleEventListener(grid) {
    let title_btn = document.querySelector(".title")
    title_btn.addEventListener("click", function () {

        grid.setTransitionTime(10)
        grid.setSize(43, 19)

        grid.destroy()
        grid.create()
 
        DDEventListener(grid) // must re-trigger the event on td (removed in grid.destroy())

        drawCellsDiagonal(grid, titlePath)
    })
}


function windowResizeEventListener(grid) {
    window.addEventListener('resize', function (event) {
        let aspect = getAspect()

        if (aspect !== grid.aspect) {
            grid.setAspect(aspect)
        }
    })
}


// ####################################################################

function startEventListener(grid) {

    DDEventListener(grid)

    titleEventListener(grid)
    windowResizeEventListener(grid)

    mazeEventListener(grid)
    algorithmEventListener(grid)

    solveEventListener(grid)

    clearEventListener(grid)
    benchmarkEventListener(grid)

    gridsizeEventListener(grid)
    transitionTimeEventListener(grid)

}
