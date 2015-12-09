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
    
    //#ifdef android
	this.control("txtSearch").onTextChange = function(widget) {
      
      if (frmMessageMain.txtSearch.text.length === 0) {
        
        frmMessageMain.imgSearchIcon.setVisibility(true);
        
      }
      else if (frmMessageMain.txtSearch.text.length > 0) {
        
        frmMessageMain.imgSearchIcon.setVisibility(false);
      }
    };
    //#endif
    
    
    //#ifdef iphone
	this.control("txtSearch").onBeginEditing = function(widget) {
        frmMessageMain.imgSearchIcon.setVisibility(false);
    };
    
    this.control("txtSearch").onEndEditing = function (widget) {
      if(frmMessageMain.txtSearch.text.length === 0)
      	frmMessageMain.imgSearchIcon.setVisibility(true);
    };
    //#endif

  };//END of OnPreShow
  
  tuta.forms.frmMessageMain.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

var messageList = [];
function loadMessages(){
  tuta.getMessages(function(success, error){
    if(error === undefined){
      var tempMessageList = success;
      //Split the list by whether the message is read or not (ie status = 0)
      
      //Take the half of the array that contains unread messages and assign imgStatus and imgDot to the unread state and vice versa
      
      //Join the arrays to messageList
      
      frmMessageMain.segMessages.widgetDataMap = { "lblFrom"  : "sender", "lblTime" : "time", "lblTextPreview" : "textShortened", "imgMessageStatus" : "imgStatus", "imgEllipse" : "imgDot"};
      frmMessageMain.segMessages.setData(messageList);
    }
  });
}

