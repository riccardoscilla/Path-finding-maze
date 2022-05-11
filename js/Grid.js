class Grid {
    constructor() {
        this.max_col = 43
        this.max_row = 19
        this.aspect = getAspect()
        this.transition_time = 10

        this.element = document.createElement("table")
        this.parent = document.querySelector("#grid_container")

        this.start = undefined
        this.goal = undefined
        this.grid = undefined

        this.pattern = new Array()
        this.interval = undefined

        this.algo_name = undefined

        this.create()
    }

    drawCell(){
        let cell = this.pattern.shift()

        // console.log(cell[0])

        if (cell[1] === "wall")
            cell[0].setWall()
        else if (cell[1] === "visited")
            cell[0].setVisited()
        else if (cell[1] === "path")
            cell[0].setPath()   
        else if (cell[1] === "empty")
            cell[0].setEmpty()   
    }
    

    drawPattern(){
        // this.pattern = onlyUnique(this.pattern)
        // do not use timer 
        if (this.transition_time === 0){
            while(this.pattern.length){
                this.drawCell()
            }
            return
        }
        // use timer
        this.interval = setInterval( () => {          
            if(this.pattern.length === 0){
                console.log("pattern empty")
                clearInterval(this.interval)
            } else {
                this.drawCell()
            }  
        }, this.transition_time)

    }

    find(cell){
        for (let y = 0; y < this.max_row; y++) {
            for (let x = 0; x < this.max_col; x++) {
                let candidate_id = y+","+x
                if (cell.id === candidate_id)
                    return this.grid[y][x]
            }
        }
    }

    clearPath(){
        for (let y = 0; y < this.max_row; y++) {
            for (let x = 0; x < this.max_col; x++) {
                if (this.grid[y][x].isVisited || this.grid[y][x].isPath){
                    this.grid[y][x].setEmpty()
                }
            }
        }
        this.resetPattern()
    }

    destroy(){
        this.element.remove()
        this.element = document.createElement("table")
        this.resetPattern()
        this.start = undefined
        this.goal = undefined
    }

    reset(){
        for (let y = 0; y < this.max_row; y++) {
            for (let x = 0; x < this.max_col; x++) {
                this.grid[y][x].setEmpty()            
            }
        }
        this.resetPattern()
    }

    resetPattern(){
        this.pattern = new Array()
        clearInterval(this.interval)
        this.interval = undefined
    }

    setSize(max_col,max_row){
        this.max_col = max_col
        this.max_row = max_row
    }

    setTransitionTime(transition_time){
        this.transition_time = transition_time
    }

    setAlgorithm(algo){
        this.algo_name = algo
    }

    setAspect(aspect){
        this.aspect= aspect
        console.log("aspect changed",aspect)
        for (let y = 0; y < this.max_row; y++) {
            for (let x = 0; x < this.max_col; x++) {
                
                this.grid[y][x].setWidthHeight()
                
            }
        }
    }


    create(){
        this.element.id = "grid"
        this.grid = new Array(this.max_row)

        for (let y = 0; y < this.max_row; y++) {
            let row = document.createElement("tr");
            this.grid[y] = new Array(this.max_col)
    
            for (let x = 0; x < this.max_col; x++) {
                let cell = new Cell(y,x,row,this)
                this.grid[y][x] = cell

                if (x === parseInt(this.max_col / 4) && y === parseInt(this.max_row / 2)){
                    cell.setStart()
                    this.start = cell
                }

                if (x === parseInt(this.max_col / 4 * 3) && y === parseInt(this.max_row / 2)) {
                    cell.setGoal()
                    this.goal = cell
                }

            }
            this.element.appendChild(row)
        }
        this.parent.appendChild(this.element)
    }

}
