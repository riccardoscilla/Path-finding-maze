class Cell {
    constructor(y, x, parent, grid) {
        this.element = document.createElement("td")
        this.element.id = y+","+x
        this.parent = parent
        this.y = y
        this.x = x
        // this.element.innerHTML = "["+y+","+x+"]"
        // this.element.style.fontSize = 10

        this.grid = grid
        this.cell = undefined

        this.isStart = false
        this.isGoal = false
        this.isWall = false
        this.isVisited = false
        this.isPath = false
        this.attributes()

        // Recursive backtracking variables
        this.rb_mark = false

        // A* algorithm variables
        this.g
        this.h 

        // Dijkstra algorithm variables
        this.distance

        // DFS variables
        this.dfs_mark = false

        // BFS variables
        this.bfs_mark = false
    }

    // A* f value
    get f() {
        return this.g + this.h
    }

    attributes() {
        this.setWidthHeight()


        if ((this.x + this.y) % 2 !== 0)
            this.element.classList.add("dark")


        this.cell = document.createElement("div");
        this.cell.classList.add("cell")
        this.element.appendChild(this.cell)

        this.parent.appendChild(this.element)
    }

    setWidthHeight(){
        let menuHeight = document.querySelector("nav").offsetHeight + 30
        if (this.grid.aspect === 0){ 
            this.element.style.width =  "min((100vw - 2rem) / " + this.grid.max_col + " , (100vh - " + menuHeight + "px - 2rem) / " + this.grid.max_row + " )"
            this.element.style.height = "min((100vw - 2rem) / " + this.grid.max_col + " , (100vh - " + menuHeight + "px - 2rem) / " + this.grid.max_row + " )"
        } else if (this.grid.aspect === 1){
            this.element.style.minWidth =  "min((100vh - 2rem - 80px) / " + this.grid.max_col + " , (100vw - 2rem) / " + this.grid.max_row + ")"
            this.element.style.height = "min((100vw - 2rem) / " + this.grid.max_row + " , (100vh - 2rem - 80px) / " + this.grid.max_col + " )"    
        }
    }

    setStart() {
        this.cell.classList.add("start")
        this.isStart = true
    }

    setGoal() {
        this.cell.classList.add("goal")
        this.isGoal = true
    }

    setWall() {
        if (this.isStart || this.isGoal) return
        this.cell.classList.add("wall")
        this.isWall = true
    }

    setEmpty() {
        if (this.isStart || this.isGoal) return
        
        this.cell.classList.remove("wall")
        this.cell.classList.remove("visited")
        this.cell.classList.remove("path")

        this.isWall = false
        this.isVisited = false
        this.isPath = false
    }

    setVisited() {
        if (this.isStart || this.isGoal || this.isWall) return
        this.cell.classList.add("visited")
        this.isVisited = true
    }

    setPath() {
        if (this.isStart || this.isGoal || this.isWall) return
        this.cell.classList.remove("visited")
        this.cell.classList.add("path")
        this.isPath = true
    }

}