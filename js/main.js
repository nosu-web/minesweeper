/**
 * Game config
 */
 let minesweeperTable = document.querySelector('.minesweeper');
 let ButtonNewgame = document.querySelector('.toolbox__button__start');
 let readRows = document.querySelector('.input__rows');
 let readCols = document.querySelector('.input__cols');
 let minesMaxField = document.querySelector('#minesMax');
 
let tableRows = 0;
let tableCols = 0;
let gameMatrix = new Array();
let countMines = 0;

StartNewGame();

ButtonNewgame.addEventListener("click", function() {
    StartNewGame();
});

function StartNewGame() {
    DeleteTable();
    CountAllMines();
    gameMatrix = new Array();
    GenerateMinesweeperTable();
    GenerateRandomMines();
    GenerateNumbers();
    ButtonClickEvent();
}

/**
 *  Count all mines
 */
function CountAllMines() {

    tableRows = readRows.value;
    tableCols = readCols.value;
    let minesMax = Math.floor(tableCols * tableRows * 0.3);
    console.log(minesMax);
    minesMaxField.max = minesMax;

    minesMaxField.addEventListener("input", function () {
        countMines = this.value;
    });
    console.log(countMines);
}

/**
 * Generate minesweeper table
 */
function GenerateMinesweeperTable() {

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

}

/**
 * Generate random mines
 */
function GenerateRandomMines() {

    for (let i = 0; i < countMines; i++) {
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
function CountMines(x, y){
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

function GenerateNumbers() {

    for(let i = 0; i < tableRows; i++){
        for(let j = 0; j < tableCols; j++){
            if(gameMatrix[i][j] != -1){
                gameMatrix[i][j] = CountMines(i, j);
            }
        }
    }

}

/** 
 * Button click event
 */
function ButtonClickEvent() {

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
                        for (let j = 0; j < tableRows; j++) {
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
                this.remove();
            }
            this.remove();
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

function DeleteTable() {
    for(let i = 0; i < tableRows; i++) {
        minesweeperTable.deleteRow(0);
    }
}