/**
 * Game elements
 */
const minesweeperTable = document.querySelector('.minesweeper');
const gameStartField = document.querySelector('#gameStart');

/**
 * Game start event
 */
gameStartField.addEventListener("click", function () {
    gameLevel = parseInt(document.querySelector('#gameLevel').value);
    gameInit(gameLevel);
});

/**
 * Generate minesweeper table
 */
let gameMatrix = new Array();

function gameInit(gameLevel) {
    minesweeperTable.innerHTML = "";

    switch (gameLevel) {
        case 2:
            tableRows = tableCols = 16;
            minesMax = 20;
            break;
        case 3:
            tableRows = 16;
            tableCols = 32;
            minesMax = 30;
            break;
        default:
            tableRows = tableCols = 9;
            minesMax = 10;
            break;
    }
    
    for (let i = 0; i < tableRows; i++) {
        let tableRow = document.createElement("tr");
        minesweeperTable.appendChild(tableRow);
        gameMatrix[i] = [];

        for (let j = 0; j < tableCols; j++) {
            gameMatrix[i][j] = 0;
            let tableCell = document.createElement("td");
            let tableCellButton = document.createElement("button");
            tableCell.classList.add("minesweeper-cell");
            tableCell.dataset.row = i;
            tableCell.dataset.col = j;

            tableCellButton.classList.add("minesweeper-button");
            tableRow.appendChild(tableCell);
            tableCell.appendChild(tableCellButton);
        }
    }
    generateMines(minesMax);
    generateNumbers();
    buttonListener();
}


/**
 * Generate random mines
 */
function generateMines(minesMax) {
    for (let i = 0; i < minesMax; i++) {
        let randomRow = Math.floor(Math.random() * tableRows);
        let randomCol = Math.floor(Math.random() * tableCols);
        if (gameMatrix[randomRow][randomCol] > -1) {
            gameMatrix[randomRow][randomCol] = -1;
        }
        else
            i--;
    }
}

/**
 * Generate numbers
 */
function countMines(x, y) {
    let count = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            try{
                if(gameMatrix[x+i][y+j]==-1)
                    count++;
            }
            catch{}
        }
    }
    return count;
}

/**
 * Generate numbers
 */
function generateNumbers() {
    for(let i = 0; i < tableRows; i++){
        for(let j = 0; j < tableCols; j++){
            if(gameMatrix[i][j] != -1){
                gameMatrix[i][j] = countMines(i, j);
            }
        }
    }
}

/** 
 * Button click event
 */
function buttonListener() {
    minesweeperTable.querySelectorAll('.minesweeper-button').forEach(minesweeperButton => {
        minesweeperButton.addEventListener("click", function () {
            let currentButton = this;
            if(currentButton.classList.contains("flag") == false)
            {
                let currentCell = minesweeperButton.parentNode;
                let row = currentCell.dataset.row;
                let col = currentCell.dataset.col;

                /* Check cell for mine */
                if(gameMatrix[row][col] < 0) {
                    currentCell.classList.add("mined");
                    currentCell.classList.add("exploded");
                    for (let i = 0; i < tableRows; i++) {
                        for (let j = 0; j < tableCols; j++) {
                            if(gameMatrix[i][j] < 0) {
                                let minedCell = minesweeperTable.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                                minedCell.classList.add("mined");
                                minedCell.removeChild(minedCell.firstChild);
                            }
                        }
                    }
                }
                else if(gameMatrix[row][col] > 0) {
                    currentCell.innerHTML = gameMatrix[row][col];
                }
                else {
                    WaveAlgorithm(Number(row), Number(col));
                }
                this.remove();
            }
        });
        minesweeperButton.addEventListener("contextmenu", function (event) {
            let currentButton = this;
            event.preventDefault();
            
            if(currentButton.classList.contains("flag"))
                currentButton.classList.remove("flag");
            else
                currentButton.classList.add("flag");
        });
    });
}

function WaveAlgorithm(x1, y1) {
    let 
        range = 0,
        OldFront = [],
        NewFront = [],
        Visited = [];
        allDirections = [ {dx: 1, dy: 0}, {dx: -1, dy: 0}, {dx: 0, dy: 1}, {dx: 0, dy: -1} ],
        start = {x: x1, y: y1};

    OldFront.push(start);
    Visited = Visited.concat(OldFront);
    while(true)
    {
        NewFront = [];
        for(let p = 0; p < OldFront.length; p++)
        {
            let row = OldFront[p].x;
            let col = OldFront[p].y;
            for(let k = 0; k < allDirections.length; k++) {
                let dx = Number(row + allDirections[k].dx);
                let dy = Number(col + allDirections[k].dy);
                if (dx >= 0 && dx < tableRows && dy >= 0 && dy < tableCols) {
                    if (!Contains(Visited, dx, dy)) {
                        Visited.push({x: dx, y: dy});
                        let n = CheckCell(dx, dy);
                        if(n != null) {
                            NewFront.push(n);
                        }
                    }
                }
            }
        }

        if (NewFront.length == 0) {
            console.log("gg");
            break; 
        }
        OldFront = [].concat(NewFront);

        range++;
        if (range > 10) {
            break;
        }
    }
}

function CheckCell(dx, dy) {
    console.log(dx, dy);
    let cell = minesweeperTable.querySelector(`[data-row="${dx}"][data-col="${dy}"]`);
    let val = gameMatrix[dx][dy];
    if (val == 0) {
        try{
            cell.removeChild(cell.firstChild);
        }
        catch{}
        return {x: dx, y: dy};
    }
    try{
        cell.removeChild(cell.firstChild);
        cell.innerHTML = val;
    }
    catch{}
}

function Contains(arr, x, y) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i].x == x && arr[i].y == y) {
            return true;
        }
    }
    return false;
}