var currentLocation = "";

function init(){
  frmMessageMain.txtSearch.onTextChange = searchTxtChange;
  frm004Home.btnChs.onClick = animateMenu;
  
  frm001LoginScreen.btnSignUp.onClick = function () {frm002SignupScreen.show();};
  frm001LoginScreen.btnLogin.onClick = function() {ssa.animate.move(frm001LoginScreen.flexMainButtons, 0.25, "", "-100%", null); ssa.animate.move(frm001LoginScreen.flexLoginButtons, 0.25, "0%", "0%", null);};
  frm001LoginScreen.btnLogin2.onClick = function() {frm003CheckBox.show();};
  
  frm002SignupScreen.btnNextSignup.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager2.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager1.onClick = function () {switchForms(0);};
  frm002SignupScreen.btnFinishSignup.onClick = function () {frm004Home.show();};
  frm004Home.btnLegal.onClick = function (){frmTermsConditions.show();};
  frmTermsConditions.btnBack.onClick = function (){frm004Home.show();};
  frm004Home.btnFlagDown.onClick = function () { frmFlagDown.show();};
  
  frm004Home.btnSignOut.onClick = function () {
    frm001LoginScreen.show();
  };
  
  frm001LoginScreen.postShow = function (){   
    ssa.animate.move(frm001LoginScreen.flexMainButtons, 0, "", "0%", null); 
    ssa.animate.move(frm001LoginScreen.flexLoginButtons, 0, "0%", "100%", null); 
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
      //ssa.mobile.alert("Search", "Search Done");
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
      //ssa.mobile.alert("GEOCODE", response);
      //currentLocation = response.results[0];
     // kony.timer.schedule("splash", function() {  
     // }, 2, false);
	ssa.location.init(function(response){
      currentLocation = response.results[0];
      updateMap();
    });
    //});

  }, 0.1, false);


/*  kony.timer.schedule("init", function () {

    init(function(response) {
      //ssa.mobile.alert("GEOCODE", response);
      currentLocation = response.results[0];
    });
  }, 4, true);*/
}

function switchForms(bool){
  if(bool === 1){
    ssa.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "-100%", null);
    ssa.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "0%", frm002SignupScreen.scrollSignupBottomB.scrollToBeginning());
  }
  else
  {
    ssa.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "100%", null);
    ssa.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "0%", frm002SignupScreen.scrollSignupBottom.scrollToBeginning());
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
    
  ssa.location.addressList(add, function(result) {
    //ssa.mobile.alert("RES", JSON.stringify(result));
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
    //ssa.mobile.alert("","" + gestureInformationSwipe.swipeDirection );
    if(gestureInformationSwipe.swipeDirection == 2) { //RIGHT--->
      if(swipedSlider === 1){
        swipedSlider = 0;
        ssa.animate.move(frm004Home.imgSliderball, 0.3, "", "186dp", function() {swipedSlider = 2;});           
      }
    }
    else if (gestureInformationSwipe.swipeDirection == 1){ //<---LEFT
      if(swipedSlider === 2){
        swipedSlider = 0;
        ssa.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp",function() {swipedSlider = 1;});           
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
    ssa.animate.move(frm004Home.flexMapScreen, 0.3, "0", "80%");
    ssa.animate.move(frm004Home.flexMenu, 0.3, "0", "0%"); 
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
    ssa.animate.move(frm004Home.flexMapScreen, 0.3, "0", "0%");
    ssa.animate.move(frm004Home.flexMenu, 0.3, "0", "-80%");
    frm004Home.imgChsC.setVisibility(true);
    frm004Home["btnChs"]["height"] = "55dp";
    frm004Home.btnChs.setVisibility(true); 
    menuOpen = false;
  }
}




  


