class Chamber extends Program {
    constructor() {
        super()
        this.name = "Chamber"
        this.window;
        this.windowContent;
        this.width = "300";
        this.height = "400"
        this.top = "50%";
        this.left = "80%";
        this.currentlyDebating = []
    }

    createWindow() {
        super.createWindow()

        let titleContainer = document.createElement("div")
        titleContainer.style.textAlign = "center"

        let title = document.createElement("h4")
        title.innerHTML = "Camara de Desayunadores"

        titleContainer.appendChild(title)

        let chamberContainer = document.createElement("div")

        let canvas = document.createElement("canvas")
        canvas.width = 200
        canvas.height = 150
        let ctx = canvas.getContext("2d")
        chamberContainer.appendChild(canvas)


        // Función mágica para generar la cámara
        let i = 1;
        let j = 0;

        let senadoresRows = [
            senadores.slice(0, 6),
            senadores.slice(7, 15),
            senadores.slice(16, 29)
        ]
        for (let senadorRow of senadoresRows) {
            i++
            j = 0;
            for (let senador of senadorRow) {
                j++
                let radius = i * 24
                let origin = { x: 100, y: 100 }
                let x = origin.x + Math.cos(j * (0.23 * ((6 - i) * 0.5)) + Math.PI) * radius
                let y = origin.y + Math.sin(j * (0.23 * ((6 - i) * 0.5)) + Math.PI) * radius
                ctx.beginPath()
                ctx.arc(x, y, 5, 0, Math.PI * 2, true)
                ctx.fillStyle = senador
                ctx.fill()
                ctx.closePath()
            }
        }

        this.window.style.top="20%";
        this.window.style.left="60%";

        this.debatingContainer = document.createElement("div")
        this.debatingContainer.className = "debatingContainer"


        //this.windowContent.appendChild(titleContainer);
        this.windowContent.appendChild(chamberContainer);
        this.windowContent.appendChild(this.debatingContainer)


    }

    run() {
        super.run();
    }

    addLey(ley) {
        ley.debatingLeyContainter.className = "debatingLeyContainer"

        let title = document.createElement("p")
        title.innerHTML = ley.title

        ley.debatingLeyContainter.appendChild(title)

        ley.debatingLeyContainter.appendChild(ley.progressBar)

        this.debatingContainer.appendChild(ley.debatingLeyContainter)

        this.currentlyDebating.push(ley)
    }

    endDebate(selectedLey,verdict){
        selectedLey.debated = true
        console.log("ended debate, verdict:"+verdict)
        selectedLey.debatingLeyContainter.style.backgroundColor = verdict? "green" : "red"
        
    }

    update() {
        super.update()
        if(this.currentlyDebating.length > 0) {
            for (let selectedLey of this.currentlyDebating) {
                if(!selectedLey.debated){
                    if(selectedLey.progressBar.value<100){
                        selectedLey.progressBar.value = selectedLey.progressBar.value +0.1
                    }
                    else{
                        let verdict = selectedLey.tendency >= 0? true : false
                        this.endDebate(selectedLey,verdict)
                    }
                }
            }
        }
    }

}


programClasses["Chamber"] = Chamber