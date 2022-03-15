
// Add event listener on keydown
document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  // Alert the key name and key code on keydown
  alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);

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
  for (var i = 1; i < 10; i++) {
    var digitButton = document.querySelector(".control-pad__" + i);  
    digitButton.classList.add("control-pad__color" + i);
  }
}

function controlPadColorsOff() {
  for (var i = 1; i < 10; i++) {
    var digitButton = document.querySelector(".control-pad__" + i);
    digitButton.classList.remove("control-pad__color" + i);
  }
}


// Cell selection
var sudokuCells = document.querySelectorAll(".sudoku-cell");
for (var i = 0; i < sudokuCells.length; i++) {
  sudokuCells[i].addEventListener("click", function() {
    var currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (currentlySelected && currentlySelected.classList.contains("sudoku-cell__selected"))
      currentlySelected.classList.remove("sudoku-cell__selected");

    this.classList.add("sudoku-cell__selected");
  })
};

var numberToggle = document.querySelector(".control-pad__number");
var scratchToggle = document.querySelector(".control-pad__scratch");
var colorToggle = document.querySelector(".control-pad__color");

// Number toggle

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

// Scratch toggle
scratchToggle.addEventListener("click", function() {
if (controlPadIsSelected(scratchToggle))
  controlPadDeselect(scratchToggle);
else {
  controlPadSelect(scratchToggle);
  controlPadDeselect(numberToggle);
  controlPadColorsOff();
  controlPadDeselect(colorToggle);
}
});

// Color toggle
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

// Clear button
var clearButton = document.querySelector(".control-pad__clear");
clearButton.addEventListener("click", function() {
  var currentlySelected = document.querySelector(".sudoku-cell__selected");
  if (currentlySelected)
    if (!currentlySelected.querySelector(".sudoku-cell__prefilled"))
      currentlySelected.innerHTML = "";
    for (var j = 1; j < 10; j++)
      currentlySelected.classList.remove("control-pad__color" + j);
});

// Reset button
var resetButton = document.querySelector(".control-pad__reset");
resetButton.addEventListener("click", function() {
  var sudokuCells = document.querySelectorAll(".sudoku-cell");
  for (var i = 0; i < sudokuCells.length; i++) {
    if (!sudokuCells[i].querySelector(".sudoku-cell__prefilled"))
      sudokuCells[i].innerHTML = "";
    for (var j = 1; j < 10; j++)
      sudokuCells[i].classList.remove("control-pad__color" + j);
  }
});
  

// Digit buttons
var digitButtons = document.querySelectorAll(".control-pad__digit");
for (var i = 0; i < digitButtons.length; i++) {
  digitButtons[i].addEventListener("click", function() {
    var currentlySelected = document.querySelector(".sudoku-cell__selected");
    if (!currentlySelected) return;

    var colorToggle = document.querySelector(".control-pad__color");
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

    var numberToggle = document.querySelector(".control-pad__number");
    if (numberToggle.classList.contains("control-pad__selected")) {
      currentlySelected.innerHTML = "<div class='sudoku-cell__center'>" + this.value + "</div>";
      return;
    }

    var scratchToggle = document.querySelector(".control-pad__scratch");
    if (scratchToggle.classList.contains("control-pad__selected")) {
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
