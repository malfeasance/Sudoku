
const puzzleBoard = new Array(81);
const sudokuCells = document.querySelectorAll(".sudoku-cell");
const digitButtons = document.querySelectorAll(".control-pad__digit");
const clearButton = document.querySelector(".control-pad__clear");
const resetButton = document.querySelector(".control-pad__reset");
const testButton = document.querySelector(".test-button");

const puzzleString = document.getElementById("puzzle_problem").value;

for (let i = 0; i < 81; i++) {
  puzzleBoard[i] = puzzleString.substring(i, i + 1);
}

const prefilledCells = document.querySelectorAll(".sudoku-cell__prefilled");
for (let i = 0; i < prefilledCells.length; i++) {
  prefilledCells[i].innerHTML = puzzleBoard[i];
  if (puzzleBoard[i] == 0) prefilledCells[i].classList.add("sudoku-cell__zero")
  else prefilledCells[i].classList.remove("sudoku-cell__zero");
}

function buildPuzzleString() {
  let returnString = "";

  for (let i = 0; i < 81; i++) {
    returnString += prefilledCells[i].innerHTML;
  }

  return returnString;
}

console.log(buildPuzzleString());

//
// Cell selection
//

for (let sudokuCell of sudokuCells) {
  sudokuCell.addEventListener("click", function() {
    const currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (currentlySelected && currentlySelected.classList.contains("sudoku-cell__selected"))
      currentlySelected.classList.remove("sudoku-cell__selected");

    this.classList.add("sudoku-cell__selected");
  });
};

//
// Digit buttons
//

for (let digitButton of digitButtons) {
  digitButton.addEventListener("click", function() {
    const currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (!currentlySelected) return;

    const prefilledCell = currentlySelected.querySelector(".sudoku-cell__prefilled");

    prefilledCell.classList.remove("sudoku-cell__zero");
    prefilledCell.innerHTML = this.value;
    formField.value = buildPuzzleString();
  });
};

//
// Clear button
//

clearButton.addEventListener("click", function() {
  const currentlySelected = document.querySelector(".sudoku-cell__selected");
  if (!currentlySelected) return;

  const prefilledCell = currentlySelected.querySelector(".sudoku-cell__prefilled");

  prefilledCell.classList.add("sudoku-cell__zero");
  prefilledCell.innerHTML = "0";
  formField.value = buildPuzzleString();
});

//
// Reset button
//

resetButton.addEventListener("click", function() {
  for (let i = 0; i < 81; i++) {
    prefilledCells[i].classList.add("sudoku-cell__zero");
    prefilledCells[i].innerHTML = "0";
  }
  formField.value = buildPuzzleString();
});



testButton.addEventListener("click", function() {
  const problemInput = document.getElementById("puzzle_problem");
  if (problemInput) {
    problemInput.value = "987650001987654321987654321987654321987654321987654321987654321987654321987654321";
  }
});
