// MAZE PATTERNS


// CONTOUR

function drawContour(grid) {
    let middle_col = Math.floor(grid.max_col / 2)

    for (let y = 0; y < grid.max_row; y++) {
        if (y === 0) {
            for (let x = 0; x < middle_col + 1; x++) {
                grid.pattern.push([grid.grid[y][middle_col - x], "wall"])
                grid.pattern.push([grid.grid[y][middle_col + x], "wall"])
            }
        }
        else if (y === grid.max_row - 1) {
            for (let x = middle_col; x >= 0; x--) {
                grid.pattern.push([grid.grid[y][middle_col - x], "wall"])
                grid.pattern.push([grid.grid[y][middle_col + x], "wall"])
            }
        }
        else {
            grid.pattern.push([grid.grid[y][0], "wall"])
            grid.pattern.push([grid.grid[y][grid.max_col - 1], "wall"])

        }
    }
}

function drawJail(grid) {

    for (let y = 0; y < grid.max_row; y += 2) {
        for (let x = 0; x < grid.max_col; x++) {
            grid.pattern.push([grid.grid[y][x], "wall"])
        }
    }
    for (let x = 0; x < grid.max_col; x += 2) {
        for (let y = 0; y < grid.max_row; y++) {
            grid.pattern.push([grid.grid[y][x], "wall"])
        }
    }
}

// RANDOM

function drawRandom(grid) {
    let to_draw = Math.floor(grid.max_col * grid.max_row / 3)

    for (let i = 0; i < to_draw; i++) {
        let y = randomInt(0, grid.max_row)
        let x = randomInt(0, grid.max_col)

        grid.pattern.push([grid.grid[y][x], "wall"])

    }
}


// RECURSIVE DIVISION

function drawRecursiveDivision(grid) {
    drawContour(grid)
    recursiveDivision(1, 1, grid.max_col - 2, grid.max_row - 2, grid)
}

function recursiveDivision(x, y, width, height, grid) {

    if ((width - x) < 2 || (height - y) < 2)
        return


    let orientation = (width - x) >= (height - y) ? 0 : 1

    if (orientation === 0) { // Vertical 0
        let wall_start_x = randomEvenInt(x, width)
        let wall_hole_y = randomOddInt(y, height)

        for (let i = y; i <= height; i++) {
            if (i !== wall_hole_y)
                grid.pattern.push([grid.grid[i][wall_start_x], "wall"])
        }

        recursiveDivision(x, y, wall_start_x - 1, height, grid) // left
        recursiveDivision(wall_start_x + 1, y, width, height, grid) // right
    }

    else if (orientation === 1) { // Horizontal 1
        let wall_start_y = randomEvenInt(y, height)
        let wall_hole_x = randomOddInt(x, width)

        for (let i = x; i <= width; i++) {
            if (i !== wall_hole_x)
                grid.pattern.push([grid.grid[wall_start_y][i], "wall"])
        }

        recursiveDivision(x, y, width, wall_start_y - 1, grid) // up
        recursiveDivision(x, wall_start_y + 1, width, height, grid) // down
    }
}

// RECURSIVE BACKTRACKING

function drawRecursiveBacktracking(grid) {
    drawJail(grid)
    let start_y = randomOddInt(1, grid.max_row - 2)
    let start_x = randomOddInt(1, grid.max_col - 2)
    for (let y = 0; y < grid.max_row; y++) {
        for (let x = 0; x < grid.max_col; x++) {
            grid.grid[y][x].rb_mark = false
        }
    }
    recursiveBacktracking(start_y, start_x, grid)
}

function recursiveBacktracking(y,x,grid) {
    let current_cell = grid.grid[y][x]
    current_cell.rb_mark = true
    let neighbors = getNeighborsDist2(grid, current_cell)

    for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i]
        if (!neighbor.rb_mark){
            // crave wall in between current and neighbor
            if (current_cell.x === neighbor.x)
                grid.pattern.push([grid.grid[(current_cell.y + neighbor.y)/2][current_cell.x], "empty"])
            else if (current_cell.y === neighbor.y)
                grid.pattern.push([grid.grid[current_cell.y][(current_cell.x + neighbor.x)/2], "empty"])

            recursiveBacktracking(neighbor.y,neighbor.x,grid)
        }
    }
}

// SPECIAL PATTERNS 

function drawCellsDiagonal(grid, cells) {
    start_y = 1
    start_x = 2

    for (k = 0; k < grid.max_row; k++) {
        let i = k
        let j = 0
        while (i >= 0) {
            if (cells.includes(i + ',' + j))
                grid.pattern.push([grid.grid[start_y + i][start_x + j], "wall"])
            i -= 1
            j += 1
        }

    }
    for (k = 1; k < grid.max_col; k++) {
        let i = grid.max_row - 1
        let j = k
        while (j <= grid.max_col - 1) {
            if (cells.includes(i + ',' + j))
                grid.pattern.push([grid.grid[start_y + i][start_x + j], "wall"])
            i -= 1
            j += 1
        }
    }

    grid.drawPattern()
}
