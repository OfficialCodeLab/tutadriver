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
var currentLocation;
var globalCurrentUser = {};

var storedBooking;
var destination = null;

var watchID = null;
var initialized = 0;

var currentPos = 
    {
      geometry: {
        location: {
          lat: 0,
          lng: 0                 
        }
                  
      },
                  
      formatted_address: ""
                 
    };

var loggedUser = null;
var currentBooking = null;

//Code for handling stars in rating menu
var star = [];
var lastStarSelected = 0;
var toggleImage;

if (typeof(tuta) === "undefined") {
  tuta = {};
}

// global reference to your app object
var application = null;

//Debug Testing Variables
var storedBookingID = null;
var csClientLocation = {
  latitude: 0,
  longitude: 0
};
var csDestination = {
  latitude: 0,
  longitude: 0
};
var csBookingInTransit = false;
var customerIsPickedUp = false;
var customerIsDroppedOff = false;

//End of debug Variables

/*
  This is a hack so you can use this framework in
    Visualizer functional previews
*/
function initApp() {
  //ssa.util.alert("INIT");
  tuta.init();
}

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
//End of rating menu code

//END OF INIT FUNCTION

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

function searchTxtChange() {

  if (frmMessageMain.txtSearch.text === "") {
    frmMessageMain.imgSearchIcon.isVisible = true;
  } else {
    frmMessageMain.imgSearchIcon.isVisible = false;
  }
}

function resetSearch() {
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
    if (result.status === "ZERO_RESULTS") {
      //popNoResults.show();
      frm004Home.txtDest.text = "";
      //frm004Home.txtPick.text = "";
    } else {
      frm004Home.flexAddressList.setVisibility(true);
      frm004Home.flexAddressShadow.setVisibility(true);
      frm004Home.segAddressList.widgetDataMap = {
        lblAddress: "formatted_address"
      };
      frm004Home.segAddressList.setData(result.results);
      frm004Home.txtDest.text = "";
      //frm004Home.txtPick.text = "";
    }
  });
}

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

var nearbyUsers = [];
var currentPin = "cabpin0.png";

function updateMap() {
  // frm004Home.mapMain.zoomLevel = tuta.location.zoomLevelFromLatLng(currentPos.geometry.location.lat, currentPos.geometry.location.lng);

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


  //if(frm004Home.flexAddress.isVisible == false)
  // pickupicon = "pickupicon.png";

  //  var count = 0;
  //  while(nearbyUsers !== [] && count <= nearbyUsers.length-1){
  if (nearbyUsers.length > 0) {
    locationData.push({
      lat: "" + nearbyUsers[0].location.lat + "",
      lon: "" + nearbyUsers[0].location.lng + "",
      name: nearbyUsers[0].id,
      desc: "",
      image: "pickupicon.png"
    });
  }
  // count++;
  // }

  //#ifdef iphone
	frm004Home.mapMain.zoomLevel = 14;
  //#endif
  
  //ifdef android
  frm004Home.mapMain.zoomLevel = 12;
  //#endif

  frm004Home.mapMain.locationData = locationData;



  //frmMap.mapMain.zoomLevel = 10;
  //frmMap.mapMain.locationData
  // setZoomLevelFromBounds();
  /*
    var pickupicon = "";
    if(frmMap.flexAddress.isVisible == false)
      pickupicon = "pickupicon.png";


    var locationData = [];
    locationData.push(
      {lat: "" + pickupPoint.geometry.location.lat + "", 
       lon: "" + pickupPoint.geometry.location.lng + "", 
       name:"Pickup Location", 
       desc: pickupPoint.formatted_address.replace(/`+/g,""), 
       image : pickupicon + ""});

    if(destination != null) {
      locationData.push(
        {lat: "" + destination.geometry.location.lat + "", 
         lon: "" + destination.geometry.location.lng + "", 
         name:"Destination", 
         desc: destination.formatted_address.replace(/`+/g,""), 
         image : "dropofficon.png"});  
    }

    frmMap.mapMain.locationData = locationData;*/
}

function updateConsole() {
  frm004Home.rtConsole.text = "<strong>Floating Console:</strong><br><br>Current State: " + driver_state;
}


function frm003CheckboxToggle(widget) {
  //var widget = toggleImage;
  if (widget.isVisible === false) {
    widget["isVisible"] = true;
  } else {
    widget["isVisible"] = false;
  }
}

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


var menuOpen = false;

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

tuta.initCallback = function(error) {
  application.login("techuser@ssa.co.za", "T3chpassword", function(result, error) {
    if (error) tuta.util.alert("Login Error", error);
    else {


    }
  });

};

tuta.loadInitialPosition = function() {
  tuta.location.loadPositionInit();
  kony.timer.schedule("startwatch", function() {
    tuta.startWatchLocation();
  }, 2, false);
}



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
                //for(var i = 0; i < results.value.length; i++){
                //  tuta.util.alert("TEST", JSON.stringify(results.value[i].id));        
                // }
                try {
                    currentBooking = results.value[0];
                    tuta.animate.move(frm004Home.imgSwitch, 0, "", "38", null);
                    tuta.fsm.stateChange(tuta.fsm.REQUESTS.BREAK);
                    frm004Home.imgSwitchBg.src = "switchbgoff.png";
                    updateConsole();
                    tuta.pickupRequestInfo(results.value[0].userId, results.value[0].address.description);
                } catch (ex) {

                }

                //tuta.util.alert("TEST", JSON.stringify(results.value[0]));

            },
            function(error) {
                //tuta.util.alert("ERROR", error);
                //tuta.util.alert("ERROR", "Failed to retrieve bookings. Please check your internet connection, restart the app, and try again.");
            });
    }
    catch(ex){

    }
};

var currentBearing = 0;
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

tuta.stopWatchLocation = function() {
  try {
    kony.timer.cancel("updateMapSlow");
  } catch (ex) {

  }
};

tuta.startUpdateMapFunction = function() {
  try {
    kony.timer.cancel("updateMapSlow");

  } catch (ex) {}
  kony.timer.schedule("updateMapSlow", function() {
    updateMap();
  }, 4, true);
};



function shortenText(str, len) {
  var newStr = "";
  if (str.length > len)
    newStr = str.substring(0, (len - 1)) + "...";

  return newStr;
}

function toggleImage(widget) {
  //var widget = toggleImage;
  if (widget.isVisible === false) {
    widget["isVisible"] = true;
  } else {
    widget["isVisible"] = false;
  }
}

tuta.pickupRequestInfo = function(userID, address) {

  var input = {
    id: userID
  };


  try{
    application.service("userService").invokeOperation(
      "user", {}, input,
      function(results) {
        //tuta.util.alert("TEST", JSON.stringify(results));
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
        //tuta.util.alert("ERROR", error);
      });
  }
  catch(ex){

  }
};

tuta.assignBooking = function() {

  var inputdata = {
    providerId: "serv8@ssa.co.za"
  };
  var input = {
    data: JSON.stringify(inputdata),
    id: "RoDgyMotuFrY1dCb"
  };

  try{
  application.service("manageService").invokeOperation(
    "bookingUpdate", {}, input,
    function(results) {
      tuta.util.alert("TEST", JSON.stringify(results));

    },
    function(error) {
      //tuta.util.alert("ERROR", error);
    });
  }
  catch (ex){

  }


};

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
      //tuta.util.alert("TEST", JSON.stringify(currentBooking));
      tuta.renderRouteAndUser();
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
      updateMap();
      tuta.updateUserOnRoute(currentBooking.userId);
      tuta.startWatchLocation();
    }, 2, false);
  });
};


/*
  Checks for if customer is picked up every 5 seconds. If customer is picked up,
  go to next stage of trip.
*/
tuta.updateUserOnRoute = function(userId) { //2

  //Show slider
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, 0, 0, null);

  kony.timer.schedule("user", function() {

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
        /*
          if (csDistanceToClient <= 300) {
            //Stop the distance checker
            kony.timer.cancel("user");

            
              DO NOT DELETE THIS CODE!!!!

              kony.timer.schedule("transitChecker", function() {
                inputBooking = {
                  id: currentBooking.id
                };

                application.service("driverService").invokeOperation(
                  "booking", {}, inputBooking,
                  function(result) { //This is the default function that runs if the query is succesful, if there is a result.
                    if (result.value[0].status === "InTransit") {
                      //tuta.util.alert("Refreshed Booking Info", result.value[0]);
                      kony.timer.cancel("transitChecker");
                      //storedBookingID = result.value[0];
                      tuta.renderRouteAndDriver();
                      //tuta.fetchDriverInfo(result.value[0].providerId);
                      //yourBooking = bookingID;
                    }
                  },
                  function(error) { //The second function will always run if there is an error.
                    tuta.util.alert("error", error);
                  }
                );
              }, 5, true);
          }
        */
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

var arrivedFlag = false;

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



//Carl
tuta.csShowDistance = function() {
  var csCurrentPos = {
    lat: currentPos.geometry.location.lat,
    lon: currentPos.geometry.location.lng
  };
  var csDestinationPos = {
    lat: -34.055390,
    lon: 18.822428
  };
  /*
        var csCurrentPos = {
          lat: "" + currentPos.geometry.location.lat + "", 
          lon: "" + currentPos.geometry.location.lng + ""
        }
        */

  tuta.util.alert("Current Position", "" +
    "\nLatitude: " + csCurrentPos.lat +
    "\nLongitude: " + csCurrentPos.lon + "\n" +
    "\nSecond Position" +
    "\nLatitude: " + csDestinationPos.lat +
    "\nLongitude: " + csDestinationPos.lon);

  var csTestDistance = tuta.location.distance(csCurrentPos.lat, csCurrentPos.lon, csDestinationPos.lat, csDestinationPos.lon);
  //tuta.util.alert("Distance is " + csTestDistance);

  /*
      var startPosition = {
        latitude: null,
        longitude: null
      }
      var endPosition = {
        latitude: null,
        longitude: null
      }
    */
  //tuta.location.distance();
};

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

/*tuta.assignBooking = function(){

  var inputdata = {providerId : "serv8@ssa.co.za"};
  var input = {data: JSON.stringify(inputdata), id : "RoDgyMotuFrY1dCb"};
  application.service("manageService").invokeOperation(
    "bookingUpdate", {}, input, 
    function(results){
      tuta.util.alert("TEST", JSON.stringify(results));

    }, function(error){
      tuta.util.alert("ERROR", error);
    });
};*/

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