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
    tuta.map.stopMapListener();
    this.control("btnStartTrip").onClick = function (button) {
      if(flagdownComplete === true){
        if (form.txtCustomerName.text  !== null && form.txtCustomerName.text) {
          frmFlagDown.txtDest.text = "";
          frmFlagDown.txtCustomerName.text = "";
          tuta.forms.frm004Home.show();
          tuta.createBooking(destination, tempUser);
        }
        else {
          tuta.util.alert("Required Details", "Please fill in details");
        }
      }
      else{
        flagDownRequest(frmFlagDown);
      }
      
      
    };
    this.control("btnCancelTrip").onClick = function (button) {tuta.forms.frm004Home.show();};
    this.control("btnCloseAddress").onClick = function(button){
      frmFlagDown.flexFindingDest.setVisibility(false);
      frmFlagDown.flexAddressList.setVisibility(false);
      frmFlagDown.flexAddressShadow.setVisibility(false);
      frmFlagDown.flexCloseAddress.setVisibility(false);
      frmFlagDown.txtDest.text = "";
      frmFlagDown.lblTripPrice.text = "-";
    };
    
    this.control("txtDest").onDone = function (widget){
      flagDownRequest(frmFlagDown);
    };
    
    this.control("segAddressList").onRowClick = function (button) {
      onLocationSelected(frmFlagDown);

      frmFlagDown.flexCloseAddress.setVisibility(false);
      tempUser = frmFlagDown.txtCustomerName.text;
      flagdownComplete = true;
      var compositeCost = "";
      var locA = [{lat: currentPos.geometry.location.lat, lon: currentPos.geometry.location.lng}];
      var locB = [{lat: destination.geometry.location.lat, lon: destination.geometry.location.lng}];
      estimateTripCost(locA, locB, function(costMin, costMax){
		compositeCost = "R" + costMin + " - R" + costMax;
        frmFlagDown.lblTripPrice.text = compositeCost;
      });
      //tuta.mobile.alert("ADDRESS", JSON.stringify(tempDestination));

    };
    
    
    
    this.control("btnChangeDest").onClick = function(){
      frmFlagDown.flexFindingDest.setVisibility(false);
      frmFlagDown.flexAddressList.setVisibility(false);
      frmFlagDown.flexAddressShadow.setVisibility(false);
      frmFlagDown.flexCloseAddress.setVisibility(false);
      frmFlagDown.txtDest.setFocus(true);
    };

      frmFlagDown.flexAddressList.setVisibility(false);
  };

  tuta.forms.frmFlagDown.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
    flagdownComplete = false;
    frmFlagDown.txtCustomerName.text = "";
    frmFlagDown.txtDest.text = "";
    frmFlagDown.lblTripPrice.text = "-";
  };
};

function flagDownRequest (form){
  //tuta.fsm.stateChange(tuta.fsm.REQUESTS.FLAG_DOWN);
  // SHOW THE SEGMENT
  if (form.txtDest.text  !== null && form.txtDest.text  !== "") {
  	selectDest(form);
    form.flexCloseAddress.setVisibility(true);
  }
  else {
    //tuta.util.alert("Required Details", "Please fill in details");
  }
  //COPY segAddressList and the shadow flex container
  //Change bottom text field's name to txtDest
  //COPY flexChangeDest
  
  //IF STATEMENT TO CHECK TEXT FIELDS
  
  
  
  //tuta.forms.frm004Home.show();
  //tuta.mobile.alert("Idle", "Taxi is now idle and picking up client");
}