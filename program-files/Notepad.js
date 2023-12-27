class Notepad extends Program {
    constructor() {
        super()
        this.name = "Notepad"
        this.window;
        this.windowContent;
        this.width = "500";
        this.height = "300";
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
        this.textarea.style.width = "100%"
        this.textarea.style.height = "100%"
        this.textarea.style.boxSizing = "border-box"
        this.textarea.style.resize = "none"
        this.textarea.style.fontFamily = "Comic Sans MS"

        // Append the textarea to the body or another HTML element
        this.windowContent.appendChild(this.textarea);
    }

    run() {
        super.run();
    }
}

programClasses["Notepad"] = Notepad