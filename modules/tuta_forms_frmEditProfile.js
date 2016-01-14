if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frmEditProfile = function() {
// initialize controller 
  tuta.forms.frmEditProfile = new tuta.controller(frmEditProfile); 

  // Initialize form events	
  tuta.forms.frmEditProfile.onInit = function(form) {
      
  };  
  
  tuta.forms.frmEditProfile.onPreShow = function(form) {
    var self = this;
    /*
    // Get the name of the user
    var userTempQuery = JSON.parse(kony.store.getItem("user"));
    var currentUserEmail = JSON.stringify(userTempQuery.userName);
    
    // Store the user IS as variable 'input' for userService query
    var input = {
      id: currentUserEmail
    };
    
    // Fill edit profile fields
    application.service("userService").invokeOperation(
      "user", {}, input,
      function(result) {
        var firstName = result.value[0].userInfo.firstName;
        var surname = result.value[0].userInfo.lastName;
        frmEditProfile.txtFirstName.text = firstName;
        frmEditProfile.txtSurname.text = surname;
      },
      function(error) {
        // the service returns 403 (Not Authorised) if credentials are wrong
        tuta.util.alert("Error " + error);
      }
    );
 */
    //Back button click function
    this.control("btnBack").onClick = function(button){tuta.forms.frm004Home.show();};
  };
  
  tuta.forms.frmEditProfile.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};
