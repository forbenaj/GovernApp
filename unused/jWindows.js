// New window: show and bring to top
function newWindow(element) {
    $(element).show();
    $(element).selectWindow();

    if (element == '#doom') {
    	loadDoom();
    }
}


// Load DOOM, because we can
function loadDoom() {
	$.getScript('https://js-dos.com/6.22/current/js-dos.js', function() {
		Dos(document.getElementById("doomcanvas"), {
	        wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
	        cycles: 1000,
	        autolock: false,
	    }).ready(function (fs, main) {
	      fs.extract("https://js-dos.com/cdn/upload/DOOM-@evilution.zip").then(function () {
	        main(["-c", "cd DOOM", "-c", "DOOM.EXE"]).then(function (ci) {
	            window.ci = ci;
	        });
	      });
	    });
	});
}



$( document ).ready(function() {
    setupWindow($( ".window" ))
} );

function setupWindow(e){
    
    // Window drag
    e.draggable({ handle: "div.window-top" });

    // Window resize
    e.resizable({ handles: "all", alsoresize: ".window-content" });

    // Window close
    //$('.windowclose').on("dblclick", function () { $(this).parents('div.window').hide(); });
    e.on("click", ".close:first", function () {
        $(this).closest('.window').remove();
    });
    

    // Window click-to-bring-to-top
    (function() {
        var highest = 100;

        $.fn.selectWindow = function() {
            // Make top
            this.css('z-index', ++highest);
            // Make this window selected and others not
            this.addClass('selectedwindow');
            e.not(this).each(function(){
                $(this).removeClass('selectedwindow');
             });
        };
    })();
    e.mousedown(function() {
        $(this).selectWindow();
    });

    // Icon single click
    $('.icon').click(function() {
      $(this).find('p').toggleClass('highlight');
    });

}