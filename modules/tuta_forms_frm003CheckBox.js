

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

    generateButton();
    
    //this.control("btnCheck1").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick1);};
    //this.control("btnCheck2").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick2);};
    //this.control("btnCheck3").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick3);};
    //this.control("btnCheck4").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick4);};
   // this.control("btnCheck5").onClick = function(button){frm003CheckboxToggle(frm003CheckBox.imgTick5);};

    this.control("btnContinue").onClick = function(button){
      var toContinue = false;
      toContinue = checkContinue();
      /*
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
      */
      
      if (toContinue === true){
      	tuta.animate.move(frm003CheckBox.flexConfirmCabNumber, 0, "0", "0", null);
      }
      else if (toContinue === false) {
        tuta.mobile.alert("Unticked Box", "All boxes must be ticked");
      }
    };
    this.control("btnConfirmCNum").onClick = function(button){tuta.forms.frm004Home.show();
    loadMessages();};
  };

  tuta.forms.frm003CheckBox.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
  };
  // Test generate one button and add to existing flexContainer.
  
  
};

function checkContinue() {
  
  for (var i = 0; i < checklistItems.length; i++) {
    var widgetId = "genTickImg" + (i+1);
    if (frm003CheckBox[widgetId]["isVisible"] === false) {
      
      return false;
    }
  } 
  
  return true;
}
    
function generateButton() {


try{
    //var widgets = [];
    for (var i = 0; i < checklistItems.length; i++){
      var genLblBox;
      
      var idText = "genLblBox" + (i+1);
      var genBoxBasic = {id:idText,
                         isVisible:true,
                         skin: "CopyslLabel015df40a7646743",
                         text: ""};
      var genBoxLayout = {};
      var genBoxPSP = {};
      genLblBox = new kony.ui.Label(genBoxBasic, genBoxLayout, genBoxPSP);



      var genTickImg;
      var genTickImgId = "genTickImg" + (i+1);
      var imgBasic = {id:genTickImgId,
                      isVisible: false,
                      src:"thintick.png"};
      var imgLayout = {};
      var imgPSP = {};
      genTickImg = new kony.ui.Image2(imgBasic, imgLayout, imgPSP);


      var btnCheckTest1;
      idText = "btnCheckTest" + (i+1);
      var btnBasic ={id:idText, isVisible:true, skin:"CopyslButtonGlossBlue043984d7811364e", 
                     focusSkin:"CopyslButtonGlossBlue043984d7811364e"};
      var btnLayout = {displayText:true};
      var btnPSP ={};

      btnCheckTest1 = new kony.ui.Button(btnBasic, btnLayout, btnPSP);

      var genLabel; 

      idText = "genLabel" + (i+1);
      var questiontxt = checklistItems[i].text;
      var lblBasic = {id:idText,
                      isVisible: true,
                      skin:"QuestionSkin",
                      text:questiontxt};
      var lblLayout = {contentAlignment:constants.CONTENT_ALIGN_MIDDLE_LEFT,
                       displayText: true};
      var lblPSP = {};

      genLabel = new kony.ui.Label(lblBasic, lblLayout, lblPSP);



      var genFlex;
      idText = "genFlex" + (i+1);
      var flexBasic = {id:idText, 
                       isVisible:true};
      var flexLayout = {width:"100%"};
      var flexPSP = {};

      genFlex =  new kony.ui.FlexContainer(flexBasic, flexLayout, flexPSP);
      frm003CheckBox.flexCheckboxQuestions.add(genFlex);
      frm003CheckBox[idText].add(genTickImg);
      frm003CheckBox[idText].add(genLabel);
      frm003CheckBox[idText].add(btnCheckTest1);
      frm003CheckBox[idText].add(genLblBox);

      var genFlexId = "genFlex" + (i+1);
      frm003CheckBox[genFlexId].height = "50dp";
      frm003CheckBox[genFlexId].top = "7%";

      var testname = "genTickImg" + (i+1);
      frm003CheckBox[genTickImgId].height = "37dp";
      frm003CheckBox[genTickImgId].width = "37dp";
      frm003CheckBox[genTickImgId].bottom = "10dp";
      frm003CheckBox[genTickImgId].left = "10%";

      var btnCheckTestId = "btnCheckTest" + (i+1);
      frm003CheckBox[btnCheckTestId].height = "46dp";
      frm003CheckBox[btnCheckTestId].width = "100%";
      frm003CheckBox[btnCheckTestId].top = "7%";
      frm003CheckBox[btnCheckTestId].left = "";

      frm003CheckBox[btnCheckTestId].onClick = function(eventobject){        
        var clicked = eventobject.id.replace("btnCheckTest","genTickImg") ;
        if (frm003CheckBox[clicked]["isVisible"] === false) {
          frm003CheckBox[clicked]["isVisible"] = true;
        } else {
          frm003CheckBox[clicked]["isVisible"] = false;
        }
      };

      var genLabelId = "genLabel" + (i+1);
      frm003CheckBox[genLabelId].height = "45dp";
      frm003CheckBox[genLabelId].width = "75%";
      frm003CheckBox[genLabelId].top = "7%";
      frm003CheckBox[genLabelId].left = "25%";

      var genLblBoxId = "genLblBox" + (i+1);
      frm003CheckBox[genLblBoxId].height = "30dp";
      frm003CheckBox[genLblBoxId].width = "30dp";
      frm003CheckBox[genLblBoxId].top = "6dp";
      frm003CheckBox[genLblBoxId].left = "10%";
    }
}
  catch(ex){
    tuta.util.alert("ERROR", ex);
  }
}



