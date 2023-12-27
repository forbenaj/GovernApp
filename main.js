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



function mainLoop() {

    if(!animRunning){return}

    if (settings.gameloop) {
        for (let program of runningPrograms) {
            if (typeof program.update === 'function') {
                program.update()
            }
        }
    }



    requestAnimationFrame(mainLoop);
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
    gameloop: true,
    friction: 0.98,
    bounce_factor: 0.7
}

function getRandomPosition(){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * screenWidth);
    const randomY = Math.floor(Math.random() * screenHeight);

    return {x:randomX,y:randomY}
}

startLoop()