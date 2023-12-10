class ConsoleProgram extends Program {
    constructor() {
        super()
        this.name = "Console"
        this.window;
        this.windowContent;
        this.width = "450";
        this.height = "250"
        this.top = "50%";
        this.left = "50%";
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
    }
}

programInstances["Console"] = new ConsoleProgram()