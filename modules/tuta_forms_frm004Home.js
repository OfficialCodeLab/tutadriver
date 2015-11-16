if (typeof(tuta) === "undefined") {
	tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
	tuta.forms = {};
}

tuta.forms.frm004Home = function() {
// initialize controller 
  tuta.forms.frm004Home = new tuta.controller(frm004Home); 

  // Initialize form events	
  tuta.forms.frm004Home.onInit = function(form) {
      
    
      	
      /*
    	this.header("btnMenu").onClick = function(button) {
        ssa.util.alert("My Header Button","Clicked!");
      };*/
  };  
  
  tuta.forms.frm004Home.onPreShow = function(form) {
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
  };
  
  tuta.forms.frm004Home.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

