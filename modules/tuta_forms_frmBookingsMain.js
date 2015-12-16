if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmBookingsMain = function() {
// initialize controller 
  tuta.forms.frmBookingsMain = new tuta.controller(frmBookingsMain); 

  // Initialize form events	
  tuta.forms.frmBookingsMain.onInit = function(form) {
      

  };  
  
  tuta.forms.frmBookingsMain.onPreShow = function(form) {
    var self = this;
    this.control("btnBack").onClick = function(button){tuta.forms.frm004Home.show();};
    this.control("segBookings").onRowClick = function(button) {tuta.forms.frmBooking.show();};


    //this.control("btnContinue").onClick = function(button){tuta.mobile.alert("TEST", "TEST");};
  };
  
  tuta.forms.frmBookingsMain.onPostShow = function(form) {
    var self = this;
    
    tuta.events.loadAllBookings();
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

