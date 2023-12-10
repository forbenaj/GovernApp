class GovernApp extends Program {
    constructor() {
        super()
        this.name = "GovernApp"
        this.window;
        this.windowContent;
        this.width = "550";
        this.height = "550"
        this.top = "50%";
        this.left = "50%";
        this.leyesContainer;
        this.counter = 0
        this.currentLeyes = []
    }

    createWindow() {
        super.createWindow()
        // Create the window-content div element

        let titleContainer = document.createElement("div")
        titleContainer.style.textAlign = "center"

        let title = document.createElement("h1")
        title.innerHTML = "GovernApp"

        titleContainer.appendChild(title)

        this.leyesContainer = document.createElement("div")
        this.leyesContainer.className = "listContainer"

        this.windowContent.appendChild(titleContainer);
        this.windowContent.appendChild(this.leyesContainer);

        this.window.style.top="10%";
        this.window.style.left="10%";


        let generadorDeLeyes = document.createElement("input")
        generadorDeLeyes.type = "button"
        generadorDeLeyes.value = "Generar (DEV)"
        generadorDeLeyes.onclick = () => this.appendLey()

        this.windowContent.appendChild(generadorDeLeyes)
    }

    run() {
        super.run();
    }

    appendLey() {
      console.log(leyes.length)
      if(leyes.length<=0){
        leyes = leyesDefault
      }
        let randomLey = leyes[Math.floor(Math.random() * leyes.length)]
        let ley = new Ley(randomLey)


        this.currentLeyes.push(ley)

        ley.create(this.leyesContainer)

        this.leyesContainer.scrollTop = this.leyesContainer.scrollHeight
        
        const index = leyes.indexOf(randomLey);
        if (index !== -1) {
            leyes.splice(index, 1);
        }

    }

    openLey() {
        console.log("ley opened")

    }
}

class Ley {
    constructor(ley) {
        this.ley = ley;
        this.title = ley.title;
        this.text = ley.text;
        this.citizen = ley.citizen;
        this.tendency = ley.tendency;
        this.focused = false;
    }

    create(leyesContainer) {

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
        programInstances["Chamber"].addLey(this.ley)
    }

    discardLey() {
        console.log("Discarded!")
        this.$jLey.remove()

    }

}

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

let leyes = leyesDefault

programInstances["GovernApp"] = new GovernApp()