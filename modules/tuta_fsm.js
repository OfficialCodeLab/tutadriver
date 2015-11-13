/**
 * TUTA FSM namespace
 * @namespace tuta.fsm
 * Helper functions for finite state machine
 */

if (typeof(tuta) === "undefined") {
	tuta = {};
}

tuta.fsm = {};

tuta.fsm.STATES = {
  IDLE:0, 
  TRAWLING:1, 
  ON_ROUTE_TO_CLEINT:2, 
  ON_ROUTE_TO_DESTINATION:3
};

tuta.fsm.REQUESTS = {
  PICKUP:0, 
  FLAG_DOWN:1, 
  DROP_OFF:2, 
  VIA:3, 
  CONTINUE:4,
  ACTIVE:5
};

driver_state = tuta.fsm.STATES.TRAWLING;

// Request a state change by sending a request
tuta.fsm.stateChange = function (request){
  
  if(driver_state === tuta.fsm.STATES.IDLE){
    switch(request){
      case tuta.fsm.REQUESTS.DROP_OFF:
        driver_state = tuta.fsm.STATES.ON_ROUTE_TO_DESTINATION;
        break;

      case tuta.fsm.REQUESTS.VIA:
        driver_state = tuta.fsm.STATES.ON_ROUTE_TO_DESTINATION;
        break;

      case tuta.fsm.REQUESTS.CONTINUE:
        driver_state = tuta.fsm.STATES.ON_ROUTE_TO_DESTINATION;
        break;

      case tuta.fsm.REQUESTS.ACTIVE:
        driver_state = tuta.fsm.STATES.TRAWLING;
        break;
    }
  }
  else if (driver_state === tuta.fsm.STATES.TRAWLING){
    switch(request){
      case tuta.fsm.REQUESTS.PICKUP:
        driver_state = tuta.fsm.STATES.ON_ROUTE_TO_CLEINT;
        break;

      case tuta.fsm.REQUESTS.FLAG_DOWN:
        driver_state = tuta.fsm.STATES.IDLE;
        break;        
    }
  }	
  else{
    return;
  }
};

//Change state to idle
tuta.fsm.idling = function () {
  driver_state = tuta.fsm.STATES.IDLE;
};
