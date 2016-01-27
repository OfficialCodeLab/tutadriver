if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmMessageRead = function() {
// initialize controller 
  tuta.forms.frmMessageRead = new tuta.controller(frmMessageRead); 

  // Initialize form events	
  tuta.forms.frmMessageRead.onInit = function(form) {
  };  
  
  tuta.forms.frmMessageRead.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function(button){kony.application.getPreviousForm().show();};
    
    //tuta.map.stopMapListener();

  };
  
  tuta.forms.frmMessageRead.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

