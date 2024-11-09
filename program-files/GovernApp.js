/* 

 ██████╗  ██████╗ ██╗   ██╗███████╗██████╗ ███╗   ██╗ █████╗ ██████╗ ██████╗ 
██╔════╝ ██╔═══██╗██║   ██║██╔════╝██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔══██╗
██║  ███╗██║   ██║██║   ██║█████╗  ██████╔╝██╔██╗ ██║███████║██████╔╝██████╔╝
██║   ██║██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║██╔═══╝ ██╔═══╝ 
╚██████╔╝╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██║ ╚████║██║  ██║██║     ██║     
 ╚═════╝  ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝     
                                                                             
La aplicación principal!

Como todos los programas, es una subclase de Program.
La convención de nombres está horrible. Fue todo muy apurado.

*/

class GovernApp extends Program {
    constructor() {
        super() // La palabra clave super() ejecuta la función correspondiente de la superclase
        this.name = "GovernApp"
        this.window;
        this.windowContent;
        this.width = "550";
        this.height = "600"
        this.top = "50%";
        this.left = "50%";
        this.leyesContainer;
        this.currentLeyes = []
        

        // El tickCounter se rellena en el update hasta llegar al numero random
        this.tickCounter = 0;

        // Genera un numero random entre   ↓         y        ↓
        this.randomTick =                 150+(Math.random()*500)

        this.multiInstance = false
    }

    createWindow() {
        super.createWindow() // Ejecuta la función createWindow() de la superclase Program

        // En este punto la estructura básica de la ventana ya está armada, con el windowContent vacío
        // El resto de la función sólo añade los elementos dentro del windowContent

        let titleContainer = document.createElement("div")
        titleContainer.className = "appTitleContainer"
        titleContainer.style.textAlign = "center"

        let title = document.createElement("h1")
        title.innerHTML = "GovernApp"

        // Indicador de notificaciones
        this.notif = document.createElement("div")
        // Si hay notificaciones, queda rojo
        if(this.currentLeyes.length > 0){
          this.notif.className = "notif"
        }
        // Si no hay notificaciones, queda verde
        else{this.notif.className = "noNotif"}
        this.notif.innerHTML = this.currentLeyes.length

        titleContainer.appendChild(this.notif)
        titleContainer.appendChild(title)
        
        let description = document.createElement("p")
        description.innerHTML = "Bienvenido al Sistema Único de Aprobación de Leyes y Estatutos! Por favor, revise las leyes pendientes sugeridas por los ciudadanos"

        // Crea el contenedor de leyes, que es donde se reciben las leyes
        this.leyesContainer = document.createElement("div")
        this.leyesContainer.className = "listContainer"

        this.windowContent.appendChild(titleContainer);
        this.windowContent.appendChild(description);
        this.windowContent.appendChild(this.leyesContainer);

        this.window.style.top="10%";
        this.window.style.left="10%";

        // Botón para generar leyes para probar
        let generadorDeLeyes = document.createElement("input")
        generadorDeLeyes.type = "button"
        generadorDeLeyes.value = "Generar (DEV)"
        generadorDeLeyes.onclick = () => this.appendLey()

        this.windowContent.appendChild(generadorDeLeyes)
    }

    run() {// Esta función no hace falta por ahora
        super.run();
    }

    appendLey() {
      
      /* Ésta es la función que hace llegar las leyes al jugador.
          Toma una copia de la lista de leyes para no modificar la lista original.
          Va eligiendo leyes random de la lista y eliminándolas para que no se repitan.
          Cuando se acaban las leyes de la lista, se recarga haciendo una copia de la original nuevamente*/
      
        // Crea y reproduce el sonido
        new Audio("assets/notification.mp3").play()

        // Si la lista está vacía, hace una copia nuevamente (la variable está más abajo, por fuera de la clase)
        if(leyes.length<=0){
            console.log("leyes var emptied")
            leyes = leyesDefault.slice()
        }
      
        // Agarra una ley random de la lista
        let randomLey = leyes[Math.floor(Math.random() * leyes.length)]

        // Crea una nueva instancia de la clase Ley con la info sacada de la lista
        let ley = new Ley(randomLey)

        // Pushea la instancia en la lista de leyes actualmente visibles
        this.currentLeyes.push(ley)

        // Crea el html de la ley y lo adjunta al contenedor de leyes
        ley.create(this.leyesContainer)

        //this.leyesContainer.scrollTop = this.leyesContainer.scrollHeight // Escrolea al fondo cada vez que llega una nueva ley. Resultó molesto así que lo saqué

        // Borra la ley de la lista de leyes
        const index = leyes.indexOf(randomLey);
        if (index !== -1) {
            leyes.splice(index, 1);
        }

        // Actualiza la notificación
        this.updateNotif()


    }

    // Función que elimina la ley de la lista de leyes, ya sea que se aprobó o desaprobó
    resolveLey(ley){
        const index = this.currentLeyes.indexOf(ley);
        if (index !== -1) {
            this.currentLeyes.splice(index, 1);
        }
        this.updateNotif()
    }

    // Actualiza el indicador de notificaciones
    updateNotif(){
        this.notif.innerHTML = this.currentLeyes.length
        if(this.currentLeyes.length > 0){
            this.notif.className = "notif"
        }
        else{
            this.notif.className = "noNotif"
        }
    }
    
    // Se añaden algunas cosas al loop del programa
    update(){
        super.update()

        // Adjunta una nueva ley cada vez que pasa el tiempo indicado, que es un número de ticks aleatorio entre 50 y 500 (1 seg a 10 seg aprox)
        if(this.tickCounter>this.randomTick){
            console.log("tick")
            this.tickCounter = 0
            this.randomTick = 50+(Math.random()*500)
        if(this.currentLeyes.length < 8){
            this.appendLey()
        }
        
        }
        this.tickCounter++
        
    }
}


// Clase que maneja las leyes en sí. Capaz toda esta clase debería moverse a otro script, porque es bastante general
class Ley {
    constructor(ley) {
        // Recibe un objeto con title, text, citizen y tendency.
        this.ley = ley;
        this.title = ley.title;
        this.text = ley.text;
        this.citizen = ley.citizen;
        this.tendency = ley.tendency;
        this.focused = false;
        this.debated = false;

        
    }

    create(leyesContainer) {
        /* Función para crear el html de las leyes.
        */

        this.leyContainer = document.createElement("div")
        this.leyContainer.className = "leyContainerUnfocused"

        this.photoContainer = document.createElement("div")
        this.photoContainer.className = "photoContainer"
        this.citizenPhoto = document.createElement("img")
        this.citizenPhoto.className = "citizenPhoto"
        this.citizenPhoto.src = "assets/"+Math.ceil(Math.random()*8)+".png"

        let randomR = Math.floor(Math.random() * 255)
        let randomG = Math.floor(Math.random() * 255)
        let randomB = Math.floor(Math.random() * 255)
        let randomColor = `rgb(${randomR},${randomG},${randomB})`
        this.photoContainer.style.backgroundColor = randomColor;
        this.photoContainer.appendChild(this.citizenPhoto)

        this.leyContainer.appendChild(this.photoContainer)

        let leyTextContainer = document.createElement("div")
        leyTextContainer.className = "leyTextContainer"

        let leyTitle = document.createElement("h3")
        leyTitle.innerHTML = this.title;

        let leyText = document.createElement("p")
        leyText.innerHTML = this.text

        leyTextContainer.appendChild(leyTitle)
        leyTextContainer.appendChild(leyText)

        this.leyContainer.appendChild(leyTextContainer)

        leyesContainer.appendChild(this.leyContainer)

        this.leyContainer.onclick = () => this.toggleFocus()


        let buttonContainer = document.createElement("div")
        buttonContainer.className = "buttonContainer"

        let approveButton = document.createElement("input")
        approveButton.className = "approveButton"
        approveButton.type = "button"
        approveButton.value = "👍"
        approveButton.onclick = () => this.approveLey()

        let discardButton = document.createElement("input")
        discardButton.className = "discardButton"
        discardButton.type = "button"
        discardButton.value = "👎"
        discardButton.onclick = () => this.discardLey()

        buttonContainer.appendChild(approveButton)
        buttonContainer.appendChild(discardButton)

        leyTextContainer.appendChild(buttonContainer)

        this.$jLey = $(this.leyContainer);

        // Ésta parte es para cuando se pone la ley en Chamber
        this.progressBar = document.createElement("progress")
        this.progressBar.max = "100"
        this.progressBar.value = "0"
        this.progressBar.textContent = this.title;

        this.debatingLeyContainter = document.createElement("div")
        this.debatingLeyContainter.style.backgroundColor="white"

    }

    append() {

    }

    toggleFocus() {
        if (this.focused) {
            console.log("unfocused " + this.title)
            this.leyContainer.className = "leyContainerUnfocused"
            this.focused = false
        }
        else {
            console.log("opened " + this.title)
            this.leyContainer.className = "leyContainerFocused"
            this.focused = true
        }
    }

    approveLey() {
        console.log("Approved!")
        this.$jLey.remove()

        programManager.getRunningProgramsByName("GovernApp")[0].resolveLey(this)

        programManager.getRunningProgramsByName("Chamber")[0].addLey(this)
    }

    discardLey() {
        console.log("Discarded!")
        this.$jLey.remove()

        programInstances["GovernApp"].resolveLey(this)
    }

}


// Lista de todas las leyes. Debería estar alojado en otro lado.
let leyesDefault = [
    {
      "title": "mas viviendas para todes",
      "text": "Programa de refugios para animales sin hogar Creación de refugios estatales para perros y gatos callejeros, proporcionando cuidados, esterilización y adopción responsable.",
      "citizen": "",
      "tendency": 50
    },
    {
      "title": "aborto legal seguro y gratuito",
      "text": "Campaña de esterilización gratuita para fauna urbana Facilitar la esterilización gratuita de palomas, conejos y otras especies urbanas para controlar su población de manera ética.",
      "citizen": "",
      "tendency": 25
    },
    {
      "title": "vivienda digna",
      "text": "Reservas naturales protegidas para especies en peligro Establecimiento de áreas protegidas específicas para la preservación de especies en peligro de extinción.",
      "citizen": "",
      "tendency": 40
    },
    {
      "title": "un sol para los chicos",
      "text": "Programa de reforestación animal Colaboración entre humanos y animales para plantar árboles y restaurar hábitats naturales.",
      "citizen": "",
      "tendency": 60
    },
    {
      "title": "Los perros tienen que pagar impuestos!",
      "text": "Es increíble que estos animales se paseen por todo argentina como si fuera de ellos, propongo que estos deudores crónicos sean enjuiciados y obligados a pagar por la limpieza de de los árboles bandalizados",
      "citizen": "",
      "tendency": -30
    },
    {
      "title": "Ingles integral para loros",
      "text": "Es sabido que estos grandes amigos del hombre menejan el castellano con gracia, es hora de que aprendan en lenguaje de la libertad, ingles integral para todos los loros de 2 a 5 años",
      "citizen": "",
      "tendency": -45
    },
    {
      "title": "Trabajo forzado para los monos",
      "text": "Es un hecho que gracias a el libre mercado los escaparates no dan abasto, la mano de obra barata y sin necesidad de beneficios laborales es ideal para reponer los productos importados vendidos",
      "citizen": "",
      "tendency": -60
    },
    {
      "title": "Tratamiento capilar para los leones",
      "text": "La melena del león es un símbolo de estatus como el pico del agila o el látigo del amo por eso es necesario que el estado financie los tratamientos de belleza de todos los leones",
      "citizen": "",
      "tendency": -40
    },
    {
      "title": "Visados para gatos callejeros",
      "text": "Los gatos sin hogar deberán solicitar un visado anual para transitar libremente por las calles, demostrando su buena conducta y habilidades de caza.",
      "citizen": "",
      "tendency": -30
    },
    {
      "title": "Matrimonio obligatorio entre jirafas y cebras",
      "text": "Promover la integración inter-especies mediante matrimonios entre jirafas y cebras para fomentar la diversidad y el entendimiento.",
      "citizen": "",
      "tendency": -20
    },
    {
      "title": "Educación financiera para ardillas",
      "text": "Se implementará un programa obligatorio para que las ardillas aprendan a ahorrar y administrar sus nueces de forma responsable.",
      "citizen": "",
      "tendency": -30
    },
    {
      "title": "Toque de queda para murciélagos",
      "text": "Los murciélagos deberán respetar un horario de vuelo restringido para garantizar el descanso nocturno de los ciudadanos.",
      "citizen": "",
      "tendency": -40
    },
    {
      "title": "Becas de moda para osos polares",
      "text": "Se proporcionarán becas para que los osos polares se mantengan al día con las últimas tendencias de moda ártica.",
      "citizen": "",
      "tendency": -50
    }
  ]

// Ésto crea una copia de la lista de leyes, para poder eliminar las leyes a medida que se van recibiendo
let leyes = leyesDefault.slice()


// Como todos los programas, guarda una referencia a su propia clase en programClasses
programManager.programClasses["GovernApp"] = GovernApp

/* Y prácticamente está todo! Solo faltaría revisar el [main.js] para ver cómo funciona el loop */