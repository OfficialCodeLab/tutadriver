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
var startAddress = null;
var currentBookings = [];
var currentDest = "";

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
var GLOBAL_GESTURE_FINGERS_1 = {fingers: 1};
var GLOBAL_BASE_RATE = 10;
var GLOBAL_MIN_DIST = 25;
var GLOBAL_FEE_KM = 12.5;
var GLOBAL_FEE_MINUTES = 12.5;
var GLOBAL_FEE_DEVIATION = 0.15; 
var GLOBAL_PROVIDER = "TUTA";
var GLOBAL_PROVIDER_EMAIL = "courtney@codelab.io";
var GLOBAL_MAX_RADIUS = 200;

//Used by the bearing function
var currentBearing = 0;

//Snazzy variables
var counter = 0;
var checklistItems = [];
//var tempPositionStart;
//var tempPositionEnd;
var timeStandingStill = 0;
var actualPickupLocation = {lat: 0, lng: 0};

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

var appState = {
  state_string: "",
  booking: "",
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
		tuta.animate.moveBottomLeft(frm001LoginScreen.flexMainButtons, 0.2, "0%", 0, null);
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
  try {
    tuta.location.loadPositionInit();
  }
  catch (ex) {
    // This is an internet connection failed handler
  }
};

//Retrieves bookings that are
//assigned to the driver based on status
tuta.retrieveBookingsStatus = function(status, callback) {
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
    // This is an internet connection failed handler
  }
};

//Retrieves booking by id
tuta.retrieveBookings = function(id, callback) {
  var input = {
    id: id
  };

  try {
    application.service("driverService").invokeOperation(
      "booking", {}, input,
      function(result) {
        try {
          callback(result);
        } catch (ex) {

        }
      },
      function(error) {
        callback(null, error);
      });
  }
  catch(ex){
    // This is an internet connection failed handler
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
      "bookingHistory", {}, input,
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
    // This is an internet connection failed handler
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
};

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
          try{
            currentBearing = bearing(currentPos.geometry.location.lat, currentPos.geometry.location.lng, position.coords.latitude, position.coords.longitude);
            //tuta.location.geoCode(position.coords.latitude, position.coords.longitude, function(s, e) {
            currentPos.geometry.location.lat = position.coords.latitude;
            currentPos.geometry.location.lng = position.coords.longitude;
            //updateMap();
            try {
              tuta.location.updateLocationOnServer(globalCurrentUser.userName, currentPos.geometry.location.lat, currentPos.geometry.location.lng, currentBearing);
            } catch (ex) {

            }


          }
          catch(e){
            tuta.util.alert("ERROR", e);
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
    tuta.addIfStandingStill();
    updateMap();
  }, mapAutoUpdateInterval, true);
};

tuta.stopUpdateMapFunction = function(){
  try{
    kony.timer.cancel("updateMapSlow");
  }
  catch(ex){

  }
};

//Creates a pickup request and shows it to the driver
//TODO: Refactor this into the pickup request form.
//Difficulty: Medium
tuta.pickupRequestInfo = function(userID, address) {

  var input = {
    id: userID
  };


  try{
    application.service("driverService").invokeOperation(
      "user", {}, input,
      function(results) {
        frmPickupRequest.lblCustomerName.text = results.value[0].userInfo.firstName + " " + results.value[0].userInfo.lastName;
        frmPickupRequest.rtPickupLocation.text = address;
        tuta.location.geoCode(results.value[0].location.lat, results.value[0].location.lng, function(success, error) {
          var loc = success.results[0].formatted_address.replace(/`+/g, "");
          if(loc.length > 27)
            loc = shortenText(loc, 25);
          frmPickupRequest.lblViaPath.text = loc;
          tuta.forms.frmPickupRequest.show();
        });

      },
      function(error) {

      });
  }
  catch(ex){
    // This is an internet connection failed handler
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
    // This is an internet connection failed handler
  }
};




//Accepts whatever booking gets passed through to the method,
//Triggers rendering of the route on the map.
tuta.acceptBooking = function(bookingID) {
  tuta.events.updateDriverState("OnRoute");
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
    // This is an internet connection failed handler
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
    // This is an internet connection failed handler
  }
};


tuta.createBooking = function(address, user){
  tuta.events.updateDriverState("InTransit");
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

tuta.createBookingHistory = function(bookingID, cost){

  storedBookingID = bookingID;
  tuta.location.geoCode(currentPos.geometry.location.lat, currentPos.geometry.location.lng, function(success, error){

    var data = { 
      _id: bookingID,
      providerId : globalCurrentUser.userName, 
      userId : currentBooking.user, 
      address : {
        start: startAddress.formatted_address.replace(/`+/g,""),
        end: success.results[0].formatted_address.replace(/`+/g,"")
      },
      info : {
        date: (new Date()).getTime(),
        cost: cost
      }
    };

    var input = { data: JSON.stringify(data) };

    application.service("manageService").invokeOperation(
      "bookingHistoryAdd", {}, input,
      function(result) {
      },
      function(error) {
        // the service returns 403 (Not Authorised) if credentials are wrong
      }
    );
  });
};

tuta.updateBookingHistoryRating = function(bookingID, rating, callback){

  var input = { id: bookingID, user : "driver", rating : rating.toString() };

  try {
    application.service("manageService").invokeOperation(
      "bookingHistoryUpdateRating", {}, input,
      function(result) {
        callback();
      },
      function(error) {
        // the service returns 403 (Not Authorised) if credentials are wrong
      }
    );   
  } catch (ex) {
    // This is an internet connection failed handler
  }
};



//Retrive all the provider's messages from the server
tuta.getMessages = function(callback) {
  var input = {
    providerId: globalCurrentUser.userName
  };
  try{
    application.service("driverService").invokeOperation(
      "messages", {}, input ,
      function(results) {   
        callback(results.value);
      },
      function(error) {
        //tuta.util.alert("ERROR", error);
      });
  }
  catch (ex){
    // This is an internet connection failed handler
  }
};

/*Sends a message to the user
  @Params:
    id: The user to send the message to
   text: The text to send
   callback: function to run on success
*/
tuta.createMessage = function(id, text, callback) {
  var input = {
    providerId: id,
    text : text,
    sender : globalCurrentUser.userName
  };

  var data = {data: JSON.stringify(input)};
  try{
    application.service("manageService").invokeOperation(
      "messageAdd", {}, data,
      function(result) {   
        callback(null);
      },
      function(error) {
        callback(null,error);
      });
  }
  catch (ex){
    // This is an internet connection failed handler
  }
};

tuta.readMessage = function(id) {
  var input = {
    id: id
  };
  try{
    application.service("manageService").invokeOperation(
      "messageRead", {}, input,
      function(results) {   
      },
      function(error) {
        //tuta.util.alert("ERROR", error);
      });
  }
  catch (ex){
    // This is an internet connection failed handler
  }
};

/*  
  Runs when the booking is accepted
  Step number: 1
  Recurring: No
  Recurring sub-methods: yes
*/
tuta.renderRouteAndUser = function() { //1
  driver_state = tuta.fsm.STATES.ON_ROUTE_TO_CLEINT;

  tuta.location.geoCode(currentBooking.location.lat, currentBooking.location.lng, function(success, error){
    //tuta.util.alert("TEST", JSON.stringify(success.results[0].formatted_address.replace(/\s+/g,"+").replace(/`+/g,"")));
    //tuta.events.directionsMaps(success.results[0].formatted_address.replace(/\s+/g,"+").replace(/`+/g,"")); 
  });

  tuta.location.directionsFromCoordinates(currentPos.geometry.location.lat, currentPos.geometry.location.lng, currentBooking.location.lat, currentBooking.location.lng, function(response) {

    //tuta.events.directionsMaps(response.legs[0].end_address.replace(/\s+/g,"+").replace(/`+/g,"")); 
    kony.timer.schedule("renderDir", function() {
      renderDirections(frm004Home.mapMain, response, "0x0000FFFF", "", "");
      //updateMap();
      tuta.updateUserOnRoute(currentBooking.userId);

      //Remove the map centering button
      try{
        frm004Home.flexMapCenter.setVisibility(false);
      }
      catch(ex){
        //tuta.util.alert("Info", "Unable to remove the map centering button.");
      }
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


            tuta.events.updateDriverState("InTransit");
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
      // This is an internet connection failed handler
    }


  }, 5, true);
};

//Draws the second leg of the route
tuta.renderRouteAndDriver = function() { //3


  driver_state = tuta.fsm.STATES.ON_ROUTE_TO_DESTINATION;
  var point = {
    lat: currentPos.geometry.location.lat, 
    lng: currentPos.geometry.location.lng
  };

  //tuta.route.createRoute(storedBookingID, point);

  //tuta.events.routeHandler();

    currentDest = currentBooking.address.description;

    tuta.animate.move(frm004Home.flexArrivalMessage, 0, frm004Home.flexArrivalMessage.top, "5%", null);
  //tuta.events.directionsMaps(currentBooking.address.description);
  tuta.location.geoCode(currentPos.geometry.location.lat, currentPos.geometry.location.lng, function(success, error){
    startAddress = success.results[0];
  });
  //Set actual pickup location
  actualPickupLocation.lat = currentPos.geometry.location.lat;
  actualPickupLocation.lng = currentPos.geometry.location.lng;
  timeStandingStill = 0;
  distanceTravelled = 0;

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
        //tuta.startWatchLocation();
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

            try{
              kony.timer.cancel("routeHandler");
            }
            catch(ex){}
            /*
            tuta.routes.addPoints(storedBookingID, routePoints, function(){
              routePoints = [];
            });
            */

            driver_state = 0;
            frm004Home.mapMain.clear();
            updateMap();

            //Slide slider ball back
            tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp", function() {
              //swipedSlider = 1;
            });

            var tripCostFinal = distanceTraveled/1000 * GLOBAL_FEE_KM + GLOBAL_FEE_MINUTES*timeStandingStill/60 + GLOBAL_BASE_RATE;
            tripCostFinal = tripCostFinal.toFixed(2);
            var dateTemp = new Date();
            var mmStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            // Get different date elemetns
            var dd = dateTemp.getDate();
            var mm = dateTemp.getMonth(); //January is 0
            var yyyy = dateTemp.getFullYear();
            var hour = dateTemp.getHours();
            var min = dateTemp.getMinutes();
            var ampm = "AM";

            // Format date elemtens
            if (dd < 10) { dd = '0' + dd; }
            if (hour > 12) { hour = hour - 12; ampm = "PM"; }
            if (hour < 10) { hour = '0' + hour; }
            if (min < 10) { min = '0' + min; }

            // Cut of .0 decimal points
            var ddtext = Math.round(dd) + "";
            var yyyytext = Math.round(yyyy) + "";
            frm004Home.lblTime.text = ddtext + " " + mmStr[mm] + " " + yyyytext + " AT " + hour + ":" + min + " " + ampm;
            frm004Home.lblCost.text = "R" + tripCostFinal;
            frm004Home.flexOverlay1.isVisible = true;
            tuta.createBookingHistory(storedBookingID, tuta.events.getCost(frm004Home.lblCost.text));
          },
          function(error) {

          });
      }
      catch(ex){
        // This is an internet connection failed handler
      }
    }
  }, 5, true);
};

var tempPositionStart = {lat: 0, lng: 0};
var tempPositionEnd = {lat: 0, lng: 0};
var distanceTraveled = 0;
tuta.addIfStandingStill = function(){
  if(driver_state === tuta.fsm.STATES.ON_ROUTE_TO_DESTINATION){

    try{
      if (counter < 8 ){
        //Set first location to compare
        if(counter === 0 ){
          tempPositionStart.lat = currentPos.geometry.location.lat;
          tempPositionStart.lng = currentPos.geometry.location.lng;
        }
        /*
    tuta.util.alert("Info", "Counter is zero\n\n" + 
      "Start position LAT: " + tempPositionStart.lat + "\n" + 
      "Start position LNG: " + tempPositionStart.lng);*/
        counter += mapAutoUpdateInterval;
      }
      else {
        //Set second location to compare
        tempPositionEnd.lat = currentPos.geometry.location.lat;
        tempPositionEnd.lng = currentPos.geometry.location.lng;

        var tempDist = tuta.location.distance(tempPositionStart.lat, tempPositionStart.lng, tempPositionEnd.lat, tempPositionEnd.lng);
        if (tempDist <= GLOBAL_MIN_DIST){
          timeStandingStill += counter;
        }
        else{
          distanceTraveled += tempDist;
        }
        /*
    tuta.util.alert("Info 2", "Counter is " + counter + "\n" + "Time standing still: " + timeStandingStill + "\n" + 
      "Compared Distance: " + tempDist + 
      "Start position LAT: " + tempPositionStart.lat + "\n" + 
      "Start position LNG: " + tempPositionStart.lng + "\n" + 
      "End Position LAT: " + tempPositionEnd.lat + "\n" + 
      "End Position LNG: " + tempPositionEnd.lng);*/
        counter = 0;
      }
      //tuta.routes.pushPoint(currentPos.geometry.location.lat, currentPos.geometry.location.lng); 


    }
    catch(ex){
      // This is an internet connection failed handler
    }
  }

};

tuta.resetMap = function(){
  customerIsPickedUp = false;
  customerIsDroppedOff = false;
  arrivedFlag = false;
  tuta.animate.moveBottomLeft(frm004Home.flexFooter, 0.1, "0dp", 0, null);
  tuta.animate.moveBottomLeft(frm004Home.flexDriverFooter, 1, "-155dp", "0%", null);
  tuta.animate.move(frm004Home.imgSliderball, 0, "", "5dp", null);
  frm004Home.mapMain.clear();
  tuta.events.updateDriverState("Idle");
  driver_state = 0;
  nearbyUsers = [];
  storedBookingID = null;
  destination = null;
  mapFixed = false;
  mapAutoUpdateInterval = 5;
  timeStandingStill = 0;
  counter = 0;
  distanceTravelled = 0;
  //Show map center button
  try{
    frm004Home.flexMapCenter.setVisibility(true);
  }
  catch(ex){
    //tuta.util.alert("Info", "Unable to remove the map centering button.");
  }
  
  var loc = {lat:currentPos.geometry.location.lat,lng:currentPos.geometry.location.lng};
  tuta.map.navigateTo(loc);
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
  new tuta.forms.frmEditProfile();

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
