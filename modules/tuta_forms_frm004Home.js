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
    this.leftMenu = new tuta.controls.menu(
          this.control("flexMapScreen"), 
          this.control("flexMenu"), 
          tuta.controls.position.LEFT,
          tuta.controls.behavior.MOVE_OVER,
          0.3
      );	
    
    this.control("btnChs").onClick = function(button) {
      if(self.leftMenu._open === true){
        frm004Home.imgChsO.setVisibility(false);
        frm004Home.flexDarken.setVisibility(false);
        kony.timer.schedule("chsC", function(){
          frm004Home.imgChsC.setVisibility(true);
          frm004Home["btnChs"]["height"] = "55dp";
        }, 0.3, false);      
      }
      else{
        frm004Home.imgChsC.setVisibility(false);
        frm004Home.flexDarken.setVisibility(true);
        kony.timer.schedule("chsO", function(){
          frm004Home.imgChsO.setVisibility(true);
          frm004Home["btnChs"]["height"] = "100%";
        }, 0.3, false);  
      }      
      self.leftMenu.toggle();
    };
    
    this.control("btnLegal").onClick = function (button) {tuta.forms.frmTermsConditions.show();};
    this.control("btnFlagDown").onClick = function (button) {tuta.forms.frmFlagDown.show();};
    this.control("btnTestingPickup").onClick = function (button) {tuta.forms.frmPickupRequest.show();};
    this.control("btnSignOut").onClick = function (button) {
    tuta.forms.frm001LoginScreen.show();
    };

    this.control("txtDest").onDone = function(widget) {
      if(frm004Home.txtDest.text != null){
        frm004Home.flexFindingDest.setVisibility(true);
        //tuta.mobile.alert("Search", "Search Done");
        selectDest(frm004Home);      
      }
    };

    this.control("mapMain").onClick = function(map, location) {
      frm004Home.flexAddressList.setVisibility(false);
      frm004Home.flexAddressShadow.setVisibility(false);
      //kony.timer.schedule("showMarker", function(){frmMap["flexChangeDest"]["isVisible"] = true;}, 0.3, false);
      //resetSearchBar();
      searchMode = 0;
      updateConsole();
    };
  };
  
  tuta.forms.frm004Home.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
};

