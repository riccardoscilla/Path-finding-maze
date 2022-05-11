function heurisic(a, b) {
    // manhattan distance
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function Dijkstra(grid) {
    let vertexSet = new Array()

    for (let y = 0; y < grid.max_row; y++) {
        for (let x = 0; x < grid.max_col; x++) {
            grid.grid[y][x].distance = Infinity
            vertexSet.push(grid.grid[y][x])
        }
    }

    let start = grid.start
    let goal = grid.goal

    let cameFrom = new Map()

    start.distance = 0

    while (vertexSet.length !== 0) {
        //get cell object with lowest distance
        let current = vertexSet.reduce(function (prev, curr) {
            return prev.distance < curr.distance ? prev : curr;
        })

        if (current === goal) {
            // show best path
            let totalPath = [current]
            while (Array.from(cameFrom.keys()).includes(current)) {
                current = cameFrom.get(current)
                totalPath.push(current)
            }
            for (let i = totalPath.length - 1; i >= 0; i--) {
                grid.pattern.push([totalPath[i], "path"])
            }
            return
        }

        // remove current from vertex
        vertexSet = vertexSet.filter(function (value, index, arr) {
            return value !== current
        })

        var neighbors = getNeighbors(grid, current)

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            var tmpDistance = current.distance + 1

            if (tmpDistance < neighbor.distance) {
                neighbor.distance = tmpDistance
                cameFrom.set(neighbor, current)

                grid.pattern.push([neighbor, "visited"])
            }
        }

    }
}

function Astar(grid) {
    for (let y = 0; y < grid.max_row; y++) {
        for (let x = 0; x < grid.max_col; x++) {
            grid.grid[y][x].g = Infinity
            grid.grid[y][x].h = 0
        }
    }
    let start = grid.start
    let goal = grid.goal

    let openSet = new Array()
    openSet.push(start)

    let cameFrom = new Map()

    start.g = 0
    start.h = heurisic(start, goal)

    while (openSet.length !== 0) {
        //get cell object with lowest f
        let current = openSet.reduce(function (prev, curr) {
            return prev.f < curr.f ? prev : curr;
        })

        if (current === goal) {
            // show best path
            let totalPath = [current]
            while (Array.from(cameFrom.keys()).includes(current)) {
                current = cameFrom.get(current)
                totalPath.push(current)
            }
            for (let i = totalPath.length - 1; i >= 0; i--) {
                grid.pattern.push([totalPath[i], "path"])
            }
            return
        }

        openSet = openSet.filter(function (value, index, arr) {
            return value !== current
        })

        var neighbors = getNeighbors(grid, current)

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            var tmpG = current.g + 1

            if (tmpG < neighbor.g) {
                cameFrom.set(neighbor, current)
                neighbor.g = tmpG
                neighbor.h = heurisic(neighbor, goal)

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor)
                }

                grid.pattern.push([neighbor, "visited"])

            }
        }
    }
    console.log("ERRORE")
}

function IDAstar(grid) {
    for (let y = 0; y < grid.max_row; y++) {
        for (let x = 0; x < grid.max_col; x++) {
            grid.grid[y][x].g = 0
            grid.grid[y][x].h = 0
        }
    }
    let start = grid.start
    
    let threshold = heurisic(start, grid.goal)

    let path = new Array()
    path.push(start)

    while (true){
        let path = new Array()
        path.push(start)

        let tmp = IDAstarSearch(grid, threshold, path)
        if (tmp === "FOUND"){
            // show best path
            grid.pattern = onlyUnique(grid.pattern)
            for (let i = 0; i < path.length ; i++) {
                grid.pattern.push([path[i], "path"])
            }
            return
        }
         
        if (tmp === Infinity){
            console.log("NOT FOUND")
            return
        }

        threshold = tmp
    }

}


function IDAstarSearch(grid, threshold, path) {
    let current = path[path.length-1]
    current.h = heurisic(current,grid.goal)

    if (current.f > threshold) return current.f
    if (current === grid.goal) return "FOUND"
    let min = Infinity

    let neighbors = getNeighbors(grid, current)

    for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i]
        if (!path.includes(neighbor)){
            neighbor.g = current.g + 1
            grid.pattern.push([neighbor, "visited"])
            
            path.push(neighbor)
            let tmp = IDAstarSearch(grid, threshold, path)
            if (tmp === "FOUND") return "FOUND"
            if (tmp < min) min = tmp
            path.pop()
        }
    }
    return min
}


function DFS(grid){
    for (let y = 0; y < grid.max_row; y++) {
        for (let x = 0; x < grid.max_col; x++) {
            grid.grid[y][x].dfs_mark = false
        }
    }

    let start = grid.start
    let goal = grid.goal

    let stack = new Array() //push pop
    let cameFrom = new Map()

    stack.push(start)
    start.dfs_mark = true

    while(stack.length !== 0){
        let current = stack.pop()
        
        if (current === goal)
            break

        let neighbors = getNeighbors(grid, current, false)
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            if(!neighbor.dfs_mark){
                neighbor.dfs_mark = true
                cameFrom.set(neighbor, current)
                grid.pattern.push([neighbor, "visited"])
                stack.push(neighbor)
            }
            
        }
        
    }

    let current = goal
    let totalPath = [current]
    while (Array.from(cameFrom.keys()).includes(current)) {
        current = cameFrom.get(current)
        totalPath.push(current)
    }
    for (let i = totalPath.length - 1; i >= 0; i--) {
        grid.pattern.push([totalPath[i], "path"])
    }
}


function BFS(grid){
    for (let y = 0; y < grid.max_row; y++) {
        for (let x = 0; x < grid.max_col; x++) {
            grid.grid[y][x].bfs_mark = false
        }
    }
    let start = grid.start
    let goal = grid.goal

    let queue = new Array() //push shift
    let cameFrom = new Map()

    queue.push(start)
    start.bfs_mark = true

    while(queue.length !== 0){
        let current = queue.shift()
        
        if (current === goal)
            break
        
        let neighbors = getNeighbors(grid, current, false)
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            if(!neighbor.bfs_mark){
                neighbor.bfs_mark = true
                cameFrom.set(neighbor, current)
                grid.pattern.push([neighbor, "visited"])
                queue.push(neighbor)
            }            
        }
    }

    let current = goal
    let totalPath = [current]
    while (Array.from(cameFrom.keys()).includes(current)) {
        current = cameFrom.get(current)
        totalPath.push(current)
    }
    for (let i = totalPath.length - 1; i >= 0; i--) {
        grid.pattern.push([totalPath[i], "path"])
    }

}


// function IDAstar(grid) {
//     for (let y = 0; y < grid.max_row; y++) {
//         for (let x = 0; x < grid.max_col; x++) {
//             grid.grid[y][x].g = 0
//             grid.grid[y][x].h = 0
//         }
//     }
//     let start = grid.start
//     let goal = grid.goal

//     // let cameFrom = new Map()

//     let threshold = heurisic(start, goal)

//     while (true) {
//         console.log("Iteration with threshold: " + threshold)
//         let [tmp, cameFrom] = IDAstarSearch(grid, start, threshold, new Map())
//         if (tmp === "FOUND"){
//             console.log("FOUND")
//             return
//         }
            
//         if (tmp === Infinity){
//             console.log("NOT FOUND")
//             console.log(cameFrom)
//             return
//         }
        
//         threshold = tmp
        
//     }
// }

// function IDAstarSearch(grid, current, threshold, cameFrom) {

//     if (current === grid.goal)
//         return ["FOUND", cameFrom]

//     if (current.f > threshold)
//         return [current.f, cameFrom]

//     let min = Infinity

//     var neighbors = getNeighbors(grid, current)
//     let cameFromNew = null

//     for (let i = 0; i < neighbors.length; i++) {
//         let neighbor = neighbors[i]

//         cameFrom.set(neighbor, current)
//         neighbor.g = current.g + 1
//         neighbor.h = heurisic(neighbor, grid.goal)

//         grid.pattern.push([neighbor, "visited"])

//         let [tmp, cameFromNew] = IDAstarSearch(grid, neighbor, threshold, cameFrom)

//         if (tmp === "FOUND")
//             return ["FOUND", cameFrom]
//         if (tmp < min)
//             min = tmp
//     }

//     return [min, null]

// }