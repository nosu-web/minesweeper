/**
 * Game config
 */
let tableRows = 0;
let tableCols = 0;
let minesMax = 0;
let minesweeperTable = document.getElementById('gameTable');
let gameMatrix = new Array();
Start();
console.log(minesMax);
console.log(tableRows);
console.log(tableCols);
/*var ButtonStart = document.getElementById('buttonStart');
ButtonStart.addEventListener('click', Start());*/


function Start(){
    DeleteMinesweeperTabel();   
    gameMatrix = new Array();
    SetTableSize();
    SetMinesMax();
    GenerateMinesweeperTable();
    GenerateRandomMines();
    GenerateNumbers();
    ButtonClickEvent();
}


function SetTableSize() {
    var rows = document.getElementById('toolboxRows');
    var cols = document.getElementById('toolboxCols');
    if(rows.value == 0){
        rows.value = 8;
    }
    if(cols.value == 0){
        cols.value = 8;
    }
    tableRows = rows.value;
    tableCols = cols.value;
    
}

function SetMinesMax(){
    var rng = document.getElementById('rangeMinesMax');
    var lbl = document.getElementById('labelMinesMax');
    if(rng.value == 0){
        rng.value = 16;
    }
    lbl.innerHTML = rng.value;
    lbl.className = "labelMinesMax";
    minesMax = Math.ceil((tableRows*tableCols/100)*rng.value);
    
}

function DeleteMinesweeperTabel(){
    
    for (let i = 0; i < tableRows; i++) {        
        minesweeperTable.deleteRow(0);
    }
    isStart =0;
}

/**
 * Generate minesweeper table
 */
function GenerateMinesweeperTable(){
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