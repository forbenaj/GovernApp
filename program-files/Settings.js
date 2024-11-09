class Settings extends Program {
    constructor() {
        super()
        this.name = "Settings"
        this.window;
        this.windowContent;
        this.width = "450";
        this.height = "250"
        this.top = "40%";
        this.left = "40%";
    }

    createWindow() {
        super.createWindow();

        /*  B O U N C Y  S E T U P  */

        // is bouncy?
        let isBouncyLabel = document.createElement("label");

        this.isGameloop = document.createElement("input");
        this.isGameloop.type = "checkbox";
        this.isGameloop.name = "isBouncySet";
        this.isGameloop.checked = settings.gameloop

        let labelText = document.createTextNode("Enable Gameloop");
        isBouncyLabel.appendChild(this.isGameloop);
        isBouncyLabel.appendChild(labelText);


        // Bounce factor slider
        let bounceSettings = document.createElement("div");
        let bounceFactorLabel = document.createElement("label");
        bounceFactorLabel.innerHTML = "Bounce factor: ";
        bounceSettings.appendChild(bounceFactorLabel);

        this.bounceSlider = document.createElement("input");
        this.bounceSlider.type = "range";
        this.bounceSlider.min = 0;
        this.bounceSlider.max = 99;
        this.bounceSlider.value = settings.bounce_factor * 100; // Initial value
        bounceSettings.appendChild(this.bounceSlider);

        // Friction slider

        let frictionSettings = document.createElement("div");
        let frictionLabel = document.createElement("label");
        frictionLabel.innerHTML = "Friction: ";
        frictionSettings.appendChild(frictionLabel);

        this.frictionSlider = document.createElement("input");
        this.frictionSlider.type = "range";
        this.frictionSlider.min = 1;
        this.frictionSlider.max = 9;
        this.frictionSlider.value = (100 - settings.friction) * 100; // Initial value
        frictionSettings.appendChild(this.frictionSlider);


        this.windowContent.appendChild(isBouncyLabel);
        this.windowContent.appendChild(bounceSettings);
        this.windowContent.appendChild(frictionSettings);

        this.windowContent.addEventListener("input", () => {
            this.saveSettings()
        })
    }

    saveSettings() {
        settings.gameloop = this.isGameloop.checked
        settings.bounce_factor = this.bounceSlider.value * 0.01
        settings.friction = (100 - this.frictionSlider.value) * 0.01
        /*for (let program of runningPrograms) {
            if (typeof program.makeDraggable === 'function') {
                program.makeDraggable()
            }
        }*/

        if (settings.gameloop) { startLoop() }

        else { stopLoop() }
    }

    run() {
        super.run();
    }
}

programManager.programClasses["Settings"] = Settings