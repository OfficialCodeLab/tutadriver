if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmAboutTuta = function() {
// initialize controller 
  tuta.forms.frmAboutTuta = new tuta.controller(frmAboutTuta); 

  // Initialize form events	
  tuta.forms.frmAboutTuta.onInit = function(form) {
      
  };  
  
  tuta.forms.frmAboutTuta.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function(button){tuta.forms.frm004Home.show();};
  };
  
  tuta.forms.frmAboutTuta.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

