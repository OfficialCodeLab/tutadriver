if (typeof(tuta) === "undefined") {
  tuta = {};
}

tuta.events = {};

tuta.events.blankFunction = function(){

};

/*=============================================================================
  ____          _              _   _                 _ _           
 / ___|_      _(_)_ __   ___  | | | | __ _ _ __   __| | | ___ _ __ 
 \___ \ \ /\ / / | '_ \ / _ \ | |_| |/ _` | '_ \ / _` | |/ _ \ '__|
  ___) \ V  V /| | |_) |  __/ |  _  | (_| | | | | (_| | |  __/ |   
 |____/ \_/\_/ |_| .__/ \___| |_| |_|\__,_|_| |_|\__,_|_|\___|_|   
                 |_|                                               

TODO: This entire function needs to be moved to the map form,
      as swipes are only used on this form anyway.                 
=============================================================================*/
var swipedSlider = 1;

function setUpSwipes() {
  var setupTblSwipe = {
    fingers: 1
  };

  frm004Home.flexSlider.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, setupTblSwipe, function(widget, gestureInformationSwipe) {


    //Set up slider for picking up customer
    if (customerIsPickedUp === false) {

      if (gestureInformationSwipe.swipeDirection == 2) { //RIGHT--->
        if (swipedSlider === 1) {
          swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "186dp", function() {
            swipedSlider = 1;
          });
          customerIsPickedUp = true;
        }
      } else if (gestureInformationSwipe.swipeDirection == 1) { //<---LEFT
        if (swipedSlider === 2) {
          //swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp", function() {
            //swipedSlider = 1;
          });
        }
      }
    }

    //Set up slider for dropping off customer
    else {

      if (gestureInformationSwipe.swipeDirection == 2) { //RIGHT--->
        if (swipedSlider === 1) {
          swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "186dp", function() {
            swipedSlider = 1;
          });
          customerIsDroppedOff = true;
        }
      } else if (gestureInformationSwipe.swipeDirection == 1) { //<---LEFT
        if (swipedSlider === 2) {
          //swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp", function() {
            //swipedSlider = 1;
          });
        }
      }
    }
  });
}
//End of swipe handler
/*=============================================================================
  ____       _   _               ____  _                 
 |  _ \ __ _| |_(_)_ __   __ _  / ___|| |_ __ _ _ __ ___ 
 | |_) / _` | __| | '_ \ / _` | \___ \| __/ _` | '__/ __|
 |  _ < (_| | |_| | | | | (_| |  ___) | || (_| | |  \__ \
 |_| \_\__,_|\__|_|_| |_|\__, | |____/ \__\__,_|_|  |___/
    / \   _ __ _ __ __ _ |___/                           
   / _ \ | '__| '__/ _` | | | |                          
  / ___ \| |  | | | (_| | |_| |                          
 /_/   \_\_|  |_|  \__,_|\__, |                          
                         |___/                           
=============================================================================*/
//Code for handling stars in rating menu
var star = [];
var lastStarSelected = 0;
var toggleImage;

function onStarSelect(eventobject, x, y) {
  var nostar = eventobject.id.replace("imgStar", "");
  if (nostar === lastStarSelected && nostar > 1) {
    nostar--;
    lastStarSelected = 0;
  } else
    lastStarSelected = nostar;

  for (var i = 0; i < nostar; i++) {
    star[i].src = "starselected.png";
  }
  for (var j = nostar; j < 5; j++) {
    star[j].src = "starunselected.png";
  }
}

tuta.events.getRating = function (){
  for(var i = 0; i < star.length; i++){
    if(star[i].src === "starunselected.png"){
      return i;
    }
  }
  return 5;
};
//End of ratings method
/*===========================================================================*/

tuta.events.getCost = function (str){
  return str.substring(1, str.length);
};


//Toggle function to switch between landing screen and login/pass screen
//TODO: Move this to the events screen
function switchForms(bool) {
  if (bool === 1) {
    tuta.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "-100%", null);
    tuta.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "0%", null);

    frm002SignupScreen.scrollSignupBottomB.scrollToWidget(frm002SignupScreen.lblTopB);
  } else {
    tuta.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "100%", null);
    tuta.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "0%", null);

    frm002SignupScreen.scrollSignupBottom.scrollToWidget(frm002SignupScreen.lblTop);
  }
}


//Toggle function to hide/show the magnifying glass on the messaging window,
//When the searchbar is clicked.
//TODO: Move this to the message form
function searchTxtChange() {

  if (frmMessageMain.txtSearch.text === "") {
    frmMessageMain.imgSearchIcon.isVisible = true;
  } else {
    frmMessageMain.imgSearchIcon.isVisible = false;
  }
}


//Resets the text in the search bar, in the messaging form.
//TODO: Move this to the message form
function resetSearch() {
  frmMessageMain.txtSearch.text = "Search";
  frmMessageMain.imgSearchIcon.isVisible = true;
}


//Toggles the checkbox images in the checkbox form.
//TODO: Move this to the checkbox form.
function frm003CheckboxToggle(widget) {
  //var widget = toggleImage;
  var w = eventobject.id.replace("btnCheckTest", "genTickImg");
  if (w.isVisible === false) {
    w["isVisible"] = true;
  } else {
    w["isVisible"] = false;
  }
}


//Used to toggle the cheeseburger menu on the map form.
//TODO: Move this to the map form.
function animateMenu() {
  frm004Home.btnChs.setVisibility(false);
  if (menuOpen === false) { //OPEN MENU
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
  } else //CLOSE MENU
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

//Useful method to shorten a string.
function shortenText(str, len) {
  var newStr = "";
  if (str.length > len)
    newStr = str.substring(0, (len - 1)) + "...";

  return newStr;
}

//Useful method to toggle visibility on images.
function toggleImage(widget) {
  //var widget = toggleImage;
  if (widget.isVisible === false) {
    widget["isVisible"] = true;
  } else {
    widget["isVisible"] = false;
  }
}
function clearDestPick(){
  frm004Home.txtDest.text = "";
  frm004Home.flexDest.setVisibility(true);
}

var storedTrips = [];
tuta.events.loadTripHistory = function(callback){
  tuta.retrieveBookingsHistory(function(results, error){
    if(error === undefined){

      storedTrips = [];
      for (var j = 0; j < results.value.length; j++){storedTrips.push({});}
      for (var i = 0; i < results.value.length; i++){
        try{     
          var date = tuta.events.dateStringLong(results.value[i].info.date);
          storedTrips[i] = {
            "name" : results.value[i].userId,
            "start" : results.value[i].address.start,
            "end" : results.value[i].address.end,
            "date" : date,
            "cost" : "R" + results.value[i].info.cost,
            "rating" : results.value[i].info.customerRating,
            "driverImg" : "profilepicbookingnew.png", //TODO: replace with real profile pic
            "tripImg" : "map2.png"//TODO: QUERY STATIC MAPS API TO GET IMAGE
          };
        }
        catch(ex){
          //callback(null, "An error occurred.");
        }

      }
      frmTripHistory.segTripHistoryMain.widgetDataMap = { "lblCost"  : "cost", "lblDateTime" : "date"};
      frmTripHistory.segTripHistoryMain.setData(storedTrips);
      callback("success");



    }
    else{
      callback(null, "Server error. Please retry.");
    }
  });


};


/* STRUCT FOR STORED TRIPS
storedTrips[i] = {
  "_id" : "primary key",
  "users" : { 
    "customerName" : "",
    "driverName" : "",
  },
  "address" : { 
    "start" : "description of the start position",
    "end" : "description of the end position" 
  },
  "info" : {
    "date" : "possibly epoch date?",
    "cost" : "",
    "customerRating" : "",
    "driverRating" : ""
  }
};*/


tuta.events.getChecklistItems = function (){
  var input = {templateId : GLOBAL_PROVIDER};

  application.service("driverService").invokeOperation(
    "checklist", {}, input,
    function(result){
      checklistItems = result.value;
      tuta.forms.frm003CheckBox.show();
    }, function(error){
      tuta.forms.frm004Home.show();
    });

};

tuta.events.logIssue = function (){

  var input = {
    userId : globalCurrentUser.userName,
    providerId : GLOBAL_PROVIDER_EMAIL,
    email : frmLogIssue.txtEmail.text.toLowerCase().replace(" ", ""),
    userName : frmLogIssue.txtName.text,
    companyName : frmLogIssue.txtCompanyName.text,
    queryTopic : frmLogIssue.lbxQuery.selectedKeyValue[1],
    queryFull : frmLogIssue.txtareaEditIssue.text,
    date : (new Date()).getTime(),
    status : "Pending"
  };

  var data = { data : JSON.stringify(input) };

  application.service("manageService").invokeOperation(
    "logIssueAdd", {}, data,
    function(success){
      tuta.util.alert("Issue Logged!", "Please check your emails and keep this id as reference : " + success.value[0].id);
    },function(error){
      //tuta.util.alert("Error", error);

    });

  //tuta.util.alert("TEST", JSON.stringify(input));
};


/*===========================================================================
  ____       _                 
 |  _ \  ___| |__  _   _  __ _ 
 | | | |/ _ \ '_ \| | | |/ _` |
 | |_| |  __/ |_) | |_| | (_| |
 |____/ \___|_.__/ \__,_|\__, |
                         |___/ 
===========================================================================*/

//Methods written by Carl for use in the debug menu
tuta.events.csShowDistance = function() {
  var csCurrentPos = {
    lat: currentPos.geometry.location.lat,
    lon: currentPos.geometry.location.lng
  };
  var csDestinationPos = {
    lat: -34.055390,
    lon: 18.822428
  };

  tuta.util.alert("Current Position", "" +
                  "\nLatitude: " + csCurrentPos.lat +
                  "\nLongitude: " + csCurrentPos.lon + "\n" +
                  "\nSecond Position" +
                  "\nLatitude: " + csDestinationPos.lat +
                  "\nLongitude: " + csDestinationPos.lon);

  var csTestDistance = tuta.location.distance(csCurrentPos.lat, csCurrentPos.lon, csDestinationPos.lat, csDestinationPos.lon);
};

tuta.events.directionsMaps = function (address){
  kony.application.openURL("http://maps.google.com/maps?f=d&daddr=" + address +
                           "&sspn=0.2,0.1&nav=1");
};


tuta.events.directionsMapsDL = function (address){
  kony.application.openURL("comgooglemaps://?f=d&daddr=" + address +
                           "&sspn=0.2,0.1&nav=1");
};

tuta.events.dateString = function(epoch){
  var newDate = epoch.substring(0, epoch.length-3);
  var date = new Date(parseInt(newDate) * 1000);
  var hours = date.getHours();
  var mins = date.getMinutes();
  if (hours < 10){
    hours = "0" + hours;    
  }

  if (mins < 10){
    mins = "0" + mins;    
  }

  return hours + ":" + mins;
};

tuta.events.dateStringLong = function(epoch){
  var newDate = epoch.substring(0, epoch.length-3);
  var date = new Date(parseInt(newDate) * 1000);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var mins = date.getMinutes();
  if (hours < 10){
    hours = "0" + hours;    
  }

  if (mins < 10){
    mins = "0" + mins;    
  }

  if (day < 10){
    day = "0" + day;    
  }

  if (month < 10){
    month = "0" + month;    
  }

  return day + "/" + month + "/" + year + "   " + hours + ":" + mins;
};

tuta.events.routeHandler = function(){
  kony.timer.schedule("routeHandler", function(){
    tuta.routes.addPoints(storedBookingID, routePoints, function(){
      routePoints = [];
    });
  }, 60, true);
};

tuta.events.loadBookings = function(){
  try {
    kony.timer.cancel("awaitBookings");

  } catch (ex) {

  }

  kony.timer.schedule("awaitBookings", function() {
    if (driver_state === 1)
      tuta.retrieveBookingsStatus("Unconfirmed", function(results, error){
        currentBooking = results.value[0];
        tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
        tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
        frm004Home.imgSwitchBg.src = "switchbgoff.png";
        tuta.events.updateDriverState("Idle");
        tuta.pickupRequestInfo(results.value[0].userId, results.value[0].address.description);
      });
  }, 10, true);

};

tuta.events.loadAllBookings = function(callback){
  tuta.retrieveBookingsStatus("Unconfirmed", function(results, error){
    if(results.value.length !== 0){
      currentBookings = results.value;
      var bookingsArr = [];
      for(var i = 0; i < currentBookings.length; i++){
        var thisBooking = currentBookings[i];
        if(thisBooking.time !== undefined && thisBooking.time !== null){
          tuta.location.geoCode(thisBooking.location.lat, thisBooking.location.lng, function(s,e){
            var startLoc = s.results[0];
            tuta.location.findAddress("90 Parel Vallei", function(suc, err){
              var endLoc = suc.results[0];
              tuta.events.getUserName(thisBooking.userId, function(result){
                var name = result;
                var locA = {
                  lat: startLoc.geometry.location.lat,
                  lng: startLoc.geometry.location.lng
                };
                var locB = {
                  lat: endLoc.geometry.location.lat,
                  lng: endLoc.geometry.location.lng
                };
                estimateTripCost(locA, locB, function(min, max){
                  var estFareText = "R" + min + " - R" + max;
                  var rating = "4.1"; //TODO: get the actual rating
                  var bookingItem = {
                    name : name,
                    estFare : estFareText,
                    pickup: startLoc.formatted_address,
                    dropoff : endLoc.formatted_address,
                    date : /*tuta.events.dateStringLong(thisBooking.time)*/ "12:00",
                    rating : rating
                  };/*
                  TODO: 
                  - map data
                  - fix
                  frmTripHistory.segTripHistoryMain.widgetDataMap = { "lblCost"  : "cost", "lblDateTime" : "date"};
                  frmTripHistory.segTripHistoryMain.setData(storedTrips);*/
                  //callback("success");
                  tuta.util.alert("TEST", JSON.stringify(bookingItem));
                });
              });
            });
          });
        }
      }
    }
  });

};

tuta.events.getUserName = function (email, callback){
  application.service("userService").invokeOperation(
    "user", {}, {id : email},
    function (result){
      callback(result.value[0].userInfo.firstName);
    }, function(error){

    });
};

tuta.events.mapFormNavigatedAway = function (){
  try {
    kony.timer.cancel("awaitBookings");

  } catch (ex) {

  }

  mapAutoUpdateInterval = 45;
};

tuta.events.timedStateUpdate = function(state, time){
  try{
    kony.timer.cancel("UpdateState");
  }
  catch(ex){

  }
  kony.timer.schedule("UpdateState", function(){
    tuta.events.updateDriverState(state);        
  }, time, false);
};


tuta.events.updateDriverState = function (state){
  var inputData = {
    status: state
  };

  var input = {
    data: JSON.stringify(inputData),
    id: globalCurrentUser.userName
  };

  //Popup displaying latitude and longitude,
  //on position change
  // var testUserName = "Your username is: " + JSON.stringify(userTemp.userName + "\n");
  // var testOutput = "Your current position is:\n" + "Latitude: " + JSON.stringify(inputData.location.lat) + "\nLongitude: " + JSON.stringify(inputData.location.long) + "";
  // tuta.util.alert("Location Update", testUserName + testOutput);


  //Updates server with user's current position
  application.service("manageService").invokeOperation(
    "userUpdate", {}, input,
    function(result) {
      //tuta.util.alert("TEST" + "Map updated with your current position");
    },
    function(error) {

      // the service returns 403 (Not Authorised) if credentials are wrong
      //tuta.util.alert("Error: " + error.httpStatusCode,"It looks like the server has crashed, or your location is not updating.\n\n" + error.errmsg);
    }
  );
}