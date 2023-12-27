// You can choose to have an element with the class "window-top" inside of your draggable window that will act as the "handle" for the window or it will attach to the element itself

function makeDraggable (element) {
    // Make an element draggable (or if it has a .window-top class, drag based on the .window-top element)
    let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;
    
		// If there is a window-top classed element, attach to that element instead of full window
    if (element.querySelector('.window-top')) {
        // If present, the window-top element is where you move the parent element from
        element.querySelector('.window-top').onmousedown = dragMouseDown;
    } 
    else {
        // Otherwise, move the element itself
        element.onmousedown = dragMouseDown;
    }


    function dragMouseDown (e) {
        if(!element.classList.contains("large-size")){
            // Prevent any default action on this element (you can remove if you need this element to perform its default action)
            e.preventDefault();
            // Get the mouse cursor position and set the initial previous positions to begin
            previousPosX = e.clientX;
            previousPosY = e.clientY;
            // When the mouse is let go, call the closing event
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves
            document.onmousemove = elementDrag;

        }
    }

    function elementDrag (e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Calculate the new cursor position by using the previous x and y positions of the mouse
        currentPosX = previousPosX - e.clientX;
        currentPosY = previousPosY - e.clientY;
        // Replace the previous positions with the new x and y positions of the mouse
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - currentPosY) + 'px';
        element.style.left = (element.offsetLeft - currentPosX) + 'px';
    }

    function closeDragElement () {
        // Stop moving when mouse button is released and release events
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function moveToTop(element){
    lastIndex = element.style.zIndex
    element.style.zIndex = windows.length
                    
    for (var i = 0; i < windows.length; i++) {
        var wind = windows[i];
        
        if(wind.style.zIndex>=lastIndex){
            var newIndex = wind.style.zIndex-1
            wind.style.zIndex = newIndex
        }
    }
        
    
}

// Get all window elements
var windows = document.getElementsByClassName("window");


// Loop through the elements and make them draggable
for (var i = 0; i < windows.length; i++) {
  var wind = windows[i];
  
  wind.style.zIndex = i
  makeDraggable(wind)
}





//Close the window on click of a red button
document.addEventListener('click', e => {

    var redButton = e.target.closest('.round.red')
    var yellowButton = e.target.closest('.round.yellow')
    var wind = e.target.closest('.window')
    if(wind){
        moveToTop(wind)
    }
	if (redButton) {
		wind.remove();
        wind = document.getElementsByClassName("window");
	}
	else if (yellowButton) {
        var isLarge = wind.classList.contains("large-size")
        if (isLarge) {
            wind.classList.remove("large-size");
        } else {
            wind.classList.add("large-size");
        }
	}
});


document.addEventListener('mousedown', e => {

    var wind = e.target.closest('.window')
    if(wind){
        moveToTop(wind)
    }
    console.log(wind)
});
