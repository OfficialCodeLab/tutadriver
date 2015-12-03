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
    this.control("btnStartTrip").onClick = function (button) {flagDownRequest(frmFlagDown);};
    this.control("btnCancelTrip").onClick = function (button) {tuta.forms.frm004Home.show();};
    this.control("btnCloseAddress").onClick = function(button){
      frmFlagDown.flexFindingDest.setVisibility(false);
      frmFlagDown.flexAddressList.setVisibility(false);
      frmFlagDown.flexAddressShadow.setVisibility(false);
      frmFlagDown.flexCloseAddress.setVisibility(false);


    };
    this.control("segAddressList").onRowClick = function (button) {
      onLocationSelected(frmFlagDown);
      
      frmFlagDown.flexCloseAddress.setVisibility(false);
      var tempUser = frmFlagDown.txtCustomerName.text;
      frmFlagDown.txtCustomerName.text = "";
      tuta.forms.frm004Home.show();
      tuta.createBooking(tempDestination, tempUser);
      //tuta.mobile.alert("ADDRESS", JSON.stringify(tempDestination));

    };

  };
  
  tuta.forms.frmFlagDown.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

function flagDownRequest (form){
  //tuta.fsm.stateChange(tuta.fsm.REQUESTS.FLAG_DOWN);
  // SHOW THE SEGMENT
  if (form.txtCustomerName.text  !== null && form.txtDest.text  !== null && form.txtCustomerName.text  !== "" && form.txtDest.text  !== "") {
  	selectDest(form);
    form.flexCloseAddress.setVisibility(true);
  }
  else {
    tuta.util.alert("Required Details", "Please fill in details");
  }
  //COPY segAddressList and the shadow flex container
  //Change bottom text field's name to txtDest
  //COPY flexChangeDest
  
  //IF STATEMENT TO CHECK TEXT FIELDS
  
  
  
  //tuta.forms.frm004Home.show();
  //tuta.mobile.alert("Idle", "Taxi is now idle and picking up client");
}