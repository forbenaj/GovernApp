/* Program.js es el primer script que se añade al html.
Cada programa que instanciamos es una subclase de la clase Program.
En ningún momento se crea una instancia de Program de forma directa.
*/

class Program {
    constructor() {

        this.name;
        this.id; /* En éste contexto, "id" es el número con el que
                    se identifica al programa, no el "id" del elemento html.
                    Capaz hay que cambiarle el nombre para evitar confusión.*/

        this.window // Contenedor principal
        this.windowTop // Barra de arribita
        this.windowContent // Contenido de la aplicación. Acá dentro va todo
        this.x = 500
        this.y = 500
        this.visible;

        // Variables para el arrastre animado
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
        // Por ahora se pueden abrir los programas las veces que se quiera. Obviamente hay que sacarlo para algunas apps.

        /* Ésta función NO SIRVE para evitar que los programas se reabran.
         Ésto es porque cada vez que se abre un programa se crea una nueva instancia
         (polémico) y ésta función sólo chequea si ya estaba abierta la MISMA instancia. Dsp corregiré*/

        let index = runningPrograms.indexOf(this);
        if (index !== -1) {
            console.log("Program already running. Showing...")
        }
        else {
            // Es decir, se va a ejecutar solamente ésta parte:
            console.log(`Running ${this.name} program...`);
            this.id = runningPrograms.length
            runningPrograms.push(this)
            this.createWindow()
        }

        /* Creo que el default debería ser que se puedan abrir nuevamente (nueva instancia),
        pero que algunos programas, como GovernApp, Chamber, Status, lo tengan deshabilitado.
        No quiero quitarle al jugador la chance de abrir 700 paints si tiene ganas. */
    }

    createWindow() {

        let randomPos = getRandomPosition() // Por ahora las ventanas aparecen en posición al azar

        this.windowContent = document.createElement("div");
        this.windowContent.className = "window-content";


        // Create the main div element
        this.window = document.createElement("div");
        this.window.id = this.name;
        this.window.className = "window";
        this.window.style.width = this.width + "px";
        this.window.style.height = this.height + "px";
        this.x = randomPos.x
        this.y = randomPos.y
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
        //this.$jWindow.resizable({ handles: "all", alsoresize: ".window-content" });

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
        /*this.windowTop.removeEventListener("mousedown", this.mousedownHandler);
        document.removeEventListener("mousemove", this.mousemoveHandler);
        document.removeEventListener("mouseup", this.mouseupHandler);*/

        //if (settings.gameloop) {


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

        //}
        /*else {

            this.$jWindow.draggable({ handle: "div.window-top", containment: "window" });

        }*/

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

        // Elimina los event listeners que añadimos para hacer que la ventana se mueva. No creo que haga falta pero por las dudas
        this.windowTop.removeEventListener("mousedown", this.mousedownHandler);
        document.removeEventListener("mousemove", this.mousemoveHandler);
        document.removeEventListener("mouseup", this.mouseupHandler);

        // Elimina la ventana
        this.window.remove()

        // Elimina el programa de la lista de programas ejecutándose
        const index = runningPrograms.indexOf(this);
        if (index !== -1) {
            runningPrograms.splice(index, 1);
        }
    }
}

programClasses["Program"] = Program