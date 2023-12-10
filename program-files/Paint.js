class Paint extends Program {
    constructor() {
        super()
        this.name = "Paint"
        this.window;
        this.windowContent;
        this.width = "500";
        this.height = "500";
        this.top = "20%";
        this.left = "20%";
        this.canvas;
    }

    createWindow() {
        super.createWindow()

        this.canvas = document.createElement('canvas');
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.windowContent.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = "black"
        this.context.fillStyle = "white"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

    }

    startDrawing(e) {
        this.isDrawing = true;
        this.context.beginPath();

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.context.moveTo(x, y);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.context.lineTo(x, y);
        this.context.stroke();
    }

    stopDrawing() {
        this.isDrawing = false;
    }


    run() {
        super.run();
    }
}

programInstances["Paint"] = new Paint()