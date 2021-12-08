/**
 * Game config
 */
const tableRows = 9;
const tableCols = 9;
const minesMax = 10;

const minesweeperTable = document.querySelector('.minesweeper');

/**
 * Game matrix
 */
let gameMatrix = new Array();

/**
 * Generate minesweeper table
 */
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


/**
 * Generate random mines
 */
for (let i = 0; i < minesMax; i++) {
    let randomRow = Math.floor(Math.random() * tableRows);
    let randomCol = Math.floor(Math.random() * tableCols);
    if (gameMatrix[randomRow][randomCol] > -1) {
        gameMatrix[randomRow][randomCol] = -1;
    }
    else
        i--;
}

/** 
 * Button click event
 */
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
