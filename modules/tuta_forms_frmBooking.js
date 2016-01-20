if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmBooking = function() {
// initialize controller 
  tuta.forms.frmBooking = new tuta.controller(frmBooking); 

  // Initialize form events	
  tuta.forms.frmBooking.onInit = function(form) {
      

  };  
  
  tuta.forms.frmBooking.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function(button){tuta.forms.frmBookingsMain.show();};
    this.control("btnHelp").onClick = function (button) {tuta.forms.frmLogIssue.show();};
    tuta.map.stopMapListener();
  };
  
  tuta.forms.frmBooking.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};



//This is the individual bookings item form