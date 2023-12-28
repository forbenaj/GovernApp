/* STARTUP es el primer script que se ejecuta.
Contiene las variables globales más importantes y
las funciones que inicializan el resto de scripts.*/


// L I S T A   D E   P R O G R A M A S
// Todos los scripts que van a adjuntarse en el documento
// A cada programa listado le corresponde un script en /program-files
// Si se crea un nuevo programa, es necesario colocarlo en ésta lista
var programFiles = [
    {
        name: "GovernApp",
        type: "app",
        src: "program-files/GovernApp.js"
    },
    {
        name: "Chamber",
        type: "app",
        src: "program-files/Chamber.js"
    },
    {
        name: "Status",
        type: "app",
        src: "program-files/Status.js"
    },
    {
        name: "Console",
        type: "app",
        src: "program-files/Console.js"
    },
    {
        name: "Calculator",
        type: "app",
        src: "program-files/Calculator.js"
    },
    {
        name: "Notepad",
        type: "app",
        src: "program-files/Notepad.js"
    },
    {
        name: "Paint",
        type: "app",
        src: "program-files/Paint.js"
    },
    {
        name: "Settings",
        type: "app",
        src: "program-files/Settings.js"
    }
]

var startPrograms = [
        "GovernApp",
        "Chamber",
        "Status"
    ]



// Variables placeholder para poner las clases y las instancias.
var programClasses = {}
var programInstances = {}
/* Habíamos quedado en que cada script se encargaba de crear su propia instancia de clase al momento de adjuntar,
cosa que hubiera una sola instancia por cada programa, pero me pareció que tenía más sentido crear cada instancia
desde la función initProgram().

Ahora que lo pienso capaz es al pedo, no hace falta tener dos listas.
Algunas Apps, como GovernApp, NECESITAN ser persistentes para que no se borre la info cada vez que la cerras.
De todas formas eso se puede manejar aparte, con alguna función para tener la app en segundo plano.*/


// Lista de programas ejecutándose. Cada vez que se ejecuta un programa, se pushea la instancia acá
var runningPrograms = []


// ACÁ EMPIEZA TODO

// La primera función que se ejecuta cuando el body is ready ( ͡° ͜ʖ ͡°)
function onStartup() {


    // Carga todos los scripts con una promesa. Una vez que todos carguen, se pueden ejecutar programas
    Promise.all(programFiles.map(loadScript))
        .then(() => {

            // Acá adentro ya se puede ejecutar cualquier script adjuntado
            console.log("All scripts have been loaded!");

            desktop = new Desktop()
            
            for(let programName of startPrograms) {
                initProgram(programName)
            }
            
        })
        .catch((error) => {

            console.error("Error loading scripts:", error);
        });
}



// La función polémica. Instanciamos las clases acá? Se encarga cada programa? Cómo saberlo
function initProgram(programName) {

    // Crea una nueva instancia del programa y la aloja en programInstances
    programInstances[programName] = new programClasses[programName]()

    // Ejecuta el programa
    programInstances[programName].run()

    //runningPrograms.push(programInstance) // Por ahora lo maneja cada programa

}

// Generador de la ventana inicial (sin usar, no le des bola)
class startScreen {
    constructor(){
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;

        this.screen = document.createElement("div")
        this.screen.className = "startScreen"
        this.screen.style.width = this.screenWidth
        this.screen.style.height = this.screenHeight

        let startButton = document.createElement("input")
        startButton.className = "startButton"
        startButton.type = "button"
        startButton.value = "START"
        startButton.onclick = () => loadScript("programs.js")

        this.screen.appendChild(startButton)

        this.$jScreen = $(this.screen)

    }
    display() {
        document.body.appendChild(this.screen)
    }
}


// La función que añade los scripts al html
function loadScript(program) {

    return new Promise((resolve, reject) => {
        let script = document.createElement("script")
        script.src = program.src
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script)
    })
}

/* Con ésto ya arranca el escritorio con todos los íconos, se cargan
los scripts de cada programa y se crean las instancias.

Te recomiendo seguir con el [program-files/Program.js] para entender
cómo funcionan los programas
*/