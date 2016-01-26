if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmLogIssue = function() {
// initialize controller 
  tuta.forms.frmLogIssue = new tuta.controller(frmLogIssue); 

  // Initialize form events	
  tuta.forms.frmLogIssue.onInit = function(form) {
  };  
  
  tuta.forms.frmLogIssue.onPreShow = function(form) {
    var self = this;
    tuta.map.stopMapListener();

    this.control("btnBack").onClick = function(button){kony.application.getPreviousForm().show();};
    this.control("btnBack").onClick = function (button) {tuta.forms.frm004Home.show();};
    this.control("btnCancel").onClick = function (button) {tuta.forms.frm004Home.show();};
    this.control("btnSubmitIssue").onClick = function (button) {
      tuta.events.logIssue();
      tuta.forms.frm004Home.show();
    };
    
  };
  
  tuta.forms.frmLogIssue.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

