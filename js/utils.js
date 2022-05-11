function getAspect(){
    let width = window.innerWidth
    let height = window.innerHeight
    let aspect

    if (height > width) return 1
    else return 0
}

function onlyUnique(array) {
    newArray = new Array()
    tmp = new Array()
    array.forEach( function(el) {
        if(!tmp.includes(el[0].element.id)){
            tmp.push(el[0].element.id)
            newArray.push(el)
        }
    })
    return newArray
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomEvenInt(min, max) {
    return Math.ceil(randomInt(min, max) / 2) * 2
}

function randomOddInt(min, max) {
    return Math.floor(randomInt(min, max) / 2) * 2 + 1
}

function getNeighbors(grid, cell, rnd=true) {
    let neighbors = []

    // up
    if (cell.y - 1 >= 0) {
        if (!grid.grid[cell.y - 1][cell.x].isWall) {
            neighbors.push(grid.grid[cell.y - 1][cell.x])
        }
    }
    // right
    if (cell.x + 1 < grid.max_col) {
        if (!grid.grid[cell.y][cell.x + 1].isWall) {
            neighbors.push(grid.grid[cell.y][cell.x + 1])
        }
    }
    // down
    if (cell.y + 1 < grid.max_row) {
        if (!grid.grid[cell.y + 1][cell.x].isWall) {
            neighbors.push(grid.grid[cell.y + 1][cell.x])
        }
    }
    // left
    if (cell.x - 1 >= 0) {
        if (!grid.grid[cell.y][cell.x - 1].isWall) {
            neighbors.push(grid.grid[cell.y][cell.x - 1])
        }
    }
    
    if (rnd)
        neighbors = neighbors.sort(() => Math.random() - 0.5)
    return neighbors
}


function getNeighborsDist2(grid, cell){
    let neighbors = []

    // up
    if (cell.y - 2 >= 0) {
        if (!grid.grid[cell.y - 2][cell.x].isWall) {
            neighbors.push(grid.grid[cell.y - 2][cell.x])
        }
    }
    // right
    if (cell.x + 2 < grid.max_col) {
        if (!grid.grid[cell.y][cell.x + 2].isWall) {
            neighbors.push(grid.grid[cell.y][cell.x + 2])
        }
    }
    // down
    if (cell.y + 2 < grid.max_row) {
        if (!grid.grid[cell.y + 2][cell.x].isWall) {
            neighbors.push(grid.grid[cell.y + 2][cell.x])
        }
    }
    // left
    if (cell.x - 2 >= 0) {
        if (!grid.grid[cell.y][cell.x - 2].isWall) {
            neighbors.push(grid.grid[cell.y][cell.x - 2])
        }
    }

    neighbors = neighbors.sort(() => Math.random() - 0.5)
    return neighbors
}


const titlePath = [
    // Amazing
    '0,0',
    '0,1','0,2','0,3','0,4','0,5','0,6',
    '1,0','1,6','1,7','1,8','1,9','1,10','1,11','1,12','1,13','1,14','1,15','1,16','1,17','1,18','1,19','1,20','1,21','1,22','1,23','1,25','1,27','1,29','1,30','1,31','1,32','1,33','1,34','1,35','1,36','1,37','1,38',
    '2,0','2,2','2,3','2,4','2,6','2,12','2,23','2,25','2,27','2,29','2,33',
    '3,0','3,2','3,4','3,6','3,8','3,10','3,12','3,14','3,15','3,16','3,18','3,19','3,20','3,21','3,23','3,25','3,27','3,29','3,31','3,33','3,35','3,36','3,37','3,38',
    '4,0','4,2','4,3','4,4','4,6','4,8','4,10','4,12','4,14','4,16','4,18','4,23','4,25','4,27','4,29','4,31','4,33','4,35','4,38',
    '5,0','5,6','5,8','5,10','5,12','5,14','5,15','5,16','5,18','5,20','5,21','5,22','5,23','5,25','5,27','5,29','5,31','5,33','5,35','5,36','5,38',
    '6,0','6,2','6,3','6,4','6,6','6,8','6,10','6,12','6,14','6,16','6,18','6,27','6,31','6,33','6,38',
    '7,0','7,2','7,4','7,6','7,8','7,10','7,12','7,14','7,16','7,18','7,19','7,20','7,21','7,22','7,23','7,24','7,25','7,26','7,27','7,28','7,29','7,30','7,31','7,33','7,34','7,35','7,36','7,37','7,38',

    // Maze
    '9,8','9,9','9,10','9,11','9,12','9,13','9,14','9,15','9,16',
    '10,8','10,16','10,17','10,18','10,19','10,20','10,21','10,22','10,23','10,24','10,25','10,26','10,27','10,28','10,29','10,30','10,31',
    '11,8','11,10','11,11','11,12','11,13','11,14','11,16','11,27',
    '12,8','12,','12,','12,','12,','12,','12,','12,','12,','12,','12,','12,','12,','12,','12,','12,',
    '12,10','12,12','12,14','12,16','12,18','12,19','12,20','12,22','12,23','12,24','12,25','12,27','12,29','12,30','12,31',
    '13,8','13,10','13,12','13,14','13,16','13,18','13,20','13,22','13,27',
    '14,8','14,10','14,12','14,14','14,16','14,18','14,19','14,20','14,22','14,24','14,25','14,26','14,27','14,29','14,30','14,31',
    '15,8','15,10','15,12','15,14','15,16','15,18','15,20','15,22',
    '16,8','16,10','16,12','16,14','16,16','16,18','16,20','16,22','16,23','16,24','16,25','16,26','16,27','16,28','16,29','16,30','16,31',
]



