if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmTripHistoryInfo = function() {
// initialize controller 
  tuta.forms.frmTripHistoryInfo = new tuta.controller(frmTripHistoryInfo); 

  // Initialize form events	
  tuta.forms.frmTripHistoryInfo.onInit = function(form) {
    
  	
   
    
      	
      /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  
  
  tuta.forms.frmTripHistoryInfo.onPreShow = function(form) {
    var self = this;
    
    this.control("btnBack").onClick = function(button){kony.application.getPreviousForm().show();};
    this.control("btnHelp").onClick = function(button) {tuta.forms.frmLogIssue.show();};
    frmTripHistoryInfo.flexNoPanning.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, GLOBAL_GESTURE_FINGERS_1,  function(widget, gestureInformationSwipe) {
  	});
    //this.control("btnContinue").onClick = function(button){tuta.mobile.alert("TEST", "TEST");};
    //tuta.map.stopMapListener();
  };
  
  tuta.forms.frmTripHistoryInfo.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

