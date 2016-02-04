/**
 * TUTA Mobile namespace
 * @namespace tuta.mobile
 */
if (typeof(tuta) === "undefined") {
  tuta = {};
}

tuta.location = {};


/**
 * Retrieves the current position of the app user
 **/
tuta.location.currentPosition = function(callback) {

  kony.location.getCurrentPosition(
    function success(position) {
      callback(position);
    },

    function error(errorMsg) {
      callback(null, errorMsg);
    },

    {
      timeout: 35000,
      maximumAge: 0,
      enableHighAccuracy: true,
      useBestProvider: true
    }
  );
};


tuta.location.updateLocationOnServer = function(userId, latitude, longitude, bearing) {
  //Update user's position on the server
  
  try{
  var inputData;
  if (bearing !== null && bearing !== undefined && bearing === bearing) //Ensures that bearing is not null, undefined or NaN
  {
    inputData = {
      //id : JSON.parse(kony.store.getItem("user")).userName,
      location: {
        lat: latitude,
        lng: longitude,
        direction: currentBearing
      }
    };
  } else {
    inputData = {
      location: {
        lat: latitude,
        lng: longitude,
      }
    };
  }

  var input = {
    data: JSON.stringify(inputData),
    id: userId
  };

  //Popup displaying latitude and longitude,
  //on position change
  // var testUserName = "Your username is: " + JSON.stringify(userTemp.userName + "\n");
  // var testOutput = "Your current position is:\n" + "Latitude: " + JSON.stringify(inputData.location.lat) + "\nLongitude: " + JSON.stringify(inputData.location.long) + "";
  // tuta.util.alert("Location Update", testUserName + testOutput);


  //Updates server with user's current position
  application.service("manageService").invokeOperation(
    "userUpdate", {}, input,
    function(result) {
      //tuta.util.alert("TEST" + "Map updated with your current position");
    },
    function(error) {

      // the service returns 403 (Not Authorised) if credentials are wrong
      //tuta.util.alert("Error: " + error.httpStatusCode,"It looks like the server has crashed, or your location is not updating.\n\n" + error.errmsg);
    }
  );
    
    
  }
  catch(ex){
    tuta.util.alert("Error", ex);
  }
};

tuta.location.loadPositionInit = function() {
  
  try{
  mapFixed = true;
  tuta.location.currentPosition(function(response) {

    tuta.location.geoCode(response.coords.latitude, response.coords.longitude, function(success, error) {
      currentPos.geometry.location.lat = response.coords.latitude;
      currentPos.geometry.location.lng = response.coords.longitude;
      try{
        var components = success.results[0].address_components;
        var len = components.length;

        for(var i = 0; i < len; i++){
          for(var j = 0; j < components[i].types.length; j++){
            if(components[i].types[j] === "country"){
              country = components[i];
            }
          }
        }


      }
      catch(ex){

      }
      //tuta.util.alert("TEST", "COUNTRY CODE: " + country.short_name);
      updateMap();

      try{
        kony.timer.cancel("startwatch");
      }
      catch (ex){
        //tuta.util.alert("Startwatch Error", ex);
      }
      kony.timer.schedule("startwatch", function(){
        mapFixed = false;
        tuta.startWatchLocation();
      }, 4, false);


      //var userTemp = JSON.parse(kony.store.getItem("user"));
      tuta.location.updateLocationOnServer(globalCurrentUser.userName, response.coords.latitude, response.coords.longitude);

    });
  }, function(error) {
    //tuta.util.alert("Error", error);
  });
    
    
  }
  catch(ex){
    //tuta.util.alert("Pos load error", ex);
  }
};


/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  };
}

if (typeof(Number.prototype.toDegrees) === "undefined") {
  Number.prototype.toDegrees = function() {
    return this * 180 / Math.PI;
  };
}

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
};

Number.prototype.toDec = function() {
  return this * 180 / Math.PI;
};

// calculate havershine distance
tuta.location.distance = function(lat1, lon1, lat2, lon2) {
  var R = 6371000; // metres
  var o1 = lat1.toRadians();
  var o2 = lat2.toRadians();
  var dO = (lat2 - lat1).toRadians();
  var dA = (lon2 - lon1).toRadians();

  /*tuta.util.alert("Location Info", "\nLat 1 Rads: " + o1 + 
    "\nLat 2 Rads: " + o2 +
    "\nLat 2 - Lat 1: " + dO + 
    "\nLon 2 - Lon 1:" + dA);*/

  var a = Math.sin(dO / 2) * Math.sin(dO / 2) +
      Math.cos(o1) * Math.cos(o2) *
      Math.sin(dA / 2) * Math.sin(dA / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

tuta.location.bearing = function(lat1, lng1, lat2, lng2) {
  lat1 = lat1 * 1.0;
  lat2 = lat2 * 1.0;
  var dLon = (lng2 - lng1);
  var y = Math.sin(dLon) * Math.cos(lat2);
  var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  var brng = Math.atan2(y, x).toDegrees();
  if (brng < 0) {
    return 360 + brng;
  } else {
    return brng;
  } //360 - ((brng + 360) % 360);
};

// get address list based on a search string
tuta.location.addressList = function(address, callback) {
  var url;

  if(country !== null)
    url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address.replace(/\s+/g, "+").replace(/`+/g, "") + "&components=country:" +  country.short_name;
  else
    url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address.replace(/\s+/g, "+").replace(/`+/g, "");



  var request = new kony.net.HttpRequest();

  request.timeout = 30000;

  request.onReadyStateChange = function() {
    if (request.readyState == constants.HTTP_READY_STATE_DONE) {
      var response = request.response;
      if (response === null) {
        tuta.mobile.alert("HTTP ERROR!", JSON.stringify(request.getAllResponseHeaders()));
      } else {
        if (response !== null) {
          if (response.results !== null) {
            callback(response);
          }
        }
      }
    }
  };

  request.open(constants.HTTP_METHOD_GET, url, true, null, null);
  request.send();
};


tuta.location.tripHistoryImage = function(polyline, callback){
  var url = "http://maps.googleapis.com/maps/api/staticmap?size=800x184&path=weight:5%7Ccolor:red%7Cenc:" + polyline;
  tuta.util.alert("Maps Query URL", url + "");
  staticMapImageResource = url;

  /*
    var request = new kony.net.HttpRequest();
    request.timeout = 30000;

    request.onReadyStateChange = function() {
        if (request.readyState == constants.HTTP_READY_STATE_DONE) {
            var response = request.response;
            if (response === null) {
                tuta.mobile.alert("No Response!", JSON.stringify(request.getAllResponseHeaders()));
            } else {
                if (response !== null) {
                    tuta.util.alert("Info", "There definitely was a response.\n\n" + JSON.stringify(request));
                    try{

                    }
                    catch(ex){
                      tuta.util.alert("Info", "Unable to set the image from the request.");
                    }


                }
            }
          }
        
      
    };

    request.open(constants.HTTP_METHOD_GET, url, true, null, null);
    request.send();
  */
};

// get address from location data
tuta.location.geoCode = function(lat, lng, callback) {
  var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng;
  var request = new kony.net.HttpRequest();

  request.timeout = 10000;

  request.onReadyStateChange = function() {
    if (request.readyState == constants.HTTP_READY_STATE_DONE) {
      var response = request.response;
      if (response === null) {
        //tuta.util.alert("HTTP ERROR!", JSON.stringify(request.getAllResponseHeaders()));
      } else {
        if (response !== null) {
          if (response.results !== null) {
            callback(response);
          }
        }
      }
    }
  };

  request.open(constants.HTTP_METHOD_GET, url, true, null, null);
  request.send();
};

// approximate zoom level from the bounds 
tuta.location.zoomLevelFromBounds = function(bounds) {
  var GLOBE_WIDTH = 256; // a constant in Google's map projection
  var west = bounds.southwest.lng;
  var east = bounds.northeast.lng;
  var angle = east - west;
  if (angle < 0) {
    angle += 360;
  }

  return Math.floor(Math.log(kony.os.deviceInfo().screenWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);
};

tuta.location.zoomLevelFromLatLng = function(lat, lng) {
  var GLOBE_WIDTH = 256; // a constant in Google's map projection
  var west = lng;
  var east = lng;
  var angle = east - west;
  if (angle < 0) {
    angle += 360;
  }

  return Math.floor(Math.log(kony.os.deviceInfo().screenWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);
};

// decode a google polyline into coordinates
tuta.location.decodePoly = function(encoded) {

  var poly = [];
  var index = 0;
  var len = encoded.length;
  var lat = 0;
  var lng = 0;

  while (index < len) {
    var b = 0;
    var shift = 0;
    var result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      //if(index < 10 ) tuta.mobile.alert(b);
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    var p = {
      "lat": lat / 100000.0,
      "lon": lng / 100000.0
    };
    poly.push(p);
  }

  return poly;
};

// decode the poly lines for an entire route
tuta.location.decodeRoute = function(routes, count) {
  var path = [];
  var leg;

  for (var i = 0; i < routes[count].legs.length; i++) {
    leg = routes[count].legs[i];
    for (var j = 0; j < leg.steps.length; j++) {
      var step = leg.steps[j];
      path = path.concat(tuta.location.decodePoly(step.polyline.points));
    }
  }
  return path;
};

/*
  Contains distance, time and decoded polyline info
*/
tuta.location.decodeRouteAndInfo = function(routes, count) {
  var route = {};
  var leg;
  route.path = [];
  route.info = [];
  route.distance = 0;
  route.duration = 0;

  for (var i = 0; i < routes[count].legs.length; i++) {
    leg = routes[count].legs[i];
    route.distance += leg.distance.value;
    route.duration += leg.duration.value;
    for (var j = 0; j < leg.steps.length; j++) {
      var step = leg.steps[j];
      route.info = route.info.concat({
        duration: step.duration.value,
        distance: step.distance.value,
        instructions: step.html_instructions
      });
      route.path = route.path.concat(tuta.location.decodePoly(step.polyline.points));
    }
  }
  return route.path;
};

tuta.location.renderDirections = function(object, directions, color, startpin, endpin, pid) {
  var routes = directions.routes;
  var waypoints = directions.geocoded_waypoints;
  var mainRoute = routes[0];
  var bounds = mainRoute.bounds;
  var leg = mainRoute.legs[0];
  var overView = mainRoute.overview_polyline;
  var routePoints = tuta.location.decodeRoute(routes, 0);

  var maplines = {
    id: "polyline" + pid,
    startLocation: {
      lat: leg.start_location.lat,
      lon: leg.start_location.lng,
      name: "Pickup Location",
      desc: leg.start_address,
      image: startpin,
      meta: {
        color: "green",
        label: "C"
      }
    },
    endLocation: {
      lat: leg.end_location.lat,
      lon: leg.end_location.lng,
      name: "Destination",
      desc: leg.end_address,
      image: endpin,
      meta: {
        color: "red",
        label: "A"
      }
    },
    locations: routePoints,
    polylineConfig: {
      lineColor: color,
      lineWidth: "4"
    }
  };

  if (object.locationData.length > 0) object.clear();
  //tuta.util.alert(JSON.stringify(maplines));
  object.addPolyline(maplines);
};

tuta.location.directions = function(origin, destination, waypoints, callback, id) {
  var url = "http://maps.googleapis.com/maps/api/directions/json?";
  url = url + "origin=" + origin.formatted_address.replace(/\s+/g, "+");
  url = url + "&destination=" + destination.formatted_address.replace(/\s+/g, "+");

  var request = new kony.net.HttpRequest();

  request.timeout = 10000;

  request.onReadyStateChange = function() {
    if (request.readyState == constants.HTTP_READY_STATE_DONE) {
      var response = request.response;

      if (response.routes !== null) {
        callback(response, id);
      }

    }
  };

  request.open(constants.HTTP_METHOD_GET, encodeURI(url), true, null, null);
  request.send();
};

tuta.location.directionsFromCoordinates = function(lat, lng, lat2, lon2, callback, id) {
  var url = "http://maps.googleapis.com/maps/api/directions/json?origin=" + lat + "," + lng + "&destination=" + lat2 + "," + lon2;
  var request = new kony.net.HttpRequest();

  request.timeout = 10000;

  request.onReadyStateChange = function() {
    if (request.readyState == constants.HTTP_READY_STATE_DONE) {
      var response = request.response;

      if (response.routes !== null) {
        callback(response, id);
      }

    }
  };

  request.open(constants.HTTP_METHOD_GET, encodeURI(url), true, null, null);
  request.send();
};

tuta.location.distanceMatrix = function(origins, destinations, callback, id) {
  var originparam = "";
  var destparam = "";

  for (var i = 0; i < origins.length; i++) {
    originparam += origins[i].lat + "," + origins[i].lon;
    if (i < origins.length - 1) originparam += "|";

  }

  for (var j = 0; j < destinations.length; j++) {
    destparam += destinations[j].lat + "," + destinations[j].lon;
    if (j < destinations.length - 1) destparam += "|";
  }

  var url = "http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + originparam + "&destinations=" + destparam;

  var request = new kony.net.HttpRequest();

  request.timeout = 10000;

  request.onReadyStateChange = function() {
    if (request.readyState == constants.HTTP_READY_STATE_DONE) {
      var response = request.response;

      if (response !== null) {
        callback(response.rows, id);
      }

    }
  };

  request.open(constants.HTTP_METHOD_GET, encodeURI(url), true, null, null);
  request.send();
};


tuta.location.findAddress = function (address, callback) {
  var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address.replace(/\s+/g,"+").replace(/`+/g,"");

  var request = new kony.net.HttpRequest();
  
  request.timeout = 30000;
  
  request.onReadyStateChange = function() {
  	if(request.readyState == constants.HTTP_READY_STATE_DONE) {
      var response = request.response;
      //ssa.mobile.alert("RESPONSE", response1);
  	  //ssa.mobile.alert("test", JSON.stringify(response));
      if(response == null) {
        //callback(request1.getAllResponseHeaders());
        //ssa.mobile.alert("HTTP ERROR!",JSON.stringify(request.getAllResponseHeaders()));
      } else {
        if(response != null) {
          if(response.results != null) {
              callback(response);
          }
        }
      }
    }
  }

  request.open(constants.HTTP_METHOD_GET, url, true, null, null);
  request.send();
}

// generate random coordinates with a specified radius around a specified coordinate
tuta.location.randomPoints = function(count, lat, lon, radius) {
  var points = [];
  var params = [];
  var radiusInDegrees = radius / 111300.0;

  for (var c = 0; c < count; c++) {
    var u = tuta.util.random(0, 1, false);
    var v = tuta.util.random(0, 1, false);
    var w = radiusInDegrees * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);


    var new_x = x / Math.cos(lat);

    params.push({
      cp: c,
      up: u,
      vp: v,
      wp: w,
      tp: t,
      xp: x,
      yp: y
    });

    var newlon = new_x + lon;
    var newlat = y + lat;

    points.push({
      lat: newlat,
      lon: newlon
    });
  }

  return points;
};