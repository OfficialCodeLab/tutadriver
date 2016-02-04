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
    
    // Store the user IS as variable 'input' for userService query
    var input = {
      id: globalCurrentUser.userName
    };
    var input2 = {
      userId: globalCurrentUser.userName
    };
    
    // Fill edit profile fields
    application.service("userService").invokeOperation(
      "user", {}, input,
      function(result) {
        var firstName = result.value[0].userInfo.firstName;
        var surname = result.value[0].userInfo.lastName;
        var avatarBase64 = result.value[0].userInfo.avatarDocId;
        frmEditProfile.txtFirstName.text = firstName;
        frmEditProfile.txtSurname.text = surname;

        if (avatarBase64 !== "null") {
          frmEditProfile.imgUser.rawBytes = kony.convertToRawBytes(avatarBase64);
        }

      },
      function(error) {
        // the service returns 403 (Not Authorised) if credentials are wrong
        //tuta.util.alert("Error " + error);
      }
    );

    application.service("driverService").invokeOperation(
      "assignedVehicle", {}, input2,
      function(result) {
        var make = result.value[0].make;
        var model = result.value[0].model;
        var year = result.value[0].year;
        var color = result.value[0].color;
        var VRN = result.value[0].VRN;
        frmEditProfile.txtMake.text = make;
        frmEditProfile.txtModel.text = model;
        frmEditProfile.txtYear.text = year;
        frmEditProfile.txtColor.text = color;
        frmEditProfile.txtVRN.text = VRN;
      },
      function(error) {
        // the service returns 403 (Not Authorized) if credentials are wrong
        //tuta.util.alert("Error " + error);
      }
    );
    
    //Back button click function
    this.control("btnBack").onClick = function(button){kony.application.getPreviousForm().show();};
    
    this.control("cmrTakePhoto").onCapture = function() {
      frmEditProfile.imgUser.rawBytes = frmEditProfile.cmrTakePhoto.rawBytes;
    };
    
    this.control("btnImportPicture").onClick = function() {
      
      function openGallery() {
        var querycontext = {mimetype: "image/*"};
        var returnStatus = kony.phone.openMediaGallery(onselectioncallback,
                                                       querycontext);
      }
      
      function onselectioncallback(rawbytes) {
        if (rawbytes === null) {
          return;
        }
        frmEditProfile.imgUser.rawBytes = rawbytes;
      }
      
      openGallery();
    };
    
    this.control("btnSave").onClick = function(button) {
      var inputs = {
        data: JSON.stringify({
          firstName : frmEditProfile.txtFirstName.text,
          lastName : frmEditProfile.txtSurname.text,
          avatarDocId: kony.convertToBase64(frmEditProfile.imgUser.rawBytes)
        }),
        id: globalCurrentUser.userName
      };
      
      application.service("manageService").invokeOperation(
        "userInfoUpdate", {}, inputs,
        function(success) {
          //tuta.util.alert("Success", "Name and surname info has been updated");
          
          var inputs2 = {
            data: JSON.stringify({
              make : frmEditProfile.txtMake.text,
              model : frmEditProfile.txtModel.text,
              year : frmEditProfile.txtYear.text,
              color : frmEditProfile.txtColor.text,
              VRN : frmEditProfile.txtVRN.text
            }),
            id: globalCurrentUser.userName
          };
          
          application.service("manageService").invokeOperation(
            "vehicleUpdate", {}, inputs2,
            function(success) {
              tuta.util.alert("Success", "Information has been updated");
            }, function(error) {
              //tuta.util.alert("Error", JSON.stringify(error));
            }
          );
        }, function(error) {
          //tuta.util.alert("Error", JSON.stringify(error));
        }
      );
    };
    //tuta.map.stopMapListener();
  };
  
  tuta.forms.frmEditProfile.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};
