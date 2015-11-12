/**
 * TUTA Mobile namespace
 * @namespace tuta.mobile
 */
if (typeof(tuta) === "undefined") {
	tuta = {};
}

tuta.util = {};


tuta.util.STATES = {
  IDLE:0, 
  TRAWLING:1, 
  ON_ROUTE_TO_CLEINT:2, 
  ON_ROUTE_TO_DESTINATION:3
};

tuta.util.REQUESTS = {
  PICKUP:0, 
  FLAG_DOWN:1, 
  DROP_OFF:2, 
  VIA:3, 
  CONTINUE:4,
  ACTIVE:5
};

driver_state = tuta.util.STATES.IDLE;

tuta.util.request = function (request){
  
  if(driver_state === tuta.util.STATES.IDLE){
    switch(request){
      case tuta.util.REQUESTS.DROP_OFF:
        driver_state = tuta.util.STATES.ON_ROUTE_TO_DESTINATION;
        break;

      case tuta.util.REQUESTS.VIA:
        driver_state = tuta.util.STATES.ON_ROUTE_TO_DESTINATION;
        break;

      case tuta.util.REQUESTS.CONTINUE:
        driver_state = tuta.util.STATES.ON_ROUTE_TO_DESTINATION;
        break;

      case tuta.util.REQUESTS.ACTIVE:
        driver_state = tuta.util.STATES.TRAWLING;
        break;
    }
  }
  else if (driver_state === tuta.util.STATES.TRAWLING){
    switch(request){
      case tuta.util.REQUESTS.PICKUP:
        driver_state = tuta.util.STATES.ON_ROUTE_TO_CLEINT;
        break;

      case tuta.util.REQUESTS.FLAG_DOWN:
        driver_state = tuta.util.STATES.IDLE;
        break;        
    }
  }	
  else{
    return;
  }
};

tuta.util.idling = function () {
  driver_state = tuta.util.STATES.IDLE;
};


tuta.util.getType = function (elem) {
  return Object.prototype.toString.call(elem);
};

tuta.util.alert = function (title,message) {
  
  var stringMessage = message;
  
  // the kony alert object does not automatically convert Object to string on android
  // platform. If the message param is not a string we should convert it to one
  if(tuta.util.getType(message) != '[object String]') {
    stringMessage = JSON.stringify(message);
  } 
  
  var basicConf = {message: stringMessage ,alertType: constants.
  ALERT_TYPE_INFO,alertTitle: title,yesLabel:"ok",
  noLabel: "no", alertHandler: null};
	
  //Defining pspConf parameter for alert
  var pspConf = {};

  //Alert definition
  var infoAlert = kony.ui.Alert(basicConf,pspConf); 
};

tuta.util.random = function(low,high,round) {
  var val = Math.random() * (high - low) + low;
  return round ? Math.round(val) : val;
};

tuta.util.radians = function(degrees) {
	return degrees * (Math.PI/180);
};


