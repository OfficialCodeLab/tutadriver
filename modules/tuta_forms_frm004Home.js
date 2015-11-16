if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frm004Home = function() {
// initialize controller 
  tuta.forms.frm004Home = new tuta.controller(frm004Home); 

  // Initialize form events	
  tuta.forms.frm004Home.onInit = function(form) {
      
  };  
  
  tuta.forms.frm004Home.onPreShow = function(form) {
    var self = this;

    //Initializes the cheeseburger menu
    this.leftMenu = new tuta.controls.menu(
          this.control("flexMapScreen"), 
          this.control("flexMenu"), 
          tuta.controls.position.LEFT,
          tuta.controls.behavior.MOVE_OVER,
          0.3
      );	
    
    /*
      Checks whether the menu is open, animates the menu
      based on current state.
    */
    this.control("btnChs").onClick = function(button) {
      menuToggle(0.3, self.leftMenu._open);     
      self.leftMenu.toggle();
    };
    
    //Buttons for showing other forms
    this.control("btnLegal").onClick = function (button) {tuta.forms.frmTermsConditions.show();};
    this.control("btnFlagDown").onClick = function (button) {tuta.forms.frmFlagDown.show();};
    this.control("btnTestingPickup").onClick = function (button) {tuta.forms.frmPickupRequest.show();};
    this.control("btnSignOut").onClick = function (button) {tuta.forms.frm001LoginScreen.show();};

    //Toggles visibility for destination search bar
    this.control("txtDest").onDone = function(widget) {
      if(frm004Home.txtDest.text != null){
        frm004Home.flexFindingDest.setVisibility(true);
        //tuta.mobile.alert("Search", "Search Done");
        selectDest(frm004Home);      
      }
    };

    //Handles tapping on the map
    this.control("mapMain").onClick = function(map, location) {
      frm004Home.flexAddressList.setVisibility(false);
      frm004Home.flexAddressShadow.setVisibility(false);
      //kony.timer.schedule("showMarker", function(){frmMap["flexChangeDest"]["isVisible"] = true;}, 0.3, false);
      //resetSearchBar();
      searchMode = 0;
      updateConsole();
    };

  //Handles toggling button for the debug menu
  this.control("btnToggleActive").onClick = function(button){
    if(driver_state === tuta.fsm.STATES.TRAWLING)
    {
      tuta.animate.move(frm004Home.imgSwitch, 0.2, "", "38", null);
      tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
      frm004Home.imgSwitchBg.src = "switchbgoff.png";
      updateConsole();
    }
    else if(driver_state === tuta.fsm.STATES.IDLE)
    {
      tuta.animate.move(frm004Home.imgSwitch, 0.2, "", "0", null);
      tuta.fsm.stateChange(tuta.fsm.REQUESTS.ACTIVE);
      frm004Home.imgSwitchBg.src = "switchbgon.png";
      updateConsole();
    }
  };

  //Debug Menu: Demonstration button
  this.control("btnDemo").onClick = function (button) {tuta.forms.frmPickupRequest.show();};

  //Debug Menu: Pickup Request Checkbox
  this.control("btnPickupReqCheck").onClick = function(button){
    if(frm004Home.imgPickReqCheck.isVisible === true){
      frm004Home.imgPickReqCheck.setVisibility(false)
      frm004Home.btnDemo.setVisibility(false);
      frm004Home.flexDemoShadow.setVisibility(false);
    }
    else{
      frm004Home.imgPickReqCheck.setVisibility(true)
      frm004Home.btnDemo.setVisibility(true);
      frm004Home.flexDemoShadow.setVisibility(true);
    }
  };

  //Debug Menu: Handler for the floating console
  this.control("btnFloatingConsoleCheck").onClick = function(button){
    if(frm004Home.imgFloatingConsoleCheck.isVisible === true){
      frm004Home.imgFloatingConsoleCheck.setVisibility(false);
      frm004Home["flexFloatingConsole"]["isVisible"] = false;
    }
    else{
      frm004Home.imgFloatingConsoleCheck.setVisibility(true);
      frm004Home["flexFloatingConsole"]["isVisible"] = true;
      updateConsole();
    }
  };

  //Debug Menu: Reset state button
  this.control("btnResetState").onClick = function(button){
    tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
    tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
    frm004Home.imgSwitchBg.src = "switchbgoff.png";
    driver_state = 0;
    frm004Home.flexActive.setVisibility(true);
    updateConsole();
  };

  //Show Customer Rating Button
  this.control("btnShowCustRating").onClick = function(button){    
    frm004Home.flexDarken.setVisibility(false);
    tuta.animate.move(frm004Home.flexDebugOptions, 0.3, "10%", "-160%", null); 
    kony.timer.schedule("custrate", function(){frm004Home["flexOverlay1"]["isVisible"] = true;
                                              }, 0.35, false);
  };
    
    this.control("btnMessage").onClick = function(button){
      menuToggle(0, self.leftMenu._open);     
      self.leftMenu.toggle();
      tuta.forms.frmMessageMain.show();
    };
    this.control("btnBooking").onClick = function(button){
      menuToggle(0, self.leftMenu._open);     
      self.leftMenu.toggle();
      tuta.forms.frmBookingsMain.show();
    };
    this.control("btnHelp").onClick = function(button){
      menuToggle(0, self.leftMenu._open);     
      self.leftMenu.toggle();
      tuta.forms.frmLogIssue.show();
    };
    this.control("btnTripHistory").onClick = function(button){
      menuToggle(0, self.leftMenu._open);     
      self.leftMenu.toggle();
      tuta.forms.frmTripHistory.show();
    };
    this.control("btnAboutMenu").onClick = function(button){
      menuToggle(0, self.leftMenu._open);     
      self.leftMenu.toggle();
      tuta.forms.frmAboutTuta.show();
    };

  //Activate Taxi?
  this.control("btnTaxiActivateCheck").onClick = function(button){
    if(frm004Home.imgTaxiActivateCheck.isVisible === true){
      frm004Home.imgTaxiActivateCheck.setVisibility(false);
      frm004Home.flexActive.setVisibility(false);
    }
    else{
      frm004Home.imgTaxiActivateCheck.setVisibility(true);
      frm004Home.flexActive.setVisibility(true);
    }
  };

  //Sign-out button
  this.control("btnSignOut").onClick = function (button) {
    tuta.forms.frm001LoginScreen.show();
  };
};
  //PostShow does not work on android
  tuta.forms.frm004Home.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

