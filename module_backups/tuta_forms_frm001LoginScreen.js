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
      
    
      	
      /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  
  
  tuta.forms.frm001LoginScreen.onPreShow = function(form) {
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
    this.control("btnLogin").onClick = function(button){tuta.forms.frm003CheckBox.show();};
  };
  
  tuta.forms.frm001LoginScreen.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};
