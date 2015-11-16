if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmMessageCompose = function() {
// initialize controller 
  tuta.forms.frmMessageCompose = new tuta.controller(frmMessageCompose); 

  // Initialize form events	
  tuta.forms.frmMessageCompose.onInit = function(form) {
    var self = this;
      
    
      	
      /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  
  
  tuta.forms.frmMessageCompose.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function (button) {tuta.forms.frmMessageMain.show();};
    this.control("btnSend").onClick = function (button){
      frmMessageCompose.txtMessage.text = "";
      frmMessageCompose.txtSendTo.text = "";
      frmMessageCompose["flexMessageSent"]["isVisible"] = true;    
    };
  };
  
  tuta.forms.frmMessageCompose.onPostShow = function(form) {
    var self = this;

  };
};

