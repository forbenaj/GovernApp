/* Acá está todo un quilombo, con funciones que probablemente no deberían estar acá.
Ésto se tiene que refactorizar entero. */




// Las leyes que se están debatiendo en éste momento en Chamber. Probablemente debería ser una variable de Chamber, ya lo cambiaremos.
var debatingLaws = []

// Lista de senadores. Lo mismo.
var senadores = []/*["red", "blue", "blue", "blue", "red", "red", "blue", "red", "red", "blue",
"red", "blue", "blue", "blue", "red", "red", "blue", "red", "red", "blue",
"red", "blue", "blue", "blue", "red", "red", "blue", "red", "red", "blue"]*/

// Llena la lista de senadores con número de senadores al azar por cada color. En el juego, debería ser un número fijo por cada mandato.
for(i=0;i<30;i++){
    let random = Math.floor(Math.random()*2)
    let color = random == 1? "red":"blue"
    senadores.push(color)
}




// Bandera de animación.
var animRunning = false


// El loop principal.
function mainLoop() {

    if(!animRunning){return} // Antes de arrancar, chequea si está prendida la animación.

    // Medio irrelevante que esté la variable "gameloop".
    // Básicamente, si está prendido el gameloop, los programas ejecutan su función update.
    if (settings.gameloop) {
        for (let program of runningPrograms) {
            if (typeof program.update === 'function') {
                program.update()
            }
        }
    }


    requestAnimationFrame(mainLoop);
}


// Funciones para arrancar y frenar el loop.
function startLoop() {
    if (!animRunning) {
        animRunning = true
        mainLoop()
    }
}

function stopLoop() {
    animRunning = false
}


// Variable global de configuración. Es lo que modifica el programa Settings.
var settings = {
    gameloop: true,
    friction: 0.98,
    bounce_factor: 0.7
}

// Función para tomar una posición random en la pantalla.
function getRandomPosition(){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * screenWidth);
    const randomY = Math.floor(Math.random() * screenHeight);

    return {x:randomX,y:randomY}
}

// Arranca el loop
startLoop()

/* 

Ojalá no haya sido un embole. Está muyyy enquilombado y hay varias cosas
del funcionamiento del sistema operativo que no están bien definidas,
menos todavía del juego mismo.

Falta comentar casi todos los demás programas, así que lo voy a hacer sobre la marcha.

El CSS me rompió bastante los huevos así que no renegué mucho, está casi igual.

Podés modificar literalmente lo que se te de la gana. Si te da cosa de última hacé un nuevo branch.

Te mando un saludónnnn y sigamos haciendo jueguitos!!

*/