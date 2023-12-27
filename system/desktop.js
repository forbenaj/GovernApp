class Desktop {
    constructor(){

        let desktop = document.createElement("div")
        desktop.id = "Desktop"
        for (let programName of programList) {
    
            let icon = document.createElement("div")
            let image = document.createElement("div")
            let text = document.createElement("div")
            
    
            icon.ondblclick = () => initProgram(programName)
            icon.id = "consoleIcon"
            icon.className = "icon"
    
            image.className = "icon-image"
    
            text.className = "icon-text"
            text.innerHTML = programName
    
            icon.appendChild(image)
            icon.appendChild(text)
    
            desktop.appendChild(icon)
    
        }
        document.body.appendChild(desktop)

        var icons = document.getElementsByClassName("icon");

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

    }
    
    /*initialize() {
    }*/
}
