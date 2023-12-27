class Status extends Program {
    constructor() {
        super()
        this.name = "Status"
        this.window;
        this.windowContent;
        this.width = "350";
        this.height = "100"
        this.top = "10%";
        this.left = "80%";
    }

    createWindow() {
        this.visible = true;

        this.windowContent = document.createElement("div");
        this.windowContent.className = "window-content";


        // Create the main div element
        this.window = document.createElement("div");
        this.window.id = this.name;
        this.window.className = "window";
        this.window.style.width = this.width + "px";
        this.window.style.height = this.height + "px";
        this.window.style.right = "10%";
        this.window.style.top = "20%";
        /*this.window.style.top = this.top;
        this.window.style.left = this.left;*/
        this.window.style.zIndex = runningPrograms.length - 1

        // Create the window-top div element
        this.windowTop = document.createElement("div");
        this.windowTop.className = "window-top";


        let titleContainer = document.createElement("div");
        let titleText = document.createElement("p")
        titleContainer.className = "title"
        titleText.innerHTML = this.name

        titleContainer.appendChild(titleText)

        this.windowTop.append(titleContainer)

        // Append the child elements to the main div
        this.window.appendChild(this.windowTop);
        this.window.appendChild(this.windowContent);

        // Insert the main div into the body
        document.body.appendChild(this.window);

        this.$jWindow = $(this.window);

        // Window resize
        this.$jWindow.resizable({ handles: "all", alsoresize: ".window-content" });

        // Window close
        this.$jWindow.on("click", ".close:first", () => {
            this.close()
        });

        this.$jWindow.mousedown(() => {
            this.bringToTop();
        });

        this.makeDraggable();



        let strikesContainer = document.createElement("div")
        strikesContainer.className = "strikesContainer"

        this.strikes = []
        for (i = 0; i < 5; i++) {
            let strike = document.createElement("div")
            strike.className = "strike"
            strike.style.backgroundColor = "white"
            strikesContainer.appendChild(strike)
            this.strikes.push(strike)
        }

        this.windowContent.appendChild(strikesContainer)
    }

    run() {
        super.run();
    }
}

programClasses["Status"] = Status