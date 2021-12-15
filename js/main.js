/**
 * Game config
 */
 let tableRowInput=document.querySelector('#inputRows');
 let tableRows = Number(tableRowInput.value);
 tableRowInput.addEventListener("input",function(){
     tableRows=Number(this.value);
 })



 let tableColumnInput=document.querySelector('#inputColumns');
 let tableColmns =Number(tableColumnInput.value);
 tableColumnInput.addEventListener("input",function(){
     tableColmns=Number(this.value);
 })



 let minesRangeField=document.querySelector('#minesMax');

let minesMax= Math.floor(((tableRows*tableColmns)*Number(minesRangeField.value))/100);

minesRangeField.addEventListener('input',function(){
minesMax=((tableRows*tableColmns)*Number(this.value))/100;
 })
 let minesMaxField = document.querySelector('#inputMines');
 minesMaxField.value=minesMax;
//   let minesMax = Number(minesMaxField.value);
 minesMaxField.setAttribute("max",String(tableColmns*tableRows/2));
  

//  minesMaxField.addEventListener("input", function () {
//      minesMax = this.value;
//  });


 let gameMatrix = new Array();
 let minesweeperTable = document.querySelector('.minesweeper');
 

 gameStart=document.querySelector('#startGame')
 gameStart.addEventListener("click",function(){
    gameStart.disabled=true;
    CreateTable();
    let buttons= minesweeperTable.querySelectorAll('.minesweeper-button');
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let currentButton = this;
            if(currentButton.classList.contains("flag") == false)
            {
                let currentCell = button.parentNode;
                let row = currentCell.dataset.row;
                let col = currentCell.dataset.col;
    
                /* Check cell for mine */
                CheckMine(row,col,currentCell);
                if(gameMatrix[row][col] > 0) {
                    currentCell.innerHTML = gameMatrix[row][col];
                }
                // Open(row,col,this);
                  this.remove();
            }
        });
        button.addEventListener("contextmenu", function (event) {
            let currentButton = this;
            event.preventDefault();
            
            if(currentButton.classList.contains("flag"))
                currentButton.classList.remove("flag");
            else
                currentButton.classList.add("flag");
        });
    });
   
})

// function Open(x,y,button)
// {
 
//     if(CountMines(x,y)==0)
//       button.remove;
// }
function CheckMine(row,col,currentCell)
{
    if(gameMatrix[row][col] < 0) {
        currentCell.classList.add("mined");
        currentCell.classList.add("exploded");
        for (let i = 0; i < tableRows; i++) {
            for (let j = 0; j < tableRows; j++) {
                if(gameMatrix[i][j] < 0) {
                    let minedCell = minesweeperTable.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    minedCell.classList.add("mined");
                    minedCell.removeChild(minedCell.firstChild);
                    setTimeout(() => {  location.reload(); }, 1000);
                    
                }
            }
        }
    }
}
let resetBut=document.querySelector('#resetField')
resetBut.addEventListener("click",function(){
    location.reload();
})

function CreateTable()
{
    for (let i = 0; i < tableRows; i++) {
        let tableRow = document.createElement("tr");
        minesweeperTable.appendChild(tableRow);
        gameMatrix[i] = [];
    
        for (let j = 0; j < tableColmns; j++) {
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
    GenerateRandomMines();
    GenerateNumbers();
}
function GenerateRandomMines()
{
    for (let i = 0; i < minesMax; i++) {
        let randomRow = Math.floor(Math.random() * tableRows);
        let randomCol = Math.floor(Math.random() * tableColmns);
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
function GenerateNumbers()
{
    for(let i = 0; i < tableRows; i++){
        for(let j = 0; j < tableColmns; j++){
            if(gameMatrix[i][j] != -1){
                gameMatrix[i][j] = CountMines(i, j);
            }
        }
    }
}
 


  
   
    

 