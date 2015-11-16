if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frm001LoginScreen = function() {
// initialize controller 
  tuta.forms.frm001LoginScreen = new tuta.controller(frm001LoginScreen); 

  // Initialize form events	
  tuta.forms.frm001LoginScreen.onInit = function(form) {
      
  };  
  
  tuta.forms.frm001LoginScreen.onPreShow = function(form) {
    var self = this;
    
    this.moveLoginButtons = new tuta.controls.menu( 
      this.control("flexMainButtons"),
      this.control("flexLoginButtons"), 
      tuta.controls.position.RIGHT, 
      tuta.controls.behavior.MOVE_OVER, 
      0.3
    );
    
    this.control("btnLogin").onClick = function(button){self.moveLoginButtons.toggle();};
    
    this.control("btnLogin2").onClick = function(button){self.moveLoginButtons.toggle();tuta.forms.frm003CheckBox.show();};
  };
  
  tuta.forms.frm001LoginScreen.onPostShow = function(form) {
    var self = this;
  };
};
