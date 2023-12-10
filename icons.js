// Get all icon elements
var icons = document.getElementsByClassName("icon");


// Loop through the elements and make them draggable
for (var i = 0; i < icons.length; i++) {
  var icon = icons[i];

  
  console.log(icon)
}





//Select or open the icon
document.addEventListener('dblclick', e => {

    var icon = e.target.closest('.icon')
	if (icon) {
        
	}
});

document.addEventListener('click', e => {

    var icon = e.target.closest('.icon')
    var desktop = e.target.closest('#Desktop')
	if (icon) {
        var isSelected = icon.classList.contains("icon-selected")
        if(isSelected){
            icon.classList.remove("icon-selected")
        }
        else{
            icon.classList.add("icon-selected")
        }
	}
    else if(desktop){
        for (var i = 0; i < icons.length; i++) {
          var icon = icons[i];
          var isSelected = icon.classList.contains("icon-selected")
          if(isSelected){
              icon.classList.remove("icon-selected")
          }
          
        }
    }
});