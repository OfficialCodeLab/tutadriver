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
  };  
  
  tuta.forms.frmMessageMain.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function(button){tuta.forms.frm004Home.show();};
    this.control("btnComposeMessage").onClick = function(button){tuta.forms.frmMessageCompose.show();};
    this.control("btnBack").onClick = function(button){tuta.forms.frm004Home.show();};
    
	this.control("txtSearch").onTextChange = function(widget) {
      
      if (frmMessageMain.txtSearch.text.length === 0) {
        
        frmMessageMain.imgSearchIcon.setVisibility(true);
        
      }
      else if (frmMessageMain.txtSearch.text.length > 0) {
        
        frmMessageMain.imgSearchIcon.setVisibility(false);
      }
    };

  };//END of OnPreShow
  
  tuta.forms.frmMessageMain.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

