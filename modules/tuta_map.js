if (typeof(tuta) === "undefined") {
  tuta = {};
}

tuta.map = {};

tuta.map.blankFunction = function(){

};

//var tempDestination;
var tempUser;
function onLocationSelected(form) {
  destination = getSelectedAddress(form);
}

function getSelectedAddress(form) {
  // hide address list
  var selectedItem = form.segAddressList.selectedItems[0];
  form.flexAddressList.setVisibility(false);
  form.flexAddressShadow.setVisibility(false);

  return selectedItem;
}


//Handles entering addresses on the map form.
function selectDest(form) {
  var add = "";
  add = form.txtDest.text;

  tuta.location.addressList(add, function(result) {
    form.flexFindingDest.setVisibility(false);
    if (result.status === "ZERO_RESULTS") {
      //form.txtDest.text = "";
    } else {
      form.flexAddressList.setVisibility(true);
      form.flexAddressShadow.setVisibility(true);
      form.segAddressList.widgetDataMap = {
        lblAddress: "formatted_address"
      };
      form.segAddressList.setData(result.results);
      //form.txtDest.text = "";
    }
  });
}

//Function to refresh the map with locations of user and driver.
function updateMap() {
  try{
    tuta.getBearing(function(response) {
      currentPin = response;
    });

    var bounds = frm004Home.mapMain.getBounds();
    var locationData = [];
    //tuta.util.alert("TEST", JSON.stringify(bounds));

    //#ifdef iphone
    frm004Home.mapMain.locationData = [];
    frm004Home.mapMain.zoomLevel = frm004Home.mapMain.zoomLevel;
    bounds = frm004Home.mapMain.getBounds();  
    //#endif

    if (bounds !== null && mapFixed === false) {
      locationData.push(
        {lat: "" + bounds.center.lat + "", 
         lon: "" + bounds.center.lon + "", 
         name:"", 
         desc: "", 
         image : ""});      
    }

    locationData.push({
      lat: "" + currentPos.geometry.location.lat + "",
      lon: "" + currentPos.geometry.location.lng + "",
      name: "Pickup Location",
      desc: "",
      image: currentPin
    });

    if (nearbyUsers.length > 0) {
      locationData.push({
        lat: "" + nearbyUsers[0].location.lat + "",
        lon: "" + nearbyUsers[0].location.lng + "",
        name: nearbyUsers[0].id,
        desc: "",
        image: "pickupicon.png"
      });
    }

    frm004Home.mapMain.locationData = locationData;
  }
  catch(ex){

  }
}

//Toggles some menu on the map form.
function menuToggle(time, bool) {
  if (bool === true) {
    frm004Home.imgChsO.setVisibility(false);
    frm004Home.flexDarken.setVisibility(false);
    kony.timer.schedule("chsC", function() {
      frm004Home.imgChsC.setVisibility(true);
      frm004Home["btnChs"]["height"] = "55dp";
    }, time, false);
  } else {
    frm004Home.imgChsC.setVisibility(false);
    frm004Home.flexDarken.setVisibility(true);
    kony.timer.schedule("chsO", function() {
      frm004Home.imgChsO.setVisibility(true);
      frm004Home["btnChs"]["height"] = "100%";
    }, time, false);
  }
}

function estimateTripCost (locationA, locationB, callback){
  //var dist = tuta.location.distance(locationA.lat, locationA.lng, locationB.lat, locationB.lng);
  var matrixDist = tuta.location.distanceMatrix(locationA, locationB, function(response){
    var dist = response[0].elements[0].distance.value;
    var averageCost = (dist/1000)*GLOBAL_FEE_KM + GLOBAL_BASE_RATE;
    var minCost = Math.round(averageCost-(averageCost*GLOBAL_FEE_DEVIATION));
    var maxCost = Math.round(averageCost+(averageCost*GLOBAL_FEE_DEVIATION));
    callback(minCost, maxCost); 
  }, 1);  
}

var mapCenter = {
  location: 
  {
    lat: 0.0, 
    lon: 0.0
  }
};


tuta.map.storeCenter = function (bounds){
  mapCenter.location.lat = bounds.center.lat;
  mapCenter.location.lon = bounds.center.lon;  
};


// Checks if the point in current bounds is far enough away from the old center
// Returns true if test is pasased, else false
tuta.map.checkRadius = function (bounds){
  var oldLat = mapCenter.location.lat;
  var oldLon = mapCenter.location.lon;
  var newLat = bounds.center.lat;
  var newLon = bounds.center.lon;

  var radius = tuta.location.distance(oldLat, oldLon, newLat, newLon);
  /*TODO FUTURE:
	- USE LATSPAN TO DETERMINE THE MAX RADIUS
    - LATSPAN IS IN THE BOUNDS OBJECT
*/
  if(radius > GLOBAL_MAX_RADIUS){
    tuta.map.storeCenter(bounds);
    return true;
  }

  return false;
};

var timeStill = 0;
tuta.map.startMapListener = function (){
  try {
    kony.timer.cancel("MapListener");
  }
  catch(ex){
    
  }
  
  var hasMovedAway = false;
  var hasMovedBack = false;
  kony.timer.schedule("MapListener", function(){
    var bounds = frm004Home.mapMain.getBounds();
    if(tuta.map.checkRadius(bounds)){
      //tuta.util.alert("MOVED");
      if(!hasMovedAway){
        tuta.animate.move(frm004Home.flexTopMenu, 0.2, "8%", "", null);
        tuta.animate.moveBottomLeft(frm004Home.flexFooter, 0.2, "-80dp", "", null);
        tuta.animate.moveBottomRight(frm004Home.flexMapCenter, 0.2, "100dp", "-75dp", null);
        hasMovedAway = true;   
        hasMovedBack = false;
      }
      timeStill = 0;
      
      
      //TODO: Calculate time from nearest driver
    }
    else{
      //tuta.util.alert("DIDN'T MOVE");
      timeStill++;
      
      if(timeStill >= 2 && !hasMovedBack){
        tuta.animate.move(frm004Home.flexTopMenu, 0.2, "0dp", "", null);
        tuta.animate.moveBottomLeft(frm004Home.flexFooter, 0.2, "0dp", "", null);
        tuta.animate.moveBottomRight(frm004Home.flexMapCenter, 0.2, "90dp", "-10dp", null);  
        hasMovedBack = true;
        hasMovedAway = false;
      }     
      
    }
  }, 1, true);
};
tuta.map.stopMapListener = function (){
  try {
    kony.timer.cancel("MapListener");
  }
  catch(ex){
    
  }
};


