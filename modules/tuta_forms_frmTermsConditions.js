if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmTermsConditions = function() {
// initialize controller 
  tuta.forms.frmTermsConditions = new tuta.controller(frmTermsConditions); 

  // Initialize form events	
  tuta.forms.frmTermsConditions.onInit = function(form) {
      
    
      	
      /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  
  
  tuta.forms.frmTermsConditions.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function(button){kony.application.getPreviousForm().show();};
    //tuta.map.stopMapListener();

    //this.control("btnContinue").onClick = function(button){tuta.mobile.alert("TEST", "TEST");};
  };
  
  tuta.forms.frmTermsConditions.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

