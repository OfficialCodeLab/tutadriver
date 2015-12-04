if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmDebugConsole = function() {
// initialize controller 
  tuta.forms.frmDebugConsole = new tuta.controller(frmDebugConsole); 

  // Initialize form events	
  tuta.forms.frmDebugConsole.onInit = function(form) {
      

  };  
  
  tuta.forms.frmDebugConsole.onPreShow = function(form) {
    var self = this;

  };
  
  tuta.forms.frmDebugConsole.onPostShow = function(form) {
    var self = this;

  };
};



//This is the individual bookings item form