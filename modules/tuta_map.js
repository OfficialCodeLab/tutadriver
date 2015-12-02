if (typeof(tuta) === "undefined") {
  tuta = {};
}

tuta.map = {};

tuta.map.blankFunction = function(){

};

//Handles entering addresses on the map form.
function selectDest(form) {
  var add = "";
  add = frm004Home.txtDest.text;

  tuta.location.addressList(add, function(result) {
    frm004Home.flexFindingDest.setVisibility(false);
    if (result.status === "ZERO_RESULTS") {
      frm004Home.txtDest.text = "";
    } else {
      frm004Home.flexAddressList.setVisibility(true);
      frm004Home.flexAddressShadow.setVisibility(true);
      frm004Home.segAddressList.widgetDataMap = {
        lblAddress: "formatted_address"
      };
      frm004Home.segAddressList.setData(result.results);
      frm004Home.txtDest.text = "";
    }
  });
}

//Function to refresh the map with locations of user and driver.
function updateMap() {

  tuta.getBearing(function(response) {
    currentPin = response;
  });
  
  var bounds = frm004Home.mapMain.getBounds();
  var locationData = [];
  //tuta.util.alert("TEST", JSON.stringify(bounds));

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