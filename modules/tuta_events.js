if (typeof(tuta) === "undefined") {
  tuta = {};
}

tuta.events = {};

tuta.events.blankFunction = function(){

};

/*=============================================================================
  ____          _              _   _                 _ _           
 / ___|_      _(_)_ __   ___  | | | | __ _ _ __   __| | | ___ _ __ 
 \___ \ \ /\ / / | '_ \ / _ \ | |_| |/ _` | '_ \ / _` | |/ _ \ '__|
  ___) \ V  V /| | |_) |  __/ |  _  | (_| | | | | (_| | |  __/ |   
 |____/ \_/\_/ |_| .__/ \___| |_| |_|\__,_|_| |_|\__,_|_|\___|_|   
                 |_|                                               

TODO: This entire function needs to be moved to the map form,
      as swipes are only used on this form anyway.                 
=============================================================================*/
var swipedSlider = 1;

function setUpSwipes() {
  var setupTblSwipe = {
    fingers: 1
  };

  frm004Home.flexSlider.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, setupTblSwipe, function(widget, gestureInformationSwipe) {


    //Set up slider for picking up customer
    if (customerIsPickedUp === false) {

      if (gestureInformationSwipe.swipeDirection == 2) { //RIGHT--->
        if (swipedSlider === 1) {
          swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "186dp", function() {
            swipedSlider = 1;
          });
          customerIsPickedUp = true;
        }
      } else if (gestureInformationSwipe.swipeDirection == 1) { //<---LEFT
        if (swipedSlider === 2) {
          //swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp", function() {
            //swipedSlider = 1;
          });
        }
      }
    }

    //Set up slider for dropping off customer
    else {

      if (gestureInformationSwipe.swipeDirection == 2) { //RIGHT--->
        if (swipedSlider === 1) {
          swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "186dp", function() {
            swipedSlider = 1;
          });
          customerIsDroppedOff = true;
        }
      } else if (gestureInformationSwipe.swipeDirection == 1) { //<---LEFT
        if (swipedSlider === 2) {
          //swipedSlider = 0;
          tuta.animate.move(frm004Home.imgSliderball, 0.3, "", "5dp", function() {
            //swipedSlider = 1;
          });
        }
      }
    }
  });
}
//End of swipe handler
/*=============================================================================
  ____       _   _               ____  _                 
 |  _ \ __ _| |_(_)_ __   __ _  / ___|| |_ __ _ _ __ ___ 
 | |_) / _` | __| | '_ \ / _` | \___ \| __/ _` | '__/ __|
 |  _ < (_| | |_| | | | | (_| |  ___) | || (_| | |  \__ \
 |_| \_\__,_|\__|_|_| |_|\__, | |____/ \__\__,_|_|  |___/
    / \   _ __ _ __ __ _ |___/                           
   / _ \ | '__| '__/ _` | | | |                          
  / ___ \| |  | | | (_| | |_| |                          
 /_/   \_\_|  |_|  \__,_|\__, |                          
                         |___/                           
=============================================================================*/
//Code for handling stars in rating menu
var star = [];
var lastStarSelected = 0;
var toggleImage;

function onStarSelect(eventobject, x, y) {
  var nostar = eventobject.id.replace("imgStar", "");
  if (nostar === lastStarSelected && nostar > 1) {
    nostar--;
    lastStarSelected = 0;
  } else
    lastStarSelected = nostar;

  for (var i = 0; i < nostar; i++) {
    star[i].src = "starselected.png";
  }
  for (var j = nostar; j < 5; j++) {
    star[j].src = "starunselected.png";
  }
}
//End of ratings method
/*===========================================================================*/


//Toggle function to switch between landing screen and login/pass screen
//TODO: Move this to the events screen
function switchForms(bool) {
  if (bool === 1) {
    tuta.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "-100%", null);
    tuta.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "0%", null);

    frm002SignupScreen.scrollSignupBottomB.scrollToWidget(frm002SignupScreen.lblTopB);
  } else {
    tuta.animate.move(frm002SignupScreen.scrollSignupBottomB, 0.25, "116", "100%", null);
    tuta.animate.move(frm002SignupScreen.scrollSignupBottom, 0.25, "116", "0%", null);

    frm002SignupScreen.scrollSignupBottom.scrollToWidget(frm002SignupScreen.lblTop);
  }
}


//Toggle function to hide/show the magnifying glass on the messaging window,
//When the searchbar is clicked.
//TODO: Move this to the message form
function searchTxtChange() {

  if (frmMessageMain.txtSearch.text === "") {
    frmMessageMain.imgSearchIcon.isVisible = true;
  } else {
    frmMessageMain.imgSearchIcon.isVisible = false;
  }
}


//Resets the text in the search bar, in the messaging form.
//TODO: Move this to the message form
function resetSearch() {
  frmMessageMain.txtSearch.text = "Search";
  frmMessageMain.imgSearchIcon.isVisible = true;
}


//Toggles the checkbox images in the checkbox form.
//TODO: Move this to the checkbox form.
function frm003CheckboxToggle(widget) {
  //var widget = toggleImage;
  if (widget.isVisible === false) {
    widget["isVisible"] = true;
  } else {
    widget["isVisible"] = false;
  }
}

//Used to toggle the cheeseburger menu on the map form.
//TODO: Move this to the map form.
function animateMenu() {
  frm004Home.btnChs.setVisibility(false);
  if (menuOpen === false) { //OPEN MENU
    frm004Home.imgChsC.setVisibility(false);
    frm004Home.flexDarken.setVisibility(true);
    tuta.animate.move(frm004Home.flexMapScreen, 0.3, "0", "80%", null);
    tuta.animate.move(frm004Home.flexMenu, 0.3, "0", "0%", null);
    frm004Home.imgChsO.setVisibility(true);
    frm004Home["btnChs"]["height"] = "100%";
    frm004Home.btnChs.setVisibility(true);
    menuOpen = true;
    frm004Home.btnChs.setVisibility(true);
    menuOpen = true;
  } else //CLOSE MENU
  {
    frm004Home.imgChsO.setVisibility(false);
    frm004Home.flexDarken.setVisibility(false);
    tuta.animate.move(frm004Home.flexMapScreen, 0.3, "0", "0%", null);
    tuta.animate.move(frm004Home.flexMenu, 0.3, "0", "-80%", null);
    frm004Home.imgChsC.setVisibility(true);
    frm004Home["btnChs"]["height"] = "55dp";
    frm004Home.btnChs.setVisibility(true);
    menuOpen = false;
  }
}

//Useful method to shorten a string.
function shortenText(str, len) {
  var newStr = "";
  if (str.length > len)
    newStr = str.substring(0, (len - 1)) + "...";

  return newStr;
}

//Useful method to toggle visibility on images.
function toggleImage(widget) {
  //var widget = toggleImage;
  if (widget.isVisible === false) {
    widget["isVisible"] = true;
  } else {
    widget["isVisible"] = false;
  }
}
function clearDestPick(){
  frm004Home.txtDest.text = "";
  frm004Home.flexDest.setVisibility(true);
}

/*===========================================================================
  ____       _                 
 |  _ \  ___| |__  _   _  __ _ 
 | | | |/ _ \ '_ \| | | |/ _` |
 | |_| |  __/ |_) | |_| | (_| |
 |____/ \___|_.__/ \__,_|\__, |
                         |___/ 
===========================================================================*/

//Methods written by Carl for use in the debug menu
tuta.events.csShowDistance = function() {
  var csCurrentPos = {
    lat: currentPos.geometry.location.lat,
    lon: currentPos.geometry.location.lng
  };
  var csDestinationPos = {
    lat: -34.055390,
    lon: 18.822428
  };

  tuta.util.alert("Current Position", "" +
    "\nLatitude: " + csCurrentPos.lat +
    "\nLongitude: " + csCurrentPos.lon + "\n" +
    "\nSecond Position" +
    "\nLatitude: " + csDestinationPos.lat +
    "\nLongitude: " + csDestinationPos.lon);

  var csTestDistance = tuta.location.distance(csCurrentPos.lat, csCurrentPos.lon, csDestinationPos.lat, csDestinationPos.lon);
};