function init(){
  frmMessageMain.txtSearch.onTextChange = searchTxtChange;
  
  
  frm001LoginScreen.btnSignUp.onClick = function () {frm002SignupScreen.show();};
  frm001LoginScreen.btnLogin.onClick = function() {ssa.animate.move(frm001LoginScreen.flexMainButtons, 0.25, "", "-100%", null); ssa.animate.move(frm001LoginScreen.flexLoginButtons, 0.25, "0%", "0%", null);};
  frm001LoginScreen.btnLogin2.onClick = function() {frm003CheckBox.show();};
  
  frm002SignupScreen.btnNextSignup.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager2.onClick = function () {switchForms(1);};
  frm002SignupScreen.btnPager1.onClick = function () {switchForms(0);};
  frm002SignupScreen.btnFinishSignup.onClick = function () {frm004Home.show();};
  frm002SignupScreen.btnCheckAgree.onClick = function(){
    if((frm002SignupScreen.imgTick.isVisible===false)){
      frm002SignupScreen.imgTick.setVisibility(true);
    }
    else {
      frm002SignupScreen.imgTick.setVisibility(false);
    }
  };
}

function switchForms(bool){
  if(bool === 1){
    ssa.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "-100%", null);
    ssa.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "0%", frm002SignupScreen.scrollSignupBottomB.scrollToBeginning());
  }
  else
  {
    ssa.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "100%", null);
    ssa.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "0%", frm002SignupScreen.scrollSignupBottom.scrollToBeginning());
  }
  
}

function searchTxtChange(){
  	
	if (frmMessageMain.txtSearch.text === "") {
      frmMessageMain.imgSearchIcon.isVisible = true;
    }
  	else {
      frmMessageMain.imgSearchIcon.isVisible = false;
    }
}

function resetSearch(){
	frmMessageMain.txtSearch.text = "Search";
  	frmMessageMain.imgSearchIcon.isVisible = true;
}




  


