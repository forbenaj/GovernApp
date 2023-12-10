var programList = [
    //"GovernApp",
    //"Chamber",
    //"Status",
    "Console",
    "Calculator",
    "Notepad",
    "Paint",
    "Settings"
]

var programInstances = {}

// Initializes all scripts and icons on body load

function initialize() {
    for (let programName of programList) {

        let script = document.createElement("script")
        script.src = "program-files/" + programName + ".js"
        document.body.appendChild(script)


        let desktop = document.getElementById("Desktop")
        let icon = document.createElement("div")
        let image = document.createElement("div")
        let text = document.createElement("div")

        icon.ondblclick = () => initProgram(programName)
        icon.id = "consoleIcon"
        icon.className = "icon"

        image.className = "icon-image"

        text.className = "icon-text"
        text.innerHTML = programName

        icon.appendChild(image)
        icon.appendChild(text)

        desktop.appendChild(icon)

    }
    initProgram("GovernApp")
    initProgram("Chamber")
    initProgram("Status")
}




function initProgram(programName) {

    let programInstance = programInstances[programName]

    programInstance.run()

}

runningPrograms = [
    { name: "WindOS", id: 0 }
]



// Program class
class Program {
    constructor() {
        this.name;
        this.id;

        this.window
        this.windowTop
        this.windowContent
        this.x = 500
        this.y = 500
        this.visible;

        this.lastX = 0;
        this.lastY = 0;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;

        this.speedX = 0;
        this.speedY = 0;

        this.friction = settings.friction
        this.bounceFactor = settings.bounce_factor
    }

    run() {

        let index = runningPrograms.indexOf(this);
        console.log(index)
        if (index !== -1) {
            console.log("Program already running. Showing...")
        }
        else {
            console.log(`Running ${this.name} program...`);
            this.id = runningPrograms.length
            runningPrograms.push(this)
            this.createWindow()
        }
        if (this.window.style.visibility == "visible") {
            console.log("Program already visible!")
        }
        else {
            this.window.style.visibility = "visible"
        }
    }

    createWindow() {
        this.visible = true;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const randomX = Math.floor(Math.random() * screenWidth);
        const randomY = Math.floor(Math.random() * screenHeight);

        this.windowContent = document.createElement("div");
        this.windowContent.className = "window-content";


        // Create the main div element
        this.window = document.createElement("div");
        this.window.id = this.name;
        this.window.className = "window";
        this.window.style.width = this.width + "px";
        this.window.style.height = this.height + "px";
        this.x = randomX
        this.y = randomY
        this.window.style.left = this.x + "px";
        this.window.style.top = this.y + "px";
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
        //redButton.addEventListener("click", () => {this.close()})

        this.windowTop.append(titleContainer)
        this.windowTop.appendChild(buttons)

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

    }


    bringToTop() {
        runningPrograms.splice(this.window.style.zIndex, 1)

        runningPrograms.push(this)

        for (let i = 0; i < runningPrograms.length; i++) {
            let program = runningPrograms[i];
            if (program.window) {
                program.window.style.zIndex = i
            }
        }


    }

    makeDraggable() {

        this.friction = settings.friction
        this.bounceFactor = settings.bounce_factor

        this.speedX = 0;
        this.speedY = 0;

        // Remove custom dragging logic if it was previously added
        this.windowTop.removeEventListener("mousedown", this.mousedownHandler);
        document.removeEventListener("mousemove", this.mousemoveHandler);
        document.removeEventListener("mouseup", this.mouseupHandler);

        if (settings.bouncy_dragging) {


            if (this.$jWindow.hasClass("ui-draggable")) {
                // Destroy jQuery UI draggable instance
                this.$jWindow.draggable("destroy");
            }

            // Listen to mouse

            let isMouseDown = false;

            this.mousedownHandler = (e) => {
                isMouseDown = true;
            }

            this.mousemoveHandler = (event) => {
                if (isMouseDown) {
                    event.preventDefault();
                    this.startX = this.lastX;
                    this.startY = this.lastY;
                    this.endX = event.clientX
                    this.endY = event.clientY

                    this.speedX = this.endX - this.startX
                    this.speedY = this.endY - this.startY

                    this.lastX = this.endX;
                    this.lastY = this.endY
                }
                else {
                    this.lastX = event.clientX
                    this.lastY = event.clientY
                }
            }

            this.mouseupHandler = () => {
                if (isMouseDown) {
                    isMouseDown = false
                }
            }

            this.windowTop.addEventListener("mousedown", this.mousedownHandler);

            document.addEventListener("mousemove", this.mousemoveHandler)

            document.addEventListener("mouseup", this.mouseupHandler)

            this.x = parseInt(this.window.style.left)
            this.y = parseInt(this.window.style.top)

        }
        else {

            this.$jWindow.draggable({ handle: "div.window-top", containment: "window" });

        }

    }

    update() {

        this.x += this.speedX
        this.y += this.speedY

        this.window.style.left = this.x + "px";
        this.window.style.top = this.y + "px";


        // Get the dimensions of the viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        this.speedX *= this.friction
        this.speedY *= this.friction

        if (this.x < 0) {
            this.speedX = Math.abs(this.speedX) * this.bounceFactor;
            this.x = 0;
            this.deltaX *= -1 * this.bounceFactor
        }
        if (this.x > viewportWidth - this.width) {
            this.speedX = -Math.abs(this.speedX) * this.bounceFactor;
            this.x = viewportWidth - this.width;
            this.deltaX *= -1 * this.bounceFactor
        }

        if (this.y < 0) {
            this.speedY = Math.abs(this.speedY) * this.bounceFactor;
            this.y = 0;
            this.deltaY *= -1 * this.bounceFactor
        }
        if (this.y > viewportHeight - this.height) {
            this.speedY = -Math.abs(this.speedY) * this.bounceFactor;
            this.y = viewportHeight - this.height;
            this.deltaY *= -1 * this.bounceFactor
        }

        this.width = this.window.offsetWidth
        this.height = this.window.offsetHeight


    }

    close() {
        //console.log(`${this.name} program closed.`);
        //this.$jWindow.remove()

        this.window.style.visibility = "hidden"

        /*const index = runningPrograms.indexOf(this);
        if (index !== -1) {
            runningPrograms.splice(index, 1);
        }*/
    }
}

var debatingLaws = []

var senadores = []/*["red", "blue", "blue", "blue", "red", "red", "blue", "red", "red", "blue",
"red", "blue", "blue", "blue", "red", "red", "blue", "red", "red", "blue",
"red", "blue", "blue", "blue", "red", "red", "blue", "red", "red", "blue"]*/

for(i=0;i<30;i++){
    let random = Math.floor(Math.random()*2)
    let color = random == 1? "red":"blue"
    senadores.push(color)
}

var animRunning = false

var tickCounter = 0;

function mainLoop() {

    if (settings.bouncy_dragging) {
        for (let program of runningPrograms) {
            if (typeof program.update === 'function') {
                program.update()
            }
        }
    }

    tickCounter++

    if(tickCounter>300){
        console.log("tick")
        tickCounter = 0
        programInstances["GovernApp"].appendLey()
    }

    if (animRunning) { requestAnimationFrame(mainLoop); }
}

function startLoop() {
    if (!animRunning) {
        animRunning = true
        mainLoop()
    }
}

function stopLoop() {
    animRunning = false
}



var settings = {
    bouncy_dragging: true,
    friction: 0.98,
    bounce_factor: 0.7
}

startLoop()