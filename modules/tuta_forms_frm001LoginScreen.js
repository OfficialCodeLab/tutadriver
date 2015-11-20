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
   // application.login("techuser@ssa.co.za","T3chpassword",function(result,error){
   //   if(error) tuta.util.alert("Login error", error);
   // })
      
  };  
  
  tuta.forms.frm001LoginScreen.onPreShow = function(form) {
    var self = this;
    
    this.moveLoginButtons = new tuta.controls.menu( 
      this.control("flexMainButtons"),
      this.control("flexLoginButtons"), 
      tuta.controls.position.RIGHT, 
      tuta.controls.behavior.MOVE_OVER, 
      0.3
    );
    
    this.control("btnLogin2").onClick = function(button) {
      if(self.control("txtEmail").text === "" || self.control("txtEmail").text === null){
        tuta.util.alert("Error", "Please enter your email");  
        self.control("txtPassword").text = "";
      }
      else if (self.control("txtPassword").text === "" || self.control("txtPassword").text === null){
        tuta.util.alert("Error", "Please enter your password");        
      }
      else{
        var inputs = { userName : self.control("txtEmail").text , password : self.control("txtPassword").text };
      
      	// try log user in
        application.service("userService").invokeOperation(
          	"login", {}, inputs,
            function(result) {
 				//tuta.util.alert("LOGIN SUCCESS", result.value);
              self.moveLoginButtons.toggle();
              tuta.forms.frm003CheckBox.show();
            },
            function(error) {
                // the service returns 403 (Not Authorised) if credentials are wrong
                tuta.util.alert("Error " + error.httpStatusCode, error.errmsg);
              	self.control("txtPassword").text = "";
            }
    	);
        
      }

    	
    };
    
    this.control("btnLogin").onClick = function(button){self.moveLoginButtons.toggle();};
    
    //this.control("btnLogin2").onClick = function(button){self.moveLoginButtons.toggle();tuta.forms.frm003CheckBox.show();};
  };
  
  tuta.forms.frm001LoginScreen.onPostShow = function(form) {
    var self = this;
  };
};
