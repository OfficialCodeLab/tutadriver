function init(){
  frmMessageMain.txtSearch.onTextChange = searchTxtChange;
  
  
  frm001LoginScreen.btnSignUp.onClick = function () {frm002SignupScreen.show();};
  frm001LoginScreen.btnLogin.onClick = function() {ssa.animate.move(frm001LoginScreen.flexMainButtons, 0.25, "", "-100%", null); ssa.animate.move(frm001LoginScreen.flexLoginButtons, 0.25, "0%", "0%", null);};
  frm001LoginScreen.btnLogin2.onClick = function() {frm003CheckBox.show()};
  
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




  


