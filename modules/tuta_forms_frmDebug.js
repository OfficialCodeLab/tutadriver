if (typeof(tuta) === "undefined") {
  tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
  tuta.forms = {};
}

tuta.forms.frmDebug = function() {
  // initialize controller 
  tuta.forms.frmDebug = new tuta.controller(frmDebug); 

  // Initialize form events	
  tuta.forms.frmDebug.onInit = function(form) {
  };  

  tuta.forms.frmDebug.onPreShow = function(form) {
    var self = this;

    this.control("btnBack").onClick = function (button) {tuta.forms.frm004Home.show();};

    //Controls the flag for the map overlay
    this.control("btnTickPress1").onClick = function (button) {
      toggleImage(frmDebug.imgTickIcon1);
    };

    this.control("btnTickPress2").onClick = function (button) {    
      toggleImage(frmDebug.imgTickIcon2);
    };
    
    this.control("btnTickPress3").onClick = function (button){
      toggleImage(frmDebug.imgTickIcon3);
    };

    this.control("btnTickPress4").onClick = function (button){
      toggleImage(frmDebug.imgTickIcon4);
    };

    this.control("btnTickPress5").onClick = function (button){
      try {
        tuta.events.csShowDistance();
      }
      catch (exception){
        tuta.util.alert("ERROR", "Something went wrong with showing the distance.");
      }
    };

    this.control("btnTickPress6").onClick = function (button){
      try {
        tuta.util.alert("Current User", currentBooking);
        
      }
      catch (exception){
        tuta.util.alert("Error", "Something went wrong with showing the User ID.");
      }
    };

  };//END OF PRE-SHOW

  tuta.forms.frmDebug.onPostShow = function(form) {
    var self = this;
  };
};

