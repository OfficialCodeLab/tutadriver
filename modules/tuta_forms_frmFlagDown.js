if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmFlagDown = function() {
// initialize controller 
  tuta.forms.frmFlagDown = new tuta.controller(frmFlagDown); 

  // Initialize form events	
  tuta.forms.frmFlagDown.onInit = function(form) {
  };  
  
  tuta.forms.frmFlagDown.onPreShow = function(form) {
    var self = this;
    this.control("btnStartTrip").onClick = function (button) {flagDownRequest();};
    this.control("btnCancelTrip").onClick = function (button) {tuta.forms.frm004Home.show();};
    
  };
  
  tuta.forms.frmFlagDown.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

function flagDownRequest (){
  var oldState = driver_state;
  tuta.fsm.stateChange(tuta.fsm.REQUESTS.FLAG_DOWN);

  if(oldState !== driver_state)
  {
    frm004Home.show();
    tuta.mobile.alert("Idle", "Taxi is now idle and picking up client");
  }
  else{
    frm004Home.show();
    tuta.mobile.alert("ERROR", "Taxi is idle and cannot recieve flag down requests"); 
    //tuta.mobile.alert("ERROR", "Cannot accept flag downs while idle");
  }
    //tuta.mobile.alert("STATE CHANGE", "" + driver_state);
};