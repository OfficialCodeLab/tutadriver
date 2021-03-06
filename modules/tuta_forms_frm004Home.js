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
    //tuta.map.stopMapListener();

    this.control("imgStar1").onTouchStart = onStarSelect;
    this.control("imgStar2").onTouchStart = onStarSelect;
    this.control("imgStar3").onTouchStart = onStarSelect;
    this.control("imgStar4").onTouchStart = onStarSelect;
    this.control("imgStar5").onTouchStart = onStarSelect;
    star.push(frm004Home.imgStar1);
    star.push(frm004Home.imgStar2);
    star.push(frm004Home.imgStar3);
    star.push(frm004Home.imgStar4);
    star.push(frm004Home.imgStar5);

    //Initializes the cheeseburger menu
    this.leftMenu = new tuta.controls.menu(
      this.control("flexMapScreen"),
      this.control("flexMenu"),
      tuta.controls.position.LEFT,
      tuta.controls.behavior.MOVE_OVER,
      0.15
    );


    //Initializes the user's name
    //frm004Home.profileName.text = globalCurrentUser.userName;
    //tuta.util.alert("Test", globalCurrentUser);
    var csinput = {
      id: globalCurrentUser.userName
    };
    application.service("userService").invokeOperation(
      "user", {}, csinput,
      function(result) {
        var firstName = result.value[0].userInfo.firstName;
        var lastName = result.value[0].userInfo.lastName;
        var fullName = firstName + " " + lastName;
        var avatarBase64 = result.value[0].userInfo.avatarDocId;
        frm004Home.lblProfileName.text = fullName;
        if (avatarBase64 !== "null") {
          frm004Home.imgProfilePic.rawBytes = kony.convertToRawBytes(avatarBase64);
        }
      },
      function(error) {
        // the service returns 403 (Not Authorised) if credentials are wrong
        //tuta.util.alert("Error " + error);

      }
    );


    /*
      Checks whether the menu is open, animates the menu
      based on current state.
    */
    this.control("btnChs").onClick = function(button) {
      menuToggle(0.15, self.leftMenu._open);
      self.leftMenu.toggle();
    };

    //Buttons for showing other forms
    this.control("btnLegal").onClick = function(button) {
      menuToggle(0, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmTermsConditions.show();
    };
    this.control("btnFlagDown").onClick = function(button) {
      tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
      tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
      frm004Home.imgSwitchBg.src = "switchbgoff.png";
      tuta.events.updateDriverState("Idle");
      tuta.forms.frmFlagDown.show();
    };
    this.control("btnTestingPickup").onClick = function(button) {
      tuta.forms.frmPickupRequest.show();
    };

    //Toggles visibility for destination search bar
    this.control("txtDest").onDone = function(widget) {
      if (frm004Home.txtDest.text != null) {
        frm004Home.flexFindingDest.setVisibility(true);
        //tuta.mobile.alert("Search", "Search Done");
        selectDest(frm004Home);
      }
    };

    //Handles tapping on the map
    /*
    this.control("mapMain").onClick = function(map, location) {
      frm004Home.flexAddressList.setVisibility(false);
      frm004Home.flexAddressShadow.setVisibility(false);
      //kony.timer.schedule("showMarker", function(){frmMap["flexChangeDest"]["isVisible"] = true;}, 0.3, false);
      //resetSearchBar();
      searchMode = 0;
      //updateConsole();
    };*/

    this.control("btnOptionDebug1").onClick = function() {
      menuToggle(0.3, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmDebug.show();
    };

    //Handles showing of debug menu
    this.control("btnDebugOptions").onClick = function() {
      menuToggle(0.3, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.animate.move(frm004Home.flexDebugOptions, 0.3, "10%", "10%", null);
      kony.timer.schedule("darken_screen", function() {
        frm004Home.flexDarken.setVisibility(true);
      }, 0.31, false);
    };

    //Handles hiding of debug menu
    this.control("btnCloseDebugOptions").onClick = function() {
      frm004Home.flexDarken.setVisibility(false);
      tuta.animate.move(frm004Home.flexDebugOptions, 0.3, "10%", "-160%", null);

    };

    //Handles toggling button for the debug menu
    this.control("btnToggleActive").onClick = function(button) {
      if (driver_state === tuta.fsm.STATES.TRAWLING) {
        tuta.animate.move(frm004Home.imgSwitch, 0.2, "", "38", null);
        tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
        frm004Home.imgSwitchBg.src = "switchbgoff.png";
        tuta.events.timedStateUpdate("Idle", 1);

        //updateConsole();
      } else if (driver_state === tuta.fsm.STATES.IDLE) {
        tuta.animate.move(frm004Home.imgSwitch, 0.2, "", "0", null);
        tuta.fsm.stateChange(tuta.fsm.REQUESTS.ACTIVE);
        frm004Home.imgSwitchBg.src = "switchbgon.png";
        tuta.events.timedStateUpdate("OnDuty", 1);
        //updateConsole();
      }
    };
    this.control("btnMapCenter").onClick = function (button) {
      //Center the map on the user
      var loc = {lat:currentPos.geometry.location.lat,lng:currentPos.geometry.location.lng};
      tuta.map.navigateTo(loc);
    };

    //Debug Menu: Demonstration button
    this.control("btnDemo").onClick = function(button) {
      tuta.forms.frmPickupRequest.show();
    };

    //Debug Menu: Pickup Request Checkbox
    this.control("btnPickupReqCheck").onClick = function(button) {
      if (frm004Home.imgPickReqCheck.isVisible === true) {
        frm004Home.imgPickReqCheck.setVisibility(false)
        frm004Home.btnDemo.setVisibility(false);
        frm004Home.flexDemoShadow.setVisibility(false);
      } else {
        frm004Home.imgPickReqCheck.setVisibility(true)
        frm004Home.btnDemo.setVisibility(true);
        frm004Home.flexDemoShadow.setVisibility(true);
      }
    };

    //Debug Menu: Handler for the floating console
    this.control("btnFloatingConsoleCheck").onClick = function(button) {
      if (frm004Home.imgFloatingConsoleCheck.isVisible === true) {
        frm004Home.imgFloatingConsoleCheck.setVisibility(false);
        frm004Home["flexFloatingConsole"]["isVisible"] = false;
      } else {
        frm004Home.imgFloatingConsoleCheck.setVisibility(true);
        frm004Home["flexFloatingConsole"]["isVisible"] = true;
        //updateConsole();
      }
    };

    this.control("btnSubmitRating").onClick = function(button) {
      var rating = tuta.events.getRating();
      tuta.updateBookingHistoryRating(storedBookingID, rating, function(){
        tuta.resetMap();
        frm004Home.flexOverlay1.setVisibility(false);
        driver_state = 0;        
      });      
    }

    //Debug Menu: Reset state button
    this.control("btnResetState").onClick = function(button) {
      tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
      tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
      tuta.events.updateDriverState("Idle");
      frm004Home.imgSwitchBg.src = "switchbgoff.png";
      driver_state = 0;
      frm004Home.flexActive.setVisibility(true);
      //updateConsole();
    };

    //Show Customer Rating Button
    this.control("btnShowCustRating").onClick = function(button) {
      frm004Home.flexDarken.setVisibility(false);
      tuta.animate.move(frm004Home.flexDebugOptions, 0.3, "10%", "-160%", null);
      kony.timer.schedule("custrate", function() {
        frm004Home["flexOverlay1"]["isVisible"] = true;
      }, 0.35, false);
    };

    //Cheeseburger Menu Items
    this.control("btnEditProfile").onClick = function(button) {
      menuToggle(0, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmEditProfile.show();
    };
    this.control("btnMessage").onClick = function(button) {
      menuToggle(0, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmMessageMain.show();
    };
    this.control("btnBooking").onClick = function(button) {
      menuToggle(0, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmBookingsMain.show();
    };
    this.control("btnHelp").onClick = function(button) {
      menuToggle(0, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmLogIssue.show();
    };
    this.control("btnTripHistory").onClick = function(button) {
      menuToggle(0, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmTripHistory.show();
    };
    this.control("btnAboutMenu").onClick = function(button) {
      menuToggle(0, self.leftMenu._open);
      self.leftMenu.toggle();
      tuta.forms.frmAboutTuta.show();
    };

    //Activate Taxi?
    this.control("btnTaxiActivateCheck").onClick = function(button) {
      if (frm004Home.imgTaxiActivateCheck.isVisible === true) {
        frm004Home.imgTaxiActivateCheck.setVisibility(false);
        frm004Home.flexActive.setVisibility(false);
      } else {
        frm004Home.imgTaxiActivateCheck.setVisibility(true);
        frm004Home.flexActive.setVisibility(true);
      }
    };

    this.control("btnMapsAccept").onClick = function(button){
      tuta.events.directionsMaps(currentDest);
      tuta.animate.move(frm004Home.flexArrivalMessage, 0, frm004Home.flexArrivalMessage.top, "100%", null);
    };

    this.control("btnMapsDecline").onClick = function(button){
      tuta.animate.move(frm004Home.flexArrivalMessage, 0, frm004Home.flexArrivalMessage.top, "100%", null);
    };

    //Sign-out button
    this.control("btnSignOut").onClick = function(button) {

      menuToggle(0, self.leftMenu._open);
      tuta.animate.moveBottomLeft(frm001LoginScreen.flexMainButtons, 0, "0%", "0", null);
      self.leftMenu.toggle();

      loggedUser = null;

      tuta.forms.frm001LoginScreen.show();
    };

    this.control("btnCancelSearch").onClick = clearDestPick;

    frm004Home.flexOverlay1.setVisibility(false);



    // this.control("btnTestBookings").onClick = function(button){
    // tuta.retrieveBookings(); 
    //};
    mapAutoUpdateInterval = 4;
    /*
    if(driver_state === 0 || driver_state === 1){
      //
      try {
        kony.timer.cancel("updateMapBounds");
      }catch(ex){

      }
      kony.timer.schedule("updateMapBounds", function(){
        var bds = frm004Home.mapMain.getBounds();
        tuta.map.storeCenter(bds);
        tuta.map.startMapListener();
      }, 3, false);

      //tuta.map.startMapListener();
    }*/

    tuta.events.loadBookings();


  }; //End of PreShow

  //PostShow does not work on android
  tuta.forms.frm004Home.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/

  };

  tuta.forms.frm004Home.onHide = function(form){
    var self = this;
    //tuta.events.mapFormNavigatedAway();

    //tuta.map.stopMapListener();
  };
};