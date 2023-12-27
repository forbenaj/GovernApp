function initialize(){
    for(let program in programList){

        let desktop = document.getElementById("Desktop")

        let icon = document.createElement("div")
        let image = document.createElement("div")
        let text = document.createElement("div")

        icon.ondblclick= ()=>initProgram(program)
        icon.id="consoleIcon"
        icon.className="icon"

        image.className="icon-image"

        text.className="icon-text"
        text.innerHTML=program

        icon.appendChild(image)
        icon.appendChild(text)

        desktop.appendChild(icon)

    }
}



function initProgram(e){
   /* // Example usage
    const basicProgram = new Program(e);
    basicProgram.run();
    basicProgram.close();

    const consoleProgram = new ConsoleProgram('Console Program', 'Command Line');
    consoleProgram.createWindow();
    consoleProgram.run();
    consoleProgram.close();*/


    let programInstance = new programList[e](e)

    programInstance.run()


}

runningPrograms = [
    {name:"WindOS",id:0}
]



// Program class
class Program {
    constructor(name) {
        this.name = name;
        this.id;
        this.window
        this.windowContent
    }

    run() {
        console.log(`Running ${this.name} program...`);
        this.id = runningPrograms.length
        runningPrograms.push(this)
    }

    createWindow() {
        console.log(`Creating ${this.consoleType} console window for ${this.name} program...`);

        this.windowContent = document.createElement("div");
        this.windowContent.className = "window-content";
        

        // Create the main div element
        this.window = document.createElement("div");
        this.window.id = this.name;
        this.window.className = "window";
        this.window.style.width = this.width;
        this.window.style.height = this.height;
        this.window.style.top = this.top;
        this.window.style.left = this.left;
        this.window.style.zIndex = runningPrograms.length-1

        // Create the window-top div element
        let windowTop = document.createElement("div");
        windowTop.className = "window-top";


        let titleContainer = document.createElement("div");
        let titleText = document.createElement("p")
        titleContainer.className = "title"
        titleText.innerHTML = this.name

        titleContainer.appendChild(titleText)


        let buttons = document.createElement("div")
        buttons.className = "buttons"
        
        // Create three button elements and append them to the window-top div
        let greenButton = document.createElement("button");
        greenButton.className = "round green";
        buttons.appendChild(greenButton);

        let yellowButton = document.createElement("button");
        yellowButton.className = "round yellow";
        buttons.appendChild(yellowButton);

        let redButton = document.createElement("button");
        redButton.className = "close round red";
        buttons.appendChild(redButton);

        windowTop.append(titleContainer)
        windowTop.appendChild(buttons)

        // Append the child elements to the main div
        this.window.appendChild(windowTop);
        this.window.appendChild(this.windowContent);

        // Insert the main div into the body
        document.body.appendChild(this.window);

        // Window drag
        
        let $jWindow = $(this.window);

        $jWindow.draggable({ handle: "div.window-top" });

        // Window resize
        $jWindow.resizable({ handles: "all", alsoresize: ".window-content" });

        // Window close
        //$('.windowclose').on("dblclick", function () { $(this).parents('div.window').hide(); });
        $jWindow.on("click", ".close:first", function () {
            $(this).closest('.window').remove();
        });
        
        $jWindow.mousedown(() => {
            this.bringToTop();
        });

    }

    bringToTop(){
        runningPrograms.splice(this.window.style.zIndex,1)

        runningPrograms.push(this)

        for (let i = 0; i < runningPrograms.length; i++) {
            let program = runningPrograms[i];
            if(program.window){
                program.window.style.zIndex = i
            }
        }


    }


    close() {
        console.log(`${this.name} program closed.`);
    }
}


class ConsoleProgram extends Program {
    constructor(name, consoleType) {
        super(name);
        this.window;
        this.windowContent;
        this.width = "450px";
        this.height="250px"
        this.top = "50%";
        this.left = "50%";
        this.consoleType = consoleType;
    }

    createWindow() {
        super.createWindow()
        // Create the window-content div element
        this.windowContent.innerHTML = "&gt; Welcome to the WindOS console<br />&gt;<br />&gt;&gt; B/";

        // Create the input element
        let inputElement = document.createElement("input");
        inputElement.className = "window-input";
        inputElement.type = "text";

        this.window.appendChild(inputElement);
    }

    run() {
        super.run();
        console.log(`Console program is running on ${this.consoleType} console.`);
        this.createWindow()
    }
}



class Calculator extends Program {
    constructor(name) {
        super(name);
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
              onclickFunction =  () => this.calculateResult();
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
        console.log(`${this.name} program is running.`);
        this.createWindow()
    }
}


class Notepad extends Program {
    constructor(name) {
        super(name);
        this.window;
        this.windowContent;
        this.width = "500px";
        this.height = "300px";
        this.top = "50%";
        this.left = "50%";
        this.textarea;
    }
    

    createWindow() {
        super.createWindow()
        this.textarea = document.createElement("textarea");

        // Set attributes for the textarea
        this.textarea.id = "dynamicTextarea";
        this.textarea.name = "dynamicText";
        /*this.textarea.rows = 20;
        this.textarea.cols = 70;*/
        this.textarea.style.width="100%"
        this.textarea.style.height="100%"
        this.textarea.style.boxSizing="border-box"
        this.textarea.style.resize="none"
        this.textarea.style.fontFamily="Comic Sans MS"
    
        // Append the textarea to the body or another HTML element
        this.windowContent.appendChild(this.textarea);
      }

    run() {
        super.run();
        console.log(`${this.name} program is running.`);
        this.createWindow()
    }
}



class Paint extends Program {
    constructor(name) {
        super(name);
        this.window;
        this.windowContent;
        this.width = "500px";
        this.height = "500px";
        this.top = "20%";
        this.left = "20%";
        this.canvas;
    }
    
    createWindow() {
        super.createWindow()
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.windowContent.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = "black"
        this.context.fillStyle = "white"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.context.beginPath();

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.context.moveTo(x, y);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.context.lineTo(x, y);
        this.context.stroke();
    }

    stopDrawing() {
        this.isDrawing = false;
    }


    run() {
        super.run();
        console.log(`${this.name} program is running.`);
        this.createWindow()
    }
}



/*var programList = {
    "Console": new ConsoleProgram('Console Program', 'Command Line'),
    "Calculator": new Calculator('Calculator'),
    "Notepad": new Notepad('Notepad'),
    "Paint": new Paint('Paint')
}*/

var programList = {
    "Console": ConsoleProgram,
    "Calculator": Calculator,
    "Notepad": Notepad,
    "Paint": Paint
}
