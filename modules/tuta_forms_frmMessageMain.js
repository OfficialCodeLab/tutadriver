if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmMessageMain = function() {
// initialize controller 
  tuta.forms.frmMessageMain = new tuta.controller(frmMessageMain); 

  // Initialize form events	
  tuta.forms.frmMessageMain.onInit = function(form) {
      
    
      	
      /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  
  
  tuta.forms.frmMessageMain.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function(button){tuta.forms.frm004Home.show();};

    //this.control("btnContinue").onClick = function(button){tuta.mobile.alert("TEST", "TEST");};
  };
  
  tuta.forms.frmMessageMain.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

