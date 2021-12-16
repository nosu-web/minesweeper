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
var checkedCells = new Set();

function gameInit(gameLevel) {
    minesweeperTable.innerHTML = "";

    switch (gameLevel) {
        case 2:
            console.log(gameLevel);
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

function DeleteEmptyCells(row, col){
    row = parseInt(row);
    col = parseInt(col);
    let cell = [row, col];
    if(checkedCells.has(cell))
    {
        return;
    }
    else if(gameMatrix[row][col] > 0)
    {
        let currentCell = minesweeperTable.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        currentCell.removeChild(currentCell.firstChild);
        currentCell.innerHTML+=gameMatrix[row][col];
        return;
    }
    else{
        let currentCell = minesweeperTable.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        currentCell.removeChild(currentCell.firstChild);
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                try{
                    DeleteEmptyCells(row+i, col+j);
                }
                catch{}
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
                console.log(row, col);

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
                if(gameMatrix[row][col] > 0) {
                    currentCell.innerHTML = gameMatrix[row][col];
                }
                if(gameMatrix[row][col] == 0){
                    DeleteEmptyCells(row, col);
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
