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
var country = null;

//Variables pertaining to the current booking
var currentBooking = null;
var storedBookingID = null;
var storedBooking;
var destination = null;
var flagdownComplete = false;

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
var mapFixed = false;

//STATIC VARIABLES
var GLOBAL_BASE_RATE = 40;

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

//Debug
var staticMapImageResource = "HOLDER TEXT";
/*=============================================================================
  _   _                                                
 | \ | | __ _ _ __ ___   ___  ___ _ __   __ _  ___ ___ 
 |  \| |/ _` | '_ ` _ \ / _ \/ __| '_ \ / _` |/ __/ _ \
 | |\  | (_| | | | | | |  __/\__ \ |_) | (_| | (_|  __/
 |_| \_|\__,_|_| |_| |_|\___||___/ .__/ \__,_|\___\___|
                                 |_|                   
=============================================================================*/

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

//Initiates the entire app with the tech user,
//Very important. Leave this here.
tuta.initCallback = function(error) {
  application.login("techuser@ssa.co.za", "T3chpassword", function(result, error) {
    if (error) tuta.util.alert("Login Error", error);
    else {

    }
  });

};

/*=============================================================================
  __  __      _   _               _     
 |  \/  | ___| |_| |__   ___   __| |___ 
 | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
 | |  | |  __/ |_| | | | (_) | (_| \__ \
 |_|  |_|\___|\__|_| |_|\___/ \__,_|___/
                                        
=============================================================================*/


//Loads position of user into app (at login screen), starts watching the user's location,
//Updates every two seconds.
tuta.loadInitialPosition = function() {
  tuta.location.loadPositionInit();
};

//Retrieves bookings that are
//assigned to the driver based on status
tuta.retrieveBookings = function(status, callback) {
    var input = {
        userid: globalCurrentUser.userName,
        status: status
    };

    try {
        application.service("driverService").invokeOperation(
            "bookings", {}, input,
            function(results) {
                try {
                    callback(results);
                } catch (ex) {

                }
            },
            function(error) {
                callback(null, error);
            });
    }
    catch(ex){

    }
};

//Retrieves completed bookings that are
//assigned to the driver based
tuta.retrieveBookingsHistory = function(callback) {
    var input = {
        userid: globalCurrentUser.userName
    };

    try {
        application.service("driverService").invokeOperation(
            "bookingsHistory", {}, input,
            function(results) {
                try {
                    callback(results);
                } catch (ex) {

                }
            },
            function(error) {
                callback(null, error);
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
    watchID = kony.store.getItem("watch");    
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
      kony.store.setItem("watch", watchID);
      initialized = 1;
    } else {
      kony.location.clearWatch(watchID);
      kony.store.removeItem("watch");
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

tuta.checkCancellation = function (bookingID){
  var input = {
    id: bookingID
  };

  //set global variable
  try{
    application.service("driverService").invokeOperation(
    "booking", {}, input,
    function(result) {
      if(result.value[0].status === "Cancelled"){
        tuta.resetMap();
        try{
          kony.timer.cancel("user");
        }
        catch(ex){
          
        }
      }
    },
    function(error) {

    });
  }
  catch (ex){

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
      tuta.animate.moveBottomLeft(frm004Home.flexFooter, 0.1, "-80dp", 0, null);
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


tuta.createBooking = function(address, user){
  currentBooking = {
    userId: user,
    providerId: globalCurrentUser.userName + "",
    address: {
      description: address.formatted_address.replace(/`+/g,"") + ""
    },
    location: {
      lat: currentPos.geometry.location.lat + "",
      long: currentPos.geometry.location.lng + ""
    },
    status: "InTransit"
  };
  

  var input = { data : JSON.stringify(currentBooking) };
  //tuta.util.alert("TEST", input);

  application.service("driverService").invokeOperation(
    "book", {}, input,
    function(result) {
      tuta.animate.moveBottomLeft(frm004Home.flexFooter, 0.1, "-80dp", 0, null);
      customerIsPickedUp = true;
      storedBookingID = result.value[0].id;
      mapFixed = true; 
      tuta.renderRouteAndDriver();
      
    },
    function(error) {
      // the service returns 403 (Not Authorised) if credentials are wrong
      tuta.util.alert("Error " + error.httpStatusCode, error.errmsg);
    }
  );
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
  mapFixed = true;
  tuta.startUpdateMapFunction();

  //Show slider
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, 0, 0, null);
  //TODO: GET CUSTOMER NAME AND DISPLAY ON FOOTER

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
        
        tuta.checkCancellation(storedBookingID);

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
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, "-86dp", 0, null);


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
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, "-86dp", 0, null);

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

tuta.resetMap = function(){
  customerIsPickedUp = false;
  customerIsDroppedOff = false;
  arrivedFlag = false;
  tuta.animate.moveBottomLeft(frm004Home.flexFooter, 0.1, "0dp", 0, null);
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, "-155dp", "0%", null);
  tuta.animate.move(frm004Home.imgSliderball, 0, "", "5dp", null);
  frm004Home.mapMain.clear();
  driver_state = 0;
  nearbyUsers = [];
  storedBookingID = null;
  destination = null;
  mapFixed = false;
  mapAutoUpdateInterval = 5;
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
  new tuta.forms.frmDebugConsole();

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