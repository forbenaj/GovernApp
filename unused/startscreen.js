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