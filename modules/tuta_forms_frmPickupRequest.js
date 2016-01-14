if (typeof(tuta) === "undefined") {
    tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
    tuta.forms = {};
}

tuta.forms.frmPickupRequest = function() {
    // initialize controller 
    tuta.forms.frmPickupRequest = new tuta.controller(frmPickupRequest);

    // Initialize form events 
    tuta.forms.frmPickupRequest.onInit = function(form) {

    };

    tuta.forms.frmPickupRequest.onPreShow = function(form) {
        var self = this;
        this.control("btnTopDismiss").onClick = function(button) {
            frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;
        }
        this.control("btnBottomDismiss").onClick = function(button) {
            frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;
        }
        this.control("btnLeftDismiss").onClick = function(button) {
            frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;
        }
        this.control("btnRightDismiss").onClick = function(button) {
            frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;
        }
        this.control("btnCancel").onClick = function(button) {
            frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;
        }

        this.control("btnDecline").onClick = function(button) {
            frmPickupRequest["flexConfirmCancel"]["isVisible"] = true;
        };

        this.control("btnAcceptRequest").onClick = function(button) {
          try{
            kony.timer.cancel("startwatch");
            kony.timer.cancel("autoRejectionTimer");
          }catch(ex){}
            tuta.acceptBooking(currentBooking.id);
            tuta.forms.frm004Home.show();
            tuta.fsm.stateChange(tuta.fsm.REQUESTS.PICKUP);
            //TODO: START TRIP
            //pickupRequest();
            //frm004Home.show();
        };

        /*  
        TODO:
            Schedule recursive kony timer as a while loop, counting down from 30.
            When the timer hits 30,  cancel the timer, and automatically reject 
            the pickup request.
        */
        var rejectionTimerTicker = 30;
        frmPickupRequest.lblTimeRemaining.text = "30 second(s) remain";

        kony.timer.schedule("autoRejectionTimer", function() {

            frmPickupRequest.lblTimeRemaining.text = rejectionTimerTicker + " second(s) remain";

            if (rejectionTimerTicker <= 0){
                try{
                    kony.timer.cancel("autoRejectionTimer");
                    tuta.rejectBooking(currentBooking.id);
                    tuta.forms.frm004Home.show();
                }
                catch(ex){

                }
            }

        }, 1, true);

        this.control("btnConfirm").onClick = function(button) {
            try{
                kony.timer.cancel("autoRejectionTimer");
            }
            catch(ex){
                
            }
            frmPickupRequest["flexConfirmCancel"]["isVisible"] = false;
            tuta.rejectBooking(currentBooking.id);
            tuta.forms.frm004Home.show();
        }

        
        
        
    };  


    tuta.forms.frmPickupRequest.onPostShow = function(form) {
        var self = this;
        /*this.header("btnMenu").onClick =function(button) {
          self.topMenu.toggle();
        };*/
    };
};

//Testing putting functions here:
function pickupRequest() {
    var oldState = driver_state;
    tuta.fsm.stateChange(tuta.fsm.REQUESTS.PICKUP);


    if (oldState !== driver_state) {
        tuta.forms.frm004Home.show();
        tuta.mobile.alert("On route", "Taxi is now on route to client");
    } else {
        tuta.forms.frm004Home.show();
        tuta.mobile.alert("ERROR", "Taxi is idle and cannot recieve pickup requests");
    }


    //tuta.mobile.alert("STATE CHANGE", "" + driver_state);
};