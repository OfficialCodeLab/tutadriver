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
// global reference to your app object
var application = null;
var initialized = 0;
var watchID = null;
var searchMode = 0;

//Map will update as per this amount of seconds
var mapAutoUpdateInterval = 4;

//Variables pertaining to the current user
var globalCurrentUser = {};
var loggedUser = null;
var currentLocation;

//Variables pertaining to the current booking
var currentBooking = null;
var storedBookingID = null;
var storedBooking;
var destination = null;

//Flags for state of booking process
var csBookingInTransit = false;
var customerIsPickedUp = false;
var customerIsDroppedOff = false;
var arrivedFlag = false;

//Variables used by updateMap()
var nearbyUsers = [];
var currentPin = "cabpin0.png";

//Variables used by the map form
var menuOpen = false;

//Used by the bearing function
var currentBearing = 0;

//These variables are structured for use in methods
var csClientLocation = {
  latitude: 0,
  longitude: 0
};
var csDestination = {
  latitude: 0,
  longitude: 0
};
var currentPos = {
  geometry: {
      location: {
          lat: 0,
          lng: 0
      }
  },
  formatted_address: ""
};

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
//End of ratings method
/*===========================================================================*/


//Defines the namespace
if (typeof(tuta) === "undefined") {
  tuta = {};
}

/*
  This is a hack so you can use this framework in
  Visualizer functional previews
*/
function initApp() {
  tuta.init();
}


//Toggle function to switch between landing screen and login/pass screen
//TODO: Move this to the signup screen
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


//Handles entering addresses on the map form.
//TODO: Move this to the map form.
function selectDest(form) {
  var add = "";
  add = frm004Home.txtDest.text;

  tuta.location.addressList(add, function(result) {
    frm004Home.flexFindingDest.setVisibility(false);
    if (result.status === "ZERO_RESULTS") {
      frm004Home.txtDest.text = "";
    } else {
      frm004Home.flexAddressList.setVisibility(true);
      frm004Home.flexAddressShadow.setVisibility(true);
      frm004Home.segAddressList.widgetDataMap = {
        lblAddress: "formatted_address"
      };
      frm004Home.segAddressList.setData(result.results);
      frm004Home.txtDest.text = "";
    }
  });
}
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
/*=============================================================================*/

//Function to refresh the map with locations of user and driver.
//TODO: Move this to Map Form. 
function updateMap() {

  tuta.getBearing(function(response) {
    currentPin = response;
  });

  var locationData = [];
  locationData.push({
    lat: "" + currentPos.geometry.location.lat + "",
    lon: "" + currentPos.geometry.location.lng + "",
    name: "Pickup Location",
    desc: "",
    image: currentPin
  });

  if (nearbyUsers.length > 0) {
    locationData.push({
      lat: "" + nearbyUsers[0].location.lat + "",
      lon: "" + nearbyUsers[0].location.lng + "",
      name: nearbyUsers[0].id,
      desc: "",
      image: "pickupicon.png"
    });
  }
	frm004Home.mapMain.zoomLevel = 14;
  frm004Home.mapMain.locationData = locationData;
}

//Toggles the checkbox images in the checkbox form.
//TODO: Move this to the checkbox form.
function frm003CheckboxToggle(widget) {
  //var widget = toggleImage;
  if (widget.isVisible === false) {
    widget["isVisible"] = true;
  } else {
    widget["isVisible"] = false;
  }
}

//Toggles some menu on the map form.
//TODO: Move this to the map form.
function menuToggle(time, bool) {
  if (bool === true) {
    frm004Home.imgChsO.setVisibility(false);
    frm004Home.flexDarken.setVisibility(false);
    kony.timer.schedule("chsC", function() {
      frm004Home.imgChsC.setVisibility(true);
      frm004Home["btnChs"]["height"] = "55dp";
    }, time, false);
  } else {
    frm004Home.imgChsC.setVisibility(false);
    frm004Home.flexDarken.setVisibility(true);
    kony.timer.schedule("chsO", function() {
      frm004Home.imgChsO.setVisibility(true);
      frm004Home["btnChs"]["height"] = "100%";
    }, time, false);
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

//Initiates the entire app with the tech user,
//Very important. Leave this here.
tuta.initCallback = function(error) {
  application.login("techuser@ssa.co.za", "T3chpassword", function(result, error) {
    if (error) tuta.util.alert("Login Error", error);
    else {

    }
  });

};

//Loads position of user into app (at login screen), starts watching the user's location,
//Updates every two seconds.
tuta.loadInitialPosition = function() {
  tuta.location.loadPositionInit();
  kony.timer.schedule("startwatch", function() {
    tuta.startWatchLocation();
  }, 2, false);
}


//Retrieves unconfirmed bookings that are
//assigned to the driver.
tuta.retrieveBookings = function() {
    var user = globalCurrentUser;
    var input = {
        userid: user.userName,
        status: "Unconfirmed"
    };

    try {
        application.service("driverService").invokeOperation(
            "bookings", {}, input,
            function(results) {
                try {
                    currentBooking = results.value[0];
                    tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
                    tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
                    frm004Home.imgSwitchBg.src = "switchbgoff.png";
                    tuta.pickupRequestInfo(results.value[0].userId, results.value[0].address.description);
                } catch (ex) {

                }
            },
            function(error) {
                
            });
    }
    catch(ex){

    }
};

//Gets the bearing of the driver,
//sets the callback with the correct image.
tuta.getBearing = function(callback) {
  try {
    var brng = parseInt(Math.abs(Math.round(currentBearing / 15)) * 15);

    if (brng >= 360)
      brng = 0;

    if (brng !== null && brng === brng) {
      callback("cabpin" + brng + ".png");
    }

  } catch (ex) {
    callback("cabpin" + 0 + ".png");
  }
}

//Updates the current position of the user on the server.
//VERY IMPORTANT: Leave this here.
tuta.startWatchLocation = function() {
  tuta.startUpdateMapFunction();
  setUpSwipes();
  try {
    watchID = null;
    if (watchID === null) {
      watchID = kony.location.watchPosition(
        function(position) {
          currentBearing = bearing(currentPos.geometry.location.lat, currentPos.geometry.location.lng, position.coords.latitude, position.coords.longitude);
          //tuta.location.geoCode(position.coords.latitude, position.coords.longitude, function(s, e) {
            currentPos.geometry.location.lat = position.coords.latitude;
            currentPos.geometry.location.lng = position.coords.longitude;
            //updateMap();
            var userTemp = globalCurrentUser;
            try {
              tuta.location.updateLocationOnServer(userTemp.userName, currentPos.geometry.location.lat, currentPos.geometry.location.lng, currentBearing);
            } catch (ex) {

            }
          //});

        },

        function(errorMsg) {
          //if(errorMsg.code !==3 )
          //tuta.util.alert("ERROR", errorMsg);
        },

        {
          timeout: 35000,
          maximumAge: 5000,
          enableHighAccuracy: true
        }
      );


      initialized = 1;
    } else {
      kony.location.clearWatch(watchID);
      //kony.store.removeItem("watch");
      watchID = null;
      tuta.startWatchLocation();
    }
  } catch (ex) {
    tuta.util.alert("TEST", ex);
  }
};

//Recursively updates the map.
//TODO: Refactor this into the map form.
//Difficulty: HARD
tuta.startUpdateMapFunction = function() {
  try {
    kony.timer.cancel("updateMapSlow");
  } catch (ex) {

  }
  kony.timer.schedule("updateMapSlow", function() {
    updateMap();
  }, mapAutoUpdateInterval, true);
};

//Sets the text for the pickup request form.
//TODO: Refactor this into the pickup request form.
//Difficulty: Medium
tuta.pickupRequestInfo = function(userID, address) {

  var input = {
    id: userID
  };


  try{
    application.service("userService").invokeOperation(
      "user", {}, input,
      function(results) {
        frmPickupRequest.lblCustomerName.text = results.value[0].userInfo.firstName + " " + results.value[0].userInfo.lastName;
        frmPickupRequest.rtPickupLocation.text = address;
        tuta.location.geoCode(results.value[0].location.lat, results.value[0].location.lng, function(success, error) {
          var loc = success.results[0].formatted_address.replace(/`+/g, "");
          loc = shortenText(loc, 25);
          frmPickupRequest.lblViaPath.text = loc;
          tuta.forms.frmPickupRequest.show();
        });

      },
      function(error) {

      });
  }
  catch(ex){

  }
};


//Accepts whatever booking gets passed through to the method,
//Triggers rendering of the route on the map.
tuta.acceptBooking = function(bookingID) {
  var input = {
    id: bookingID
  };

  //set global variable
  storedBookingID = bookingID;
  try{
    application.service("driverService").invokeOperation(
    "acceptBooking", {}, input,
    function(results) {
      tuta.renderRouteAndUser();
    },
    function(error) {

    });
  }
  catch (ex){

  }
};

//Rejects whatever booking is passed through.
tuta.rejectBooking = function(bookingID) {
  var input = {
    id: bookingID
  };
  try{
    application.service("driverService").invokeOperation(
    "rejectBooking", {}, input,
    function(results) {
      //tuta.util.alert("TEST", JSON.stringify(results));
      currentBooking = null;

    },
    function(error) {
      //tuta.util.alert("ERROR", error);
    });
  }
  catch (ex){

  }
};

/*  
  Runs when the booking is accepted
  Step number: 1
  Recurring: No
  Recurring sub-methods: yes
*/
tuta.renderRouteAndUser = function() { //1
    tuta.location.directionsFromCoordinates(currentPos.geometry.location.lat, currentPos.geometry.location.lng, currentBooking.location.lat, currentBooking.location.lng, function(response) {
        
        kony.timer.schedule("renderDir", function() {
            renderDirections(frm004Home.mapMain, response, "0x0000FFFF", "", "");
            //updateMap();
            tuta.updateUserOnRoute(currentBooking.userId);
            tuta.startWatchLocation();
        }, 2, false);
    });
};

/*
  Checks for if customer is picked up every 5 seconds. If customer is picked up,
  go to next stage of trip.
  Step number: 2
  Recurring: yes
*/
tuta.updateUserOnRoute = function(userId) { //2
  /*
    Driver is now EN_ROUTE. Update the map every 4 seconds,
    Center on the driver.
  */
  mapAutoUpdateInterval = 4;
  tuta.startUpdateMapFunction();

  //Show slider
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, 0, 0, null);

  kony.timer.schedule("user", function() {
    /*
      This timer gets 
    */
    try{
      application.service("userService").invokeOperation(
      "user", {}, {
        id: userId
      },
      function(result) {
        nearbyUsers = []; //clear the array of users

        var user = {
          id: userId,
          location: {
            lat: result.value[0].location.lat,
            lng: result.value[0].location.lng
          }
        };

        //Sets global variable of customer position
        csClientLocation.latitude = user.location.lat;
        csClientLocation.longitude = user.location.lng;


        nearbyUsers.push(user);

        var csCurrentPos = {
          lat: currentPos.geometry.location.lat,
          lon: currentPos.geometry.location.lng
        };

        var csDistanceToClient = tuta.location.distance(parseFloat(csCurrentPos.lat),
          parseFloat(csCurrentPos.lon),
          parseFloat(csClientLocation.latitude),
          parseFloat(csClientLocation.longitude));
        /*
          Variables:
            var customerIsPickedUp = false;
            var customerIsDroppedOff = false;
        */

        //Pickup swipe checker
        if (customerIsPickedUp === true) {
          //Stop the current timer
          kony.timer.cancel("user");


          application.service("manageService").invokeOperation(
            "bookingUpdate", {}, {
              id: storedBookingID,
              data: {
                status: "InTransit"
              }
            },
            function(result) {
              //tuta.util.alert("INFO", "Booking status is now IN TRANSIT");
              tuta.renderRouteAndDriver();
            },
            function(error) {

            });
        }
      },
      function(error) {

      });
    }
    catch (ex){

    }
    

  }, 5, true);
};

//Draws the second leg of the route
tuta.renderRouteAndDriver = function() { //3

  //tuta.util.alert("INFO 2", "Starting to render the second route.");
  //Animate slider back down
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, "-155dp", 0, null);


  kony.timer.schedule("csDelay1", function() {
    //Slide slider ball back
    tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp", function() {
      //swipedSlider = 1;
    });

    //Change Text in Slider
    frm004Home.Label0d72c2acc7f9d4e.text = "Swipe to drop-off";
  }, 1, false);



  findAddress(currentBooking.address.description, function(success, error) {
    destination = success.results[0];
    tuta.location.directionsFromCoordinates(currentPos.geometry.location.lat, currentPos.geometry.location.lng, destination.geometry.location.lat, destination.geometry.location.lng, function(response) {

      kony.timer.schedule("renderDir", function() {
        renderDirections(frm004Home.mapMain, response, "0x0000FFFF", "", "");
        updateMap();
        tuta.updateDriverOnRoute();
        tuta.startWatchLocation();
      }, 2, false);
    });

  });
};

//Checks if customer is dropped off,
//Clears the map and resets driver state to idle
tuta.updateDriverOnRoute = function() { //4

  //Animate slider back up
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, 0, 0, null);

  nearbyUsers = [];
  // tuta.startWatchLocation();
  kony.timer.schedule("user2", function() {
    var csCurrentPos = {
      lat: currentPos.geometry.location.lat,
      lon: currentPos.geometry.location.lng
    };
    var csDestinationcoords = {
      lat: destination.geometry.location.lat,
      lon: destination.geometry.location.lng
    };
    var csDistanceToDestination = tuta.location.distance(parseFloat(csCurrentPos.lat),
      parseFloat(csCurrentPos.lon),
      parseFloat(csDestinationcoords.lat),
      parseFloat(csDestinationcoords.lon));

    // tuta.util.alert("Distance", csDistanceToClient);
    if (csDistanceToDestination < 300 && arrivedFlag === false) {
      tuta.util.alert("Alert", "You have arrived at your destination.");
      arrivedFlag = true;
    }

    if (customerIsDroppedOff === true) {
      //Stop the current timer
      kony.timer.cancel("user2");

      //Move slider away
      tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, "-155dp", "0%", null);

      //Reset state flags
      customerIsPickedUp = false;
      customerIsDroppedOff = false;
      arrivedFlag = false;

      try{
        application.service("manageService").invokeOperation(
        "bookingUpdate", {}, {
          id: storedBookingID,
          data: {
            status: "Completed"
          }
        },
        function(result) {

          //tuta.util.alert("INFO", "Booking status is now COMPLETED");
          driver_state = 0;
          frm004Home.mapMain.clear();
          updateMap();

          //Slide slider ball back
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp", function() {
            //swipedSlider = 1;
          });
          frm004Home.flexOverlay1.isVisible = true;
        },
        function(error) {

        });
      }
      catch(ex){

      }
      

    }


  }, 5, true);
};



//Methods written by Carl for use in the debug menu
tuta.csShowDistance = function() {
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
  new tuta.forms.frmDebug();
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