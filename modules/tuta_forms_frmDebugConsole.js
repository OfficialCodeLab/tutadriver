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
    tuta.map.stopMapListener();
    
    self.control("txtConsoleEditable").text = staticMapImageResource + "&key=" + "AIzaSyAiiKudEobnRQW6YIOHVOcbcMxN-l0iaEA";

    this.control("btnBack").onClick = function(button) {
      kony.application.getPreviousForm().show();
    };

    this.control("btnSetImage").onClick = function(button) {
      //self.control("imgDebugOutput").src = staticMapImageResource + ".png"; //+ "&key=" + "AIzaSyAiiKudEobnRQW6YIOHVOcbcMxN-l0iaEA";
      self.control("imgDebugOutput").src = self.control("txtConsoleEditable").text;
    };
    this.control("btnApiImage").onClick = function(button) {
      self.control("txtConsoleEditable").text = staticMapImageResource;
      self.control("imgDebugOutput").src = staticMapImageResource;
    };
    this.control("btnImgurImage").onClick = function(button) {
      self.control("txtConsoleEditable").text = "http://i.imgur.com/B5LkNwg.jpg";
      self.control("imgDebugOutput").src = "http://i.imgur.com/B5LkNwg.jpg";
    };
    tuta.map.stopMapListener();
    
  };
  
  tuta.forms.frmDebugConsole.onPostShow = function(form) {
    var self = this;

  };
};



//This is the individual bookings item form