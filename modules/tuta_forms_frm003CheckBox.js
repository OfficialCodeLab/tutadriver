if (typeof(tuta) === "undefined") {
  tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
  tuta.forms = {};
}

tuta.forms.frm003CheckBox = function() {
  // initialize controller 
  tuta.forms.frm003CheckBox = new tuta.controller(frm003CheckBox); 

  // Initialize form events	
  tuta.forms.frm003CheckBox.onInit = function(form) {



    /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  

  tuta.forms.frm003CheckBox.onPreShow = function(form) {
    var self = this;

    //this.control("btnContinue").onClick = function(button){tuta.mobile.alert("TEST", "TEST");};
    //this.control("btnContinue").onClick = function(button){tuta.animate.move(frm003CheckBox.flexConfirmCabNumber, 0, "0", "0", null);};



    this.control("btnCheck1").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick1);};
    this.control("btnCheck2").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick2);};
    this.control("btnCheck3").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick3);};
    this.control("btnCheck4").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick4);};
    this.control("btnCheck5").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick5);};

    this.control("btnContinue").onClick = function(button){
      if (frm003CheckBox.imgTick1.isVisible === true &&
          frm003CheckBox.imgTick2.isVisible === true &&
          frm003CheckBox.imgTick3.isVisible === true &&
          frm003CheckBox.imgTick4.isVisible === true &&
          frm003CheckBox.imgTick5.isVisible === true) {

        tuta.animate.move(frm003CheckBox.flexConfirmCabNumber, 0, "0", "0", null);
      }
      else if (frm003CheckBox.imgTick1.isVisible === false ||
               frm003CheckBox.imgTick2.isVisible === false ||
               frm003CheckBox.imgTick3.isVisible === false ||
               frm003CheckBox.imgTick4.isVisible === false ||
               frm003CheckBox.imgTick5.isVisible === false) {

        tuta.mobile.alert("Unticked Box", "All boxes must be ticked");
      }
    };
    this.control("btnConfirmCNum").onClick = function(button){
      tuta.forms.frm004Home.show();
      loadMessages();
    };
  };

  tuta.forms.frm003CheckBox.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};
