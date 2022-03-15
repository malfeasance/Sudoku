
var puzzleBoard = new Array(81);

let formField = document.getElementById("puzzle_problem");
let puzzleString = formField.value;

for (var i = 0; i < 81; i++) {
  puzzleBoard[i] = puzzleString.substring(i, i + 1);
}

var prefilledCells = document.querySelectorAll(".sudoku-cell__prefilled");
for (var i = 0; i < prefilledCells.length; i++) {
  prefilledCells[i].innerHTML = puzzleBoard[i];
  if (puzzleBoard[i] == 0) prefilledCells[i].classList.add("sudoku-cell__zero")
  else prefilledCells[i].classList.remove("sudoku-cell__zero");
}

function buildPuzzleString() {
  let returnString = "";

  for (var i = 0; i < 81; i++) {
    returnString += prefilledCells[i].innerHTML;
  }

  return returnString;
}

console.log(buildPuzzleString());

// Cell selection
var sudokuCells = document.querySelectorAll(".sudoku-cell");
for (var i = 0; i < sudokuCells.length; i++) {
  sudokuCells[i].addEventListener("click", function() {
    var currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (currentlySelected && currentlySelected.classList.contains("sudoku-cell__selected"))
      currentlySelected.classList.remove("sudoku-cell__selected");

    this.classList.add("sudoku-cell__selected");
  });
};

// Digit buttons
var digitButtons = document.querySelectorAll(".control-pad__digit");
for (var i = 0; i < digitButtons.length; i++) {
  digitButtons[i].addEventListener("click", function() {
    var currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (!currentlySelected) return;

    pfCell = currentlySelected.querySelector(".sudoku-cell__prefilled");

    pfCell.classList.remove("sudoku-cell__zero");
    pfCell.innerHTML = this.value;
    formField.value = buildPuzzleString();
  });
};

// Clear button
var clearButton = document.querySelector(".control-pad__clear");
clearButton.addEventListener("click", function() {
  var currentlySelected = document.querySelector(".sudoku-cell__selected");
  if (!currentlySelected) return;

  pfCell = currentlySelected.querySelector(".sudoku-cell__prefilled");

  pfCell.classList.add("sudoku-cell__zero");
  pfCell.innerHTML = "0";
  formField.value = buildPuzzleString();
});

// Reset button
var resetButton = document.querySelector(".control-pad__reset");
resetButton.addEventListener("click", function() {
  for (var i = 0; i < 81; i++) {
    prefilledCells[i].classList.add("sudoku-cell__zero");
    prefilledCells[i].innerHTML = "0";
  }
  formField.value = buildPuzzleString();
});


var testButton = document.querySelector(".test-button");
testButton.addEventListener("click", function() {
  var problemInput = document.getElementById("puzzle_problem");
  if (problemInput) {
    problemInput.value = "987650001987654321987654321987654321987654321987654321987654321987654321987654321";
  }
});
