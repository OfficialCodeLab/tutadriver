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
    //tuta.map.stopMapListener();
    
    this.control("btnBack").onClick = function (button) {tuta.animate.move(frmMessageCompose.flexMessageSent, 0, 0, "100%", null);kony.application.getPreviousForm().show();};
    this.control("btnMsgPopup").onClick = function(button) {tuta.animate.move(frmMessageCompose.flexMessageSent, 0, 0, "100%", null);};
    this.control("btnSend").onClick = function (button){
      var to;
      if(frmMessageCompose.lblHeaderTitle.text === "Reply"){
        to = frmMessageCompose.lblSender.text;        
      }
      else{
        to = trimInput(frmMessageCompose.txtSendTo.text);
      }
      
      tuta.createMessage(to, frmMessageCompose.txtMessage.text, function(success, error){
        if(error === undefined){
          frmMessageCompose.txtMessage.text = "";
          frmMessageCompose.txtSendTo.text = "";
          //frmMessageCompose["flexMessageSent"]["isVisible"] = true;   
          tuta.animate.move(frmMessageCompose.flexMessageSent, 0, 0, 0, null);
        }
      });
    };
  };
  
  tuta.forms.frmMessageCompose.onPostShow = function(form) {
    var self = this;

  };
};

// Trim helper
var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

