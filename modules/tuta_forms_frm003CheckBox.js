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
/*
      this.leftMenu = new ssa.controls.menu(
          this.control("flexMain"), 
          this.control("flexMenu"), 
          ssa.controls.position.LEFT,
          ssa.controls.behavior.MOVE_OVER,
          0.25
      );	
    
      this.rightMenu = new ssa.controls.menu(
          this.control("flexMain"), 
          this.control("flexRightMenu"), 
          ssa.controls.position.RIGHT,
          ssa.controls.behavior.OVERLAY,
          0.25
      );	
    
	  this.topMenu = new ssa.controls.menu(
          this.control("flexMain"), 
          this.control("flexTopMenu"), 
          ssa.controls.position.TOP,
          ssa.controls.behavior.MOVE_OVER,
          0.25
      );    
    
      // example of onClick event on example form for btnOne
      this.control("btnOne").onClick = function(button) {
        self.leftMenu.toggle();
      };
    
      this.control("btnTwo").onClick = function(button) {
        self.rightMenu.toggle();
      };	
     	
      this.control("btn3").onClick = function(button) {
        self.topMenu.toggle();
      };*/
    //this.control("btnContinue").onClick = function(button){tuta.mobile.alert("TEST", "TEST");};
    this.control("btnContinue").onClick = function(button){tuta.animate.move(frm003CheckBox.flexConfirmCabNumber, 0, "0", "0", null);};
    this.control("btnCheck1").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick1);};
    this.control("btnCheck2").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick2);};
    this.control("btnCheck3").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick3);};
    this.control("btnCheck4").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick4);};
    this.control("btnCheck5").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick5);};
    this.control("btnConfirmCNum").onClick = function(button){tuta.forms.frm004Home.show();};
  };
  
  tuta.forms.frm003CheckBox.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};
