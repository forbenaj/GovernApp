/*

██████  ██████   ██████   ██████  ██████   █████  ███    ███ 
██   ██ ██   ██ ██    ██ ██       ██   ██ ██   ██ ████  ████ 
██████  ██████  ██    ██ ██   ███ ██████  ███████ ██ ████ ██ 
██      ██   ██ ██    ██ ██    ██ ██   ██ ██   ██ ██  ██  ██ 
██      ██   ██  ██████   ██████  ██   ██ ██   ██ ██      ██ 
                                                             
Cada programa es enrealidad una subclase de la clase Program.
Cuando se crea cualquier programa, se hace como una extensión de éste.
En ningún momento se debería crear una instancia de Program de forma directa.

*/

class Program {

    // C O N S T R U C T O R, acá se inicializa la clase.
    constructor() {

        this.name;
        this.processId;


        // Partes de la ventana
        this.window
        /*__________________________________
        |_____*/this.windowTop/*__________|x|
        |                                   |
        |                                   |
        |                                   |
        |*/       this.windowContent      /*|      <----- Se me hizo bonito
        |                                   |
        |                                   |
        |                                   |
        |___________________________________|
        */
        
        // Posición de la ventana
        this.x = 500
        this.y = 500

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

        this.multiInstance = true // Define si el programa se puede abrir varias veces - 07/11/24
        this.taskbarButton
        this.maximized = false
    }

    // E J E C U T A R
    run() {
        // Por ahora se pueden abrir los programas las veces que se quiera. Obviamente hay que desactivarlo para algunas apps.

        /* En éste momento ésta función NO SIRVE para evitar que los programas se reabran.
         Ésto es porque ahora cada vez que se abre un programa se crea una nueva instancia
         (polémico) y ésta función sólo chequea si ya estaba abierta la MISMA instancia. Dsp corregiré*/

        //let index = runningPrograms.indexOf(this);
        //if (index !== -1) {
        //    console.log("Program already running. Showing...")
        //}
        //else {
            // Es decir, se va a ejecutar solamente ésta parte:
        //    console.log(`Running ${this.name} program...`);
        //    this.id = runningPrograms.length
        //    runningPrograms.push(this)
        //    this.createWindow()
        //}

        /* Creo que el default debería ser que se puedan abrir nuevamente (nueva instancia),
        pero que algunos programas, como GovernApp, Chamber, Status, lo tengan deshabilitado.
        No quiero quitarle al jugador la chance de abrir 700 paints si tiene ganas. */

        // 07/11/24 - Dejo todos estos comentarios para documentar


        // Check if the programInstances contain a dictionary with the name of the program
        if (!this.multiInstance) {
            let programs = programManager.getRunningProgramsByName(this.name)
            if (programs.length > 0) {
                console.log(`Program already running with name ${this.name}. Showing...`)
                return
            }
        }

        
        this.processId = Object.keys(programManager.programInstances).length
        console.log(`Running ${this.name} program with id ${this.processId}...`);
        programManager.programInstances[this.processId] = this
        programManager.windowsDisplaying.push(this)
        this.createWindow()
        this.createTaskbarButton()
        this.bringToTop()
        
    }

    // C R E A R   V E N T A N A
    createWindow() {

        let randomPos = getRandomPosition({x:this.width,y:this.height}) // Por ahora las ventanas aparecen en posición al azar


    /*----------------------------------------------------------------------------- 
    |   Todo este quilombo crea la ventana en el HTML. Debería ser una función aparte.
    |   No le des muchísima bola.
    |
    */  
        // Crea la ventana principal
        this.window = document.createElement("div");
        this.window.id = this.name;
        this.window.className = "window";

        // Setea el tamaño y la posición
        this.window.style.width = this.width + "px";
        this.window.style.height = this.height + "px";
        this.x = randomPos.x
        this.y = randomPos.y
        this.window.style.left = this.x + "px";
        this.window.style.top = this.y + "px";
        this.window.style.zIndex = Object.keys(programManager.programInstances).length - 1 // La posición de la ventana en Z depende de la posición de la instancia en la lista de runningPrograms

        // Crea la barra superior
        this.windowTop = document.createElement("div");
        this.windowTop.className = "window-top";

        let titleContainer = document.createElement("div");
        let titleText = document.createElement("p")
        titleContainer.className = "title"
        titleText.innerHTML = this.name
        titleContainer.appendChild(titleText)

        // Crea los botones de la barra superior
        let buttons = document.createElement("div")
        buttons.className = "buttons"

        let minimizeButton = document.createElement("button");
        minimizeButton.className = "minimize";
        minimizeButton.addEventListener("click", () => {
            this.minimize()
        })
        buttons.appendChild(minimizeButton);

        let maximizeButton = document.createElement("button");
        maximizeButton.className = "maximize";
        maximizeButton.addEventListener("click", () => {
            this.maximize()
        })
        buttons.appendChild(maximizeButton);

        let closeButton = document.createElement("button");
        closeButton.className = "close";
        buttons.appendChild(closeButton);

        // Crea el contenido de la ventana
        this.windowContent = document.createElement("div");
        this.windowContent.className = "window-content";
        // Cada programa se encarga de rellenarlo


        // Adjuntación de elementos!!! Ver si se organiza de otra forma

        this.windowTop.append(titleContainer)
        this.windowTop.appendChild(buttons)

        this.window.appendChild(this.windowTop);
        this.window.appendChild(this.windowContent);

        document.body.appendChild(this.window);

    /*
    |   Fin de la creación de ventana
    |
    ----------------------------------------------------------------------------- */


        // Acá empieza el jQuery, puaj

        this.$jWindow = $(this.window); // Puaj

        // Window resize
        //this.$jWindow.resizable({ handles: "all", alsoresize: ".window-content" }); // Funca raro el resizable cuando tenemos el arrastre animado

        // Window close
        this.$jWindow.on("click", ".close:first", () => {
            this.close()
        });
        //redButton.addEventListener("click", () => {this.close()}) // Esto se puede usar en vez de jQuery

        this.$jWindow.mousedown(() => {
            this.bringToTop();
        });


        this.makeDraggable();

    }

    createTaskbarButton() {
        this.taskbarButton = document.createElement("button")
        this.taskbarButton.id = this.name + "TaskbarButton"
        this.taskbarButton.className = "taskbar-button"
        this.taskbarButton.innerHTML = this.name
        
        this.taskbarButton.addEventListener("click", () => {
            console.log("Taskbar button clicked")
            this.toggleWindow()
        })

        desktop.taskbar.appendChild(this.taskbarButton)
    }

    // T R A E R   A L   F R E N T E
    bringToTop() {
        // Elimina la instancia de la lista y la pushea de nuevo, cosa de que quede al final de la lista
        programManager.windowsDisplaying.splice(this.window.style.zIndex, 1)
        programManager.windowsDisplaying.push(this)

        // Reordena los zIndex de la lista de programas
        for (let i = 0; i < programManager.windowsDisplaying.length; i++) {
            let program = programManager.windowsDisplaying[i];
            if (program.window) {
                program.window.style.zIndex = i
                program.taskbarButton.classList.remove("selected")
            }
        }
        this.window.classList.remove("minimized")

        this.taskbarButton.classList.add("selected")
    }

    minimize() {
        console.log("Minimizing...")
        //programManager.windowsDisplaying.splice(this.window.style.zIndex, 1)
        //programManager.windowsDisplaying.unshift(this)

        //for (let i = 0; i < programManager.windowsDisplaying.length; i++) {
        //    let program = programManager.windowsDisplaying[i];
        //    if (program.window) {
        //        program.window.style.zIndex = i
        //    }
        //}
        this.window.classList.add("minimized")
        //this.selected = true
        this.taskbarButton.classList.remove("selected")
    }

    maximize() {
        this.window.classList.toggle("maximized")
        this.maximized = !this.maximized
    }

    // A R R A S T R E   A N I M A D O
    makeDraggable() {

        // Tampoco le des mucha bola, sólo añade el arrastre con fricción y reboteishon

        this.friction = settings.friction
        this.bounceFactor = settings.bounce_factor

        this.speedX = 0;
        this.speedY = 0;

        /* Antes había la opción de elegir arrastre normal con jQuery o arrastre animado.
        Saqué el jQuery para simplificar pero se puede volver a agregar/*

        /*this.windowTop.removeEventListener("mousedown", this.mousedownHandler);
        document.removeEventListener("mousemove", this.mousemoveHandler);
        document.removeEventListener("mouseup", this.mouseupHandler);*/

        //if (settings.gameloop) {
            /*if (this.$jWindow.hasClass("ui-draggable")) {
                // Destroy jQuery UI draggable instance 
                this.$jWindow.draggable("destroy");
            }*/



            let isMouseDown = false;

            
            // Declara las funciones para cuando el mouse haga cosas

            // Cuando se aprieta el click
            this.mousedownHandler = (e) => {
                isMouseDown = true;
            }

            // Cuando se mueve el mouse
            this.mousemoveHandler = (event) => {
                if (isMouseDown) {
                    event.preventDefault(); // Evita que pase lo predeterminado, como que se seleccione texto
                    
                    /* Lo único que hace esta función es medir más o menos la
                        velocidad a la que se está moviendo el mouse, para después
                        usarla para mover la ventana a la misma velocidad.
                        Parece rebuscado, porque podría ponerse tipo windowPosition = mousePosition,
                        pero hace falta hacerlo así para añadir fricción y rebote.
                    */

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

            // Cuando se suelta el click
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

    // L O O P
    update() {
        // Por ahora ésta función sólo maneja el arrastre animado. Tampoco hace falta darle mucha bola.

        // Control de velocidad
        if (!this.maximized) {
            this.x += this.speedX
            this.y += this.speedY

            this.window.style.left = this.x + "px";
            this.window.style.top = this.y + "px";

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            this.speedX *= this.friction
            this.speedY *= this.friction

            // Control de rebote
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

    }

    toggleWindow() {
        if (this.window.classList.contains("minimized") || this.window.style.zIndex != programManager.windowsDisplaying.length - 1) {
            this.bringToTop()
        }
        else {
            this.minimize()
        }
    }

    // C E R R A R   V E N T A N A
    close() {
        //console.log(`${this.name} program closed.`);

        // Elimina los event listeners que añadimos. No creo que haga falta pero por las dudas
        this.windowTop.removeEventListener("mousedown", this.mousedownHandler);
        document.removeEventListener("mousemove", this.mousemoveHandler);
        document.removeEventListener("mouseup", this.mouseupHandler);

        // Elimina la ventana
        this.window.remove()

        // Elimina el programa de la lista de programas ejecutándose
        const indexProgram = programManager.windowsDisplaying.indexOf(this);
        if (indexProgram !== -1) {
            programManager.windowsDisplaying.splice(indexProgram, 1);
        }

        // Elimina el botón de la barra de tareas
        desktop.taskbar.removeChild(this.taskbarButton)
    }
}

/* Ahora si a ver el jueguito la cdsm!!
Deberías seguir con [GovernApp.js] */