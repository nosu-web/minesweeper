let tableRows = 9;
let tableCols = 9;
let minesMax = 1;
let minesweeperTable = document.querySelector('.minesweeper');
let gameMatrix = new Array();
GenerateMinesweeperTable();
document.getElementById('minesMax').addEventListener("input", SetMinesNumber());
let start = document.getElementById('startBtn');
start.addEventListener("click", function(){
    ConfigGame();
})

function ConfigGame(){
    for (let i = 0; i < tableRows; i++) {        
        minesweeperTable.deleteRow(0);
    }
    let gameMatrix = new Array();
    SetSize();    
    SetMinesNumber();
    GenerateMinesweeperTable();
    GenerateRandomMines();
    GenerateNumbers();
    ClickOnCell();
}

function SetSize(){
    tableRows = document.getElementById('fieldHeight').value;
    tableCols = document.getElementById('fieldWidth').value;
}

function SetMinesNumber(){
    minesMaxField = document.getElementById('minesMax');
    minesMax = Math.ceil((tableRows*tableCols)/100 * minesMaxField.value);
}

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

function GenerateRandomMines(){
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

function GenerateNumbers(){
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
function ClickOnCell(){
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
