if (typeof(tuta) === "undefined") {
  tuta = {};
}

var GLOBAL_ENCODING_PREFIX = "AS";

tuta.appstate = {};

tuta.appstate.getState = function(){  
  var state_str_key = tuta.appstate.getEncodedKey();
  var encoded_state = kony.store.getItem(state_str_key);
  if(encoded_state !== null && encoded_state !== undefined){
    var state_obj = JSON.parse(Base64.decode(encoded_state));
    appState.state_string = state_obj.state_string;
    appState.booking = state_obj.booking;
    return true;
  }
  
  return false;
};

tuta.appstate.setState = function(state_str, bookingID){
  var state_str_key = tuta.appstate.getEncodedKey();
  appState.state_string = state_str || "NONE";
  appState.booking = bookingID || "NONE";
  var encoded_state = Base64.encode(JSON.stringify(appState));
  kony.store.setItem(state_str_key, encoded_state);
};

tuta.appstate.clearState = function(){
  var state_str_key = tuta.appstate.getEncodedKey();
  kony.store.removeItem(state_str_key);
};

tuta.appstate.checkState = function(callback){
  if(tuta.appstate.getState()){
    var current_state = appState.state_string;
    var current_booking = appState.bookingID;

    //Use the current booking and state string to retrieve booking and callback
    if(current_booking !== "NONE"){
      tuta.retrieveBooking(current_state, function(result){
        storedBookingID = current_booking;
        currentBooking = {
          userId: result.value[0].userId,
          providerId: result.value[0].providerId,
          address: {
            description: result.value[0].address.description
          },
          location: {
            lat: currentPos.geometry.location.lat + "",
            long: currentPos.geometry.location.lng + ""
          },
          status: current_state
        };
        
        callback(current_state);
      });
    }
    else if (current_state !== "NONE"){
      //TODO: Handle other states
    }
  }  
  return;
};

tuta.appstate.getEncodedKey = function(key){
  return GLOBAL_ENCODING_PREFIX + Base64.encode(key) || GLOBAL_ENCODING_PREFIX + Base64.encode(globalCurrentUser.userName);
};

