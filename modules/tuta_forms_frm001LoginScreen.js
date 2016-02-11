if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frm001LoginScreen = function() {
// initialize controller 
  tuta.forms.frm001LoginScreen = new tuta.controller(frm001LoginScreen); 

  // Initialize form events	
  tuta.forms.frm001LoginScreen.onInit = function(form) {
  };  

  tuta.forms.frm001LoginScreen.onPreShow = function(form) {
    var self = this;
    tuta.map.stopMapListener();

    this.moveLoginButtons = new tuta.controls.menu( 
      this.control("flexMainButtons"),
      this.control("flexLoginButtons"), 
      tuta.controls.position.RIGHT, 
      tuta.controls.behavior.MOVE_OVER, 
      0.3
    );

    /*this.control("imgTutaLogo").onTouchStart = function(){
      self.control("txtEmail").text = "craig@ssa.com";
      self.control("txtPassword").text = "1";
    };*/

    this.control("btnLogin2").onClick = function(button) {
      if(self.control("txtEmail").text === "" || self.control("txtEmail").text === null){
        tuta.util.alert("Error", "Please enter your email");  
        self.control("txtPassword").text = "";
      }
      else if (self.control("txtPassword").text === "" || self.control("txtPassword").text === null){
        tuta.util.alert("Error", "Please enter your password");        
      }
      else{
        //Inputs stored as a JSON object temporarily
        var inputs = { userName : self.control("txtEmail").text.toLowerCase() , password : self.control("txtPassword").text };

        // try log user in
        application.service("userService").invokeOperation(
          "login", {}, inputs,
          function(result) {
            // tuta.util.alert("LOGIN SUCCESS", result.value);
            self.control("txtEmail").text = "";
            self.control("txtPassword").text = "";
            loggedUser = inputs.userName;

            //Creates a new item, "user", in the store. 
            //User is the key / ID, and contains a JSON structure as a value
            //kony.store.setItem("user", JSON.stringify(inputs));

            globalCurrentUser = inputs;
            tuta.loadInitialPosition();



            self.moveLoginButtons.toggle();
            //tuta.forms.frm003CheckBox.show();
            //tuta.forms.frm003CheckBox.show();
          },
          function(error) {
            // the service returns 403 (Not Authorised) if credentials are wrong
            if(error.httpStatusCode + "" == "403"){
                tuta.util.alert("Invalid Credentials", "Your username and password combination was wrong, please try again.");
              }
            self.control("txtPassword").text = "";
          }
        );
      }


    };

    this.control("btnLogin").onClick = function(button){ 
      self.moveLoginButtons.toggle();
    };

    // this.control("btnSignUp").onClick = function(button){
    //   tuta.forms.frmCreateAcc.show();
    // };
    //tuta.map.stopMapListener();

  };

  tuta.forms.frm001LoginScreen.onPostShow = function(form) {
    var self = this;  

    kony.timer.schedule("login", function(){
      
    }, 1, false);
  };
  
  
};

