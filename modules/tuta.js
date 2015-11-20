/*=============================================================================
  _         _           _     
 | |_ _   _| |_ __ _   (_)___ 
 | __| | | | __/ _` |  | / __|
 | |_| |_| | || (_| |_ | \__ \
  \__|\__,_|\__\__,_(_)/ |___/
                     |__/     
===============================================================================                     
Main javascript file
Version: 3.2.30cl

Note: Methods in this file have to be split up into form-specific javascript
files, when the MVC framework is implemented. For now, all javascript will
remain in this file during testing.
===============================================================================

Variables

=============================================================================*/

var currentLocation = "";

//Code for handling stars in rating menu
var star = [];
var lastStarSelected = 0;
var toggleImage;

if (typeof(tuta) === "undefined") {
	tuta = {};
}

// global reference to your app object
var application = null; 


/*
	This is a hack so you can use this framework in
    Visualizer functional previews
*/
function initApp() {
  //ssa.util.alert("INIT");
  tuta.init();
}

function onStarSelect(eventobject, x , y) {
  var nostar = eventobject.id.replace("imgStar","");
  if(nostar === lastStarSelected && nostar > 1)
  {
    nostar--;
    lastStarSelected = 0;
  }
  else
    lastStarSelected = nostar;

  for(var i =0; i < nostar; i++) {
    star[i].src = "starselected.png";
  }
  for(var j = nostar; j < 5; j++) {
    star[j].src = "starunselected.png";
  }
}
//End of rating menu code

function initOld(){

  //Array of stars variables
  frm004Home.imgStar1.onTouchStart = onStarSelect;
  frm004Home.imgStar2.onTouchStart = onStarSelect;
  frm004Home.imgStar3.onTouchStart = onStarSelect;
  frm004Home.imgStar4.onTouchStart = onStarSelect;
  frm004Home.imgStar5.onTouchStart = onStarSelect;
  star.push(frm004Home.imgStar1);
  star.push(frm004Home.imgStar2);
  star.push(frm004Home.imgStar3);
  star.push(frm004Home.imgStar4);
  star.push(frm004Home.imgStar5);
  //End of stars variables

  /*=============================================================================
       ____                           _   __  __      _   _               _     
      / ___| ___ _ __   ___ _ __ __ _| | |  \/  | ___| |_| |__   ___   __| |___ 
     | |  _ / _ \ '_ \ / _ \ '__/ _` | | | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
     | |_| |  __/ | | |  __/ | | (_| | | | |  | |  __/ |_| | | | (_) | (_| \__ \
      \____|\___|_| |_|\___|_|  \__,_|_| |_|  |_|\___|\__|_| |_|\___/ \__,_|___/

  =============================================================================*/

  frm004Home.btnSubmitRating.onClick = function () {frm004Home["flexOverlay1"]["isVisible"] = false;};
  frmMessageMain.txtSearch.onTextChange = searchTxtChange;
  frm004Home.btnChs.onClick = animateMenu;

  /*=============================================================================
      _____                      ____                  _  __ _      
     |  ___|__  _ __ _ __ ___   / ___| _ __   ___  ___(_)/ _(_) ___ 
     | |_ / _ \| '__| '_ ` _ \  \___ \| '_ \ / _ \/ __| | |_| |/ __|
     |  _| (_) | |  | | | | | |  ___) | |_) |  __/ (__| |  _| | (__ 
     |_|  \___/|_|  |_| |_| |_| |____/| .__/ \___|\___|_|_| |_|\___|
                                      |_|                           
  =============================================================================*/

  //Form 1: Login Screen
  frm001LoginScreen.btnSignUp.onClick = function () {frm002SignupScreen.show();};
  frm001LoginScreen.btnLogin.onClick = function() {tuta.animate.move(frm001LoginScreen.flexMainButtons, 0.25, "", "-100%", null); tuta.animate.move(frm001LoginScreen.flexLoginButtons, 0.25, "0%", "0%", null);};
  frm001LoginScreen.btnLogin2.onClick = function () {frm003CheckBox.show();};  

  //Form 2: Signup Screen
  frm002SignupScreen.btnCheckAgree.onClick = function (){
    if(frm002SignupScreen.imgTick.isVisible === false)
      frm002SignupScreen.imgTick.setVisibility(true);
    else
      frm002SignupScreen.imgTick.setVisibility(false);
  };

  frm002SignupScreen.btnNextSignup.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager2.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager1.onClick = function () {switchForms(0);};
  frm002SignupScreen.btnFinishSignup.onClick = function () {frm004Home.show();};
  frm002SignupScreen.btnCheckAgree.onClick = function(){
    if((frm002SignupScreen.imgTick.isVisible===false)){
      frm002SignupScreen.imgTick.setVisibility(true);
    }
    else {
      frm002SignupScreen.imgTick.setVisibility(false);
    }
  };

  //Form 3: Checklist Form
  frm003CheckBox.btnContinue.onClick = function(){tuta.animate.move(frm003CheckBox.flexConfirmCabNumber, 0, "0", "0", null);};
  frm003CheckBox.btnCheck1.onClick = function(){frm003CheckboxToggle(frm003CheckBox.imgTick1);};
  frm003CheckBox.btnCheck2.onClick = function(){frm003CheckboxToggle(frm003CheckBox.imgTick2);};
  frm003CheckBox.btnCheck3.onClick = function(){frm003CheckboxToggle(frm003CheckBox.imgTick3);};
  frm003CheckBox.btnCheck4.onClick = function(){frm003CheckboxToggle(frm003CheckBox.imgTick4);};
  frm003CheckBox.btnCheck5.onClick = function(){frm003CheckboxToggle(frm003CheckBox.imgTick5);};
  frm003CheckBox.btnConfirmCNum.onClick = function(){frm004Home.show();};


  //Form 4: Main Map Landing Screen
  frm004Home.btnDebugOptions.onClick = function() {
    animateMenu(); 
    tuta.animate.move(frm004Home.flexDebugOptions, 0.3, "10%", "10%", null); 
    kony.timer.schedule("darken_screen", function() {
      frm004Home.flexDarken.setVisibility(true);}, 0.31, false); 
  };

  frm004Home.btnCloseDebugOptions.onClick = function() {
    frm004Home.flexDarken.setVisibility(false);
    tuta.animate.move(frm004Home.flexDebugOptions, 0.3, "10%", "-160%", null); 

  };

  frm004Home.btnLegal.onClick = function () {frmTermsConditions.show();};
  frm004Home.btnFlagDown.onClick = function () {frmFlagDown.show();};
  frm004Home.btnTestingPickup.onClick = function () {frmPickupRequest.show();};
  frm004Home.btnToggleActive.onClick = function(){
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
  }
  frm004Home.btnDemo.onClick = function () {frmPickupRequest.show();};
  frm004Home.btnPickupReqCheck.onClick = function(){
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

  frm004Home.btnFloatingConsoleCheck.onClick = function(){
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
  
  frm004Home.btnResetState.onClick = function(){
    tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
    tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
    frm004Home.imgSwitchBg.src = "switchbgoff.png";
    driver_state = 0;
    frm004Home.flexActive.setVisibility(true);
    updateConsole();
  }

  frm004Home.btnShowCustRating.onClick = function(){    
    frm004Home.flexDarken.setVisibility(false);
    tuta.animate.move(frm004Home.flexDebugOptions, 0.3, "10%", "-160%", null); 
    kony.timer.schedule("custrate", function(){frm004Home["flexOverlay1"]["isVisible"] = true;
                                              }, 0.35, false);
  }

  frm004Home.btnTaxiActivateCheck.onClick = function(){
    if(frm004Home.imgTaxiActivateCheck.isVisible === true){
      frm004Home.imgTaxiActivateCheck.setVisibility(false);
      frm004Home.flexActive.setVisibility(false);
    }
    else{
      frm004Home.imgTaxiActivateCheck.setVisibility(true);
      frm004Home.flexActive.setVisibility(true);
    }
  };

  frm004Home.btnSignOut.onClick = function () {
    frm001LoginScreen.show();
  };

  frm004Home.txtDest.onDone = function(widget) {
    if(frm004Home.txtDest.text != null){
      frm004Home.flexFindingDest.setVisibility(true);
      //tuta.mobile.alert("Search", "Search Done");
      selectDest(frm004Home);      
    }
  };

  frm004Home.mapMain.onClick = function(map, location) {
    frm004Home.flexAddressList.setVisibility(false);
    frm004Home.flexAddressShadow.setVisibility(false);
    //kony.timer.schedule("showMarker", function(){frmMap["flexChangeDest"]["isVisible"] = true;}, 0.3, false);
    //resetSearchBar();
    searchMode = 0;
    updateConsole();
  };


  //Compose Messages
  frmMessageCompose.btnCancel.onClick = function () {frmMessageMain.show();};

  //Help | log issue
  frmLogIssue.btnBack.onClick = function () {frm004Home.show();};
  frmLogIssue.btnCancel.onClick = function () {frm004Home.show();};
  frmLogIssue.btnSubmitIssue.onClick = function () {frm004Home.show();};


  //Message List
  frmMessageMain.btnComposeMessage.onClick = function () {frmMessageCompose.show();};
  frmMessageMain.btnBack.onClick = function () {frm004Home.show();};

  frmMessageCompose.btnSend.onClick = function (){
    frmMessageCompose.txtMessage.text = "";
    frmMessageCompose.txtSendTo.text = "";
    frmMessageCompose["flexMessageSent"]["isVisible"] = true;    
  };

  frmMessageCompose.btnMsgPopup.onClick = function (){frmMessageCompose["flexMessageSent"]["isVisible"] = false; frmMessageMain.show();};

  //Read message
  frmMessageRead.btnBack.onClick = function () {frmMessageMain.show();};


  //Booking individual
  frmBooking.btnBack.onClick = function () {frmBookingsMain.show();};
  frmBooking.btnHelp.onClick = function () {frmLogIssue.show();};

  //Bookings List
  frmBookingsMain.btnBack.onClick = function() {frm004Home.show();};
  frmBookingsMain.segBookings.onRowClick = function() {frmBooking.show();};

  //About Tuta
  frmAboutTuta.btnBack.onClick = function () {frm004Home.show();};

  //Terms & Conditions
  frmTermsConditions.btnBack.onClick = function () {frm004Home.show();};

  //Flag Down Menu
  frmFlagDown.btnStartTrip.onClick = function () {flagDownRequest();};
  frmFlagDown.btnCancelTrip.onClick = function () {frm004Home.show();};

  //Trip History
  frmTripHistory.btnBack.onClick = function() {frm004Home.show();};
  frmTripHistory.segTripHistoryMain.onRowClick = function() {frmTripHistoryInfo.show();};

  //Trip History Single Item
  frmTripHistoryInfo.CopybtnBack02c79ca66b88140.onClick = function() {frmTripHistory.show();};
  frmTripHistoryInfo.btnHelp.onClick = function() {frmLogIssue.show();};

  //Pickup Request
  frmPickupRequest.btnTopDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnBottomDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnLeftDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnRightDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnCancel.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}

  frmPickupRequest.btnDecline.onClick = function() {frmPickupRequest["flexConfirmCancel"]["isVisible"] = true;};
  frmPickupRequest.btnAcceptRequest.onClick = function() {
    //TODO: START TRIP
    pickupRequest();
    //frm004Home.show();
  };

  frmPickupRequest.btnConfirm.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false; frm004Home.show();}

  /*=============================================================================
      ____           _            _                   
     |  _ \ ___  ___| |_      ___| |__   _____      __
     | |_) / _ \/ __| __|____/ __| '_ \ / _ \ \ /\ / /
     |  __/ (_) \__ \ ||_____\__ \ | | | (_) \ V  V / 
     |_|   \___/|___/\__|    |___/_| |_|\___/ \_/\_/  

  =============================================================================*/


  frm004Home.postShow = function (){
    updateConsole();
    if(driver_state === tuta.fsm.STATES.TRAWLING)
    {
      tuta.animate.move(frm004Home.imgSwitch, 0, "", "0", null);
      tuta.fsm.stateChange(tuta.fsm.REQUESTS.ACTIVE);
      frm004Home.imgSwitchBg.src = "switchbgon.png";
    }
    else if(driver_state === tuta.fsm.STATES.IDLE)
    {
      tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
      tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
      frm004Home.imgSwitchBg.src = "switchbgoff.png";
    }
    else
    {
      frm004Home.flexActive.setVisibility(false);
    }
  };





  frm001LoginScreen.postShow = function (){   
    tuta.animate.move(frm001LoginScreen.flexMainButtons, 0, "", "0%", null); 
    tuta.animate.move(frm001LoginScreen.flexLoginButtons, 0, "0%", "100%", null); 
  };

  frm002SignupScreen.postShow = function (){   
    tuta.animate.move(frm002SignupScreen.scrollSignupBottom, 0, "116", "0%", null); 
    tuta.animate.move(frm002SignupScreen.scrollSignupBottomB, 0, "116", "100%", null); 
  };

  setUpSwipes();
  
  //frmSplash.rtDebug.text = "<span>Loading...<span>";
  kony.timer.schedule("firstinit", function () {

    //ustuck.init(function(response) {
    //tuta.mobile.alert("GEOCODE", response);
    //currentLocation = response.results[0];
    // kony.timer.schedule("splash", function() {  
    // }, 2, false);
    tuta.location.init(function(response){
      currentLocation = response.results[0];
      updateMap();
    });
    //});

  }, 0.1, false);


  /*  kony.timer.schedule("init", function () {

    init(function(response) {
      //tuta.mobile.alert("GEOCODE", response);
      currentLocation = response.results[0];
    });
  }, 4, true);*/
}

//END OF INIT FUNCTION

function switchForms(bool){
  if(bool === 1){
    tuta.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "-100%", null);
    tuta.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "0%", null);    

    frm002SignupScreen.scrollSignupBottomB.scrollToWidget(frm002SignupScreen.lblTopB);
  }
  else
  {
    tuta.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "100%", null);
    tuta.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "0%", null);

    frm002SignupScreen.scrollSignupBottom.scrollToWidget(frm002SignupScreen.lblTop);
  }

}

function searchTxtChange(){

  if (frmMessageMain.txtSearch.text === "") {
    frmMessageMain.imgSearchIcon.isVisible = true;
  }
  else {
    frmMessageMain.imgSearchIcon.isVisible = false;
  }
}

function resetSearch(){
  frmMessageMain.txtSearch.text = "Search";
  frmMessageMain.imgSearchIcon.isVisible = true;
}

var searchMode = 0;
function selectDest(form) {
  var add = "";
  // if(searchMode == 0)
  add = frm004Home.txtDest.text;
  // else
  // add = frm004Home.txtPick.text;

  tuta.location.addressList(add, function(result) {
    //tuta.mobile.alert("RES", JSON.stringify(result));
    frm004Home.flexFindingDest.setVisibility(false);
    if(result.status === "ZERO_RESULTS")
    {
      //popNoResults.show();
      frm004Home.txtDest.text = "";
      //frm004Home.txtPick.text = "";
    }
    else{
      frm004Home.flexAddressList.setVisibility(true);
      frm004Home.flexAddressShadow.setVisibility(true);
      frm004Home.segAddressList.widgetDataMap = { lblAddress : "formatted_address"};  
      frm004Home.segAddressList.setData(result.results);
      frm004Home.txtDest.text = "";
      //frm004Home.txtPick.text = "";
    }
  });
}

var swipedSlider = 1;
function setUpSwipes(){
  var setupTblSwipe = {fingers: 1}

  frm004Home.flexSlider.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, setupTblSwipe,  function(widget, gestureInformationSwipe) {
    //tuta.mobile.alert("","" + gestureInformationSwipe.swipeDirection );
    if(gestureInformationSwipe.swipeDirection == 2) { //RIGHT--->
      if(swipedSlider === 1){
        swipedSlider = 0;
        tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "186dp", function() {swipedSlider = 2;});           
      }
    }
    else if (gestureInformationSwipe.swipeDirection == 1){ //<---LEFT
      if(swipedSlider === 2){
        swipedSlider = 0;
        tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp",function() {swipedSlider = 1;});           
      }        
    }
  });
}

/*function flagDownRequest (){
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
};*/

/*function pickupRequest (){
  var oldState = driver_state;
  tuta.fsm.stateChange(tuta.fsm.REQUESTS.PICKUP);


  if(oldState !== driver_state){
    frm004Home.show();
    tuta.mobile.alert("On route", "Taxi is now on route to client");
  }
  else{
    frm004Home.show();
    tuta.mobile.alert("ERROR", "Taxi is idle and cannot recieve pickup requests");    
  }
    
    
    //tuta.mobile.alert("STATE CHANGE", "" + driver_state);
}*/


function updateMap() {
  frm004Home.mapMain.zoomLevel = 15;
  //frmMap.mapMain.locationData
  // setZoomLevelFromBounds();
  var pickupicon = "";
  //if(frm004Home.flexAddress.isVisible == false)
  pickupicon = "cabpin0.png";


  var locationData = [];
  locationData.push(
    {lat: "" + currentLocation.geometry.location.lat + "", 
     lon: "" + currentLocation.geometry.location.lng + "", 
     name:"Current Location", 
     desc: currentLocation.formatted_address.replace(/`+/g,""), 
     image : pickupicon + ""});



  frm004Home.mapMain.locationData = locationData;
}

function updateConsole(){
  frm004Home.rtConsole.text = "<strong>Floating Console:</strong><br><br>Current State: " + driver_state;
}


function frm003CheckboxToggle(widget){
  //var widget = toggleImage;
  if (widget.isVisible === false)
  {
    widget["isVisible"] = true;
  }
  else{
    widget["isVisible"] = false;
  }
}

function menuToggle(time, bool){
  if(bool === true){
    frm004Home.imgChsO.setVisibility(false);
    frm004Home.flexDarken.setVisibility(false);
    kony.timer.schedule("chsC", function(){
      frm004Home.imgChsC.setVisibility(true);
      frm004Home["btnChs"]["height"] = "55dp";
    }, time, false);      
  }
  else{
    frm004Home.imgChsC.setVisibility(false);
    frm004Home.flexDarken.setVisibility(true);
    kony.timer.schedule("chsO", function(){
      frm004Home.imgChsO.setVisibility(true);
      frm004Home["btnChs"]["height"] = "100%";
    }, time, false);  
  }         
}


var menuOpen = false;
function animateMenu(){
  frm004Home.btnChs.setVisibility(false);  
  if(menuOpen === false){ //OPEN MENU
    frm004Home.imgChsC.setVisibility(false);
    frm004Home.flexDarken.setVisibility(true);
    tuta.animate.move(frm004Home.flexMapScreen, 0.3, "0", "80%", null);
    tuta.animate.move(frm004Home.flexMenu, 0.3, "0", "0%", null); 
    frm004Home.imgChsO.setVisibility(true);
    frm004Home["btnChs"]["height"] = "100%";
    frm004Home.btnChs.setVisibility(true);
    menuOpen = true;
    frm004Home.btnChs.setVisibility(true);
    menuOpen = true;
  }
  else //CLOSE MENU
  {
    frm004Home.imgChsO.setVisibility(false);
    frm004Home.flexDarken.setVisibility(false);
    tuta.animate.move(frm004Home.flexMapScreen, 0.3, "0", "0%", null);
    tuta.animate.move(frm004Home.flexMenu, 0.3, "0", "-80%", null);
    frm004Home.imgChsC.setVisibility(true);
    frm004Home["btnChs"]["height"] = "55dp";
    frm004Home.btnChs.setVisibility(true); 
    menuOpen = false;
  }
}

var loggedUser = null;

tuta.retrieveBookings = function(){

  var input = {userid : "serv8@ssa.co.za", status : "OnRoute"};
  application.service("driverService").invokeOperation(
    "bookings", {}, input, 
    function(results){
      for(var i = 0; i < results.value.length; i++){
        tuta.util.alert("TEST", JSON.stringify(results.value[i].id));        
      }

    }, function(error){
		tuta.util.alert("ERROR", error);
    });

  
  
  
};

tuta.acceptBooking = function(bookingID){

  var input = {id : bookingID};
  application.service("driverService").invokeOperation(
    "acceptBooking", {}, input, 
    function(results){
      tuta.util.alert("TEST", JSON.stringify(results));

    }, function(error){
		tuta.util.alert("ERROR", error);
    });
  
};

tuta.assignBooking = function(){
  
  var inputdata = {providerId : "serv8@ssa.co.za"};
  var input = {data: JSON.stringify(inputdata), id : "RoDgyMotuFrY1dCb"};
  application.service("manageService").invokeOperation(
    "bookingUpdate", {}, input, 
    function(results){
      tuta.util.alert("TEST", JSON.stringify(results));

    }, function(error){
		tuta.util.alert("ERROR", error);
    });
};


tuta.initCallback = function(error) {
application.login("techuser@ssa.co.za","T3chpassword",function(result,error){
      if(error) tuta.util.alert("Login error", error);
    });
};

// Should be called in the App init lifecycle event
// In Visualizer this should be call in the init event of the startup form
tuta.init = function() {
  	// initialize form controllers
  	new tuta.forms.frm001LoginScreen();
  
  	new tuta.forms.frm003CheckBox();
  	new tuta.forms.frm004Home();
  	new tuta.forms.frmAboutTuta();
  	new tuta.forms.frmBooking();
  	new tuta.forms.frmBookingsMain();
  	new tuta.forms.frmFlagDown();
  	new tuta.forms.frmLogIssue();
  	new tuta.forms.frmMessageMain();
  	new tuta.forms.frmMessageCompose();
  	new tuta.forms.frmMessageRead();
  	new tuta.forms.frmPickupRequest();
  	new tuta.forms.frmTermsConditions();
  	new tuta.forms.frmTripHistory();
  	new tuta.forms.frmTripHistoryInfo();
  
  	// initialize application
 	application = new tuta.application(tuta.initCallback);
};

/*
DRIVER STATES: trawling, on-route to client (ORTC), on-route to dest (ORTD), idle (picking up client or off-duty)

REQUEST TYPES: pickup, flag down, drop-off, via, active, continue
(notated by **)

STATE CHANGES:  trawling - > *pickup* - > ORTC - > idle
				trawling - > *flag down* - > idle
                idle - > *drop-off* - > ORTD - > idle
                idle - > *via* - > ORTD - > idle - > ORTD - > idle
                idle - > *active* - > trawling
*/



