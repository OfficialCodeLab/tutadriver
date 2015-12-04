if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmTripHistory = function() {
// initialize controller 
  tuta.forms.frmTripHistory = new tuta.controller(frmTripHistory); 

  // Initialize form events	
  tuta.forms.frmTripHistory.onInit = function(form) {
      
    
      	
      /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  
  
  tuta.forms.frmTripHistory.onPreShow = function(form) {
    var self = this;
    
    this.control("btnBack").onClick = function(button){tuta.forms.frm004Home.show();};
    this.control("segTripHistoryMain").onRowClick = function(button) {tuta.forms.frmTripHistoryInfo.show();};
    //this.control("btnContinue").onClick = function(button){tuta.mobile.alert("TEST", "TEST");};
  };
  
  tuta.forms.frmTripHistory.onPostShow = function(form) {
    var self = this;
    frmTripHistory.lblStatus.text = "Loading, please wait...";
    tuta.animate.move(frmTripHistory.flexLoading, 0, 0, 0, null);
    tuta.events.loadTripHistory(function(response, error){
      if(response !== null ){
        tuta.animate.move(frmTripHistory.flexLoading, 0, 0, "100%", null);
      } else{
        frmTripHistory.lblStatus.text = error;
      }
    });
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

