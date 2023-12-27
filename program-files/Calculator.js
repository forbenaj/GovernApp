class Calculator extends Program {
  constructor() {

    super()
    this.name = "Calculator"
    this.window;
    this.windowContent;
    this.width;
    this.height;
    this.top = "50%";
    this.left = "50%";
  }


  createWindow() {
    super.createWindow()

    // Create the display input
    this.display = document.createElement("input");
    this.display.type = "text";
    this.display.id = "display";
    this.display.disabled = true;

    // Create the table
    let table = document.createElement("table");

    // Define the button values and their respective onclick functions
    const buttons = [
      "7", "8", "9", "/",
      "4", "5", "6", "-",
      "1", "2", "3", "+",
      "0", ".", "=", "C"
    ];

    // Helper function to create button elements
    function createButton(value, onclickFunction) {
      let button = document.createElement("input");
      button.type = "button";
      button.value = value;
      button.onclick = onclickFunction;
      return button;
    }

    // Loop through button values and create rows and cells
    for (let i = 0; i < 4; i++) {
      let row = table.insertRow();

      for (let j = 0; j < 4; j++) {
        let cell = row.insertCell();
        let buttonValue = buttons[i * 4 + j];
        let onclickFunction;

        if (buttonValue === "=") {
          onclickFunction = () => this.calculateResult();
        } else if (buttonValue === "C") {
          onclickFunction = () => this.clearDisplay();
        } else {
          onclickFunction = () => this.appendToDisplay(buttonValue);
        }

        cell.appendChild(createButton(buttonValue, onclickFunction));
      }
    }

    // Append elements to the container div
    this.windowContent.appendChild(this.display);
    this.windowContent.appendChild(table);

  }

  appendToDisplay(value) {
    this.display.value += value;
  }

  clearDisplay() {
    this.display.value = '';
  }

  calculateResult() {
    try {
      this.display.value = eval(this.display.value);
    } catch (error) {
      this.display.value = 'Error';
    }
  }

  run() {
    super.run();
  }
}

programClasses["Calculator"] = Calculator