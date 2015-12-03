if (typeof(tuta) === "undefined") {
  tuta = {};
}

tuta.map = {};

tuta.map.blankFunction = function(){

};

var tempDestination;
function onLocationSelected(form) {
  tempDestination = getSelectedAddress(form);
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
      form.txtDest.text = "";
    } else {
      form.flexAddressList.setVisibility(true);
      form.flexAddressShadow.setVisibility(true);
      form.segAddressList.widgetDataMap = {
        lblAddress: "formatted_address"
      };
      form.segAddressList.setData(result.results);
      form.txtDest.text = "";
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