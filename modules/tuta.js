var currentLocation = "";
var star = [];

var lastStarSelected = 0;
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

function init(){

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
  
  frm004Home.btnSubmitRating.onClick = function () {frm004Home["flexOverlay1"]["isVisible"] = false;};
  
  frmMessageMain.txtSearch.onTextChange = searchTxtChange;
  frm004Home.btnChs.onClick = animateMenu;
  
  frm001LoginScreen.btnSignUp.onClick = function () {frm002SignupScreen.show();};
  frm001LoginScreen.btnLogin.onClick = function() {tuta.animate.move(frm001LoginScreen.flexMainButtons, 0.25, "", "-100%", null); tuta.animate.move(frm001LoginScreen.flexLoginButtons, 0.25, "0%", "0%", null);};
  frm001LoginScreen.btnLogin2.onClick = function() {frm003CheckBox.show();};  
  frm002SignupScreen.btnCheckAgree.onClick = function (){
    if(frm002SignupScreen.imgTick.isVisible === false)
      frm002SignupScreen.imgTick.setVisibility(true);
    else
      frm002SignupScreen.imgTick.setVisibility(false);
        };
  //Compose Messages
  frmMessageCompose.btnCancel.onClick = function () {frmMessageMain.show();};
  
  //Help/log issue
  frmLogIssue.btnBack.onClick = function () {frm004Home.show();};
  frmLogIssue.btnCancel.onClick = function () {frm004Home.show();};
  frmLogIssue.btnSubmitIssue.onClick = function () {frm004Home.show();};
  
  frm002SignupScreen.btnNextSignup.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager2.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager1.onClick = function () {switchForms(0);};
  frm002SignupScreen.btnFinishSignup.onClick = function () {frm004Home.show();};
  frm004Home.btnLegal.onClick = function (){frmTermsConditions.show();};
  frmTermsConditions.btnBack.onClick = function (){frm004Home.show();};
  frm004Home.btnFlagDown.onClick = function () { frmFlagDown.show();};
  frmFlagDown.btnCancelTrip.onClick = function () {frm004Home.show();};
  frmFlagDown.btnStartTrip.onClick = function () {frm004Home.show();};
  frmMessageCompose.btnSend.onClick = function (){
    frmMessageCompose.txtMessage.text = "";
    frmMessageCompose.txtSendTo.text = "";
    frmMessageCompose["flexMessageSent"]["isVisible"] = true;    
  };
  frmMessageCompose.btnMsgPopup.onClick = function (){frmMessageCompose["flexMessageSent"]["isVisible"] = false; frmMessageMain.show();};
  frm004Home.btnDemo.onClick = function (){
    //frm004Home.btnDemo.setVisibility(false); 
    //frm004Home["flexDemoShadow"]["isVisible"] = false;
    frmPickupRequest.show();
  };
  
  frmPickupRequest.btnTopDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnBottomDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnLeftDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnRightDismiss.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  frmPickupRequest.btnCancel.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;}
  
  
  frmPickupRequest.btnDecline.onClick = function() {frmPickupRequest["flexConfirmCancel"]["isVisible"] = true;};
  frmPickupRequest.btnAcceptRequest.onClick = function() {
    //TODO: START TRIP
    frm004Home.show();
  };
  
  frmPickupRequest.btnConfirm.onClick = function(){frmPickupRequest["flexConfirmCancel"]["isVisible"] = false; frm004Home.show();}
  
  frm004Home.btnSignOut.onClick = function () {
    frm001LoginScreen.show();
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
  
  
  
  frm002SignupScreen.btnCheckAgree.onClick = function(){
    if((frm002SignupScreen.imgTick.isVisible===false)){
      frm002SignupScreen.imgTick.setVisibility(true);
    }
    else {
      frm002SignupScreen.imgTick.setVisibility(false);
    }
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
  };
  
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
  


