
function controlPadIsSelected(buttonToggle) {
  return buttonToggle.classList.contains("control-pad__selected");
}

function controlPadDeselect(buttonToggle) {
  buttonToggle.classList.remove("control-pad__selected")
}

function controlPadSelect(buttonToggle) {
  buttonToggle.classList.add("control-pad__selected")
}

function controlPadColorsOn() {
  for (let i = 1; i < 10; i++) {
    const digitButton = document.querySelector(".control-pad__" + i);  
    digitButton.classList.add("control-pad__color" + i);
  }
}

function controlPadColorsOff() {
  for (let i = 1; i < 10; i++) {
    const digitButton = document.querySelector(".control-pad__" + i);
    digitButton.classList.remove("control-pad__color" + i);
  }
}

//
// Global constant elements
//

const sudokuCells = document.querySelectorAll(".sudoku-cell");
const numberToggle = document.querySelector(".control-pad__number");
const scratchToggle = document.querySelector(".control-pad__scratch");
const colorToggle = document.querySelector(".control-pad__color");
const clearButton = document.querySelector(".control-pad__clear");
const resetButton = document.querySelector(".control-pad__reset");
const digitButtons = document.querySelectorAll(".control-pad__digit");

//
// Cell selection
//

for (let sudokuCell of sudokuCells) {
  sudokuCell.addEventListener("click", function() {
    const currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (currentlySelected === this)
      this.classList.remove("sudoku-cell__selected");
    else if (currentlySelected) {
      currentlySelected.classList.remove("sudoku-cell__selected");
      this.classList.add("sudoku-cell__selected");
    }
    else this.classList.add("sudoku-cell__selected");
  })
}

//
// Number toggle
//

numberToggle.addEventListener("click", function() {
  if (controlPadIsSelected(numberToggle))
    controlPadDeselect(numberToggle);
  else {
    controlPadSelect(numberToggle);
    controlPadDeselect(scratchToggle);
    controlPadDeselect(colorToggle);
    controlPadColorsOff();
  }
});

//
// Scratch toggle
//

scratchToggle.addEventListener("click", function() {
  if (controlPadIsSelected(scratchToggle))
    controlPadDeselect(scratchToggle);
  else {
    controlPadSelect(scratchToggle);
    controlPadDeselect(numberToggle);
    controlPadDeselect(colorToggle);
    controlPadColorsOff();
  }
});

//
// Color toggle
//

colorToggle.addEventListener("click", function() {
  if (controlPadIsSelected(colorToggle)) {
    controlPadDeselect(colorToggle);
    controlPadColorsOff();
  }
  else {
    controlPadSelect(colorToggle);
    controlPadDeselect(scratchToggle);
    controlPadDeselect(numberToggle);
    controlPadColorsOn();
  }
});

//
// Clear button
//

clearButton.addEventListener("click", function() {
  const currentlySelected = document.querySelector(".sudoku-cell__selected");
  if (currentlySelected)
    if (!currentlySelected.querySelector(".sudoku-cell__prefilled"))
      currentlySelected.innerHTML = "";
    for (let i = 1; i < 10; i++)
      currentlySelected.classList.remove("control-pad__color" + i);
});

//
// Reset button
//

resetButton.addEventListener("click", function() {
  for (sudokuCell of sudokuCells) {
    if (!sudokuCell.querySelector(".sudoku-cell__prefilled"))
      sudokuCell.innerHTML = "";
    for (let i = 1; i < 10; i++)
      sudokuCell.classList.remove("control-pad__color" + i);
  }
});
  
//
// Digit buttons
//

for (digitButton of digitButtons) {
  digitButton.addEventListener("click", function() {
    const currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (!currentlySelected) return;

    if (controlPadIsSelected(colorToggle)) {
      if (currentlySelected.classList.contains("control-pad__color" + this.value))
        currentlySelected.classList.remove("control-pad__color" + this.value);
      else {
        for (var j = 1; j < 10; j++)
          currentlySelected.classList.remove("control-pad__color" + j);
        currentlySelected.classList.add("control-pad__color" + this.value);
      }
      return;
    }

    if (currentlySelected.querySelector(".sudoku-cell__prefilled")) return;

    if (controlPadIsSelected(numberToggle)) {
      currentlySelected.innerHTML = "<div class='sudoku-cell__center'>" + this.value + "</div>";
      return;
    }

    if (controlPadIsSelected(scratchToggle)) {
      var scratchDigit = document.querySelector(".sudoku-cell__selected .sudoku-cell__center");
      if (scratchDigit) return;
      scratchDigit = document.querySelector(".sudoku-cell__selected .sudoku-cell__scratch" + this.value);
      if (!scratchDigit) {
        currentlySelected.innerHTML = currentlySelected.innerHTML + 
              "<div class='sudoku-cell__scratch" + this.value + "'>" + this.value + "</div>";
      }
      else
        scratchDigit.remove();
    }

  })
};
