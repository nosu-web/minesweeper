const minesweeperTable = document.querySelector('.minesweeper');
let tableRows = 8;
let tableCols = 8;
let minesMax = 10;

/* Table rows */
for(let i=1; i<=tableRows; i++) {
    let tableRow = document.createElement("tr");
    minesweeperTable.appendChild(tableRow);

    /* Table columns */
    for(let j=1; j<=tableCols; j++) {
        let tableCell = document.createElement("td");
        let tableCellButton = document.createElement("button");
        tableCell.classList.add("minesweeper-cell");
        tableCell.id = ('cell-' + i + j);

        tableCellButton.classList.add("minesweeper-button");
        tableRow.appendChild(tableCell);
        tableCell.appendChild(tableCellButton);
    }
}
/* Generate random mines */
let minesArray = new Array();
while (minesArray.length < minesMax) {
    let randomCellId = '#cell-'+ Math.floor(1 + Math.random() * (tableRows)) + Math.floor(1 + Math.random() * (tableCols));
    console.log(randomCellId);
    let tableCell = minesweeperTable.querySelector(randomCellId);
    if (!tableCell.classList.contains("mined"))
        tableCell.classList.add("mined");
    minesArray.push(randomCellId);
}

/* minesweeperButton click event */
let minesweeperButtons = minesweeperTable.querySelectorAll('.minesweeper-button');
minesweeperButtons.forEach(minesweeperButton => {
    minesweeperButton.addEventListener("click", function() {
        this.remove();
    });
});
