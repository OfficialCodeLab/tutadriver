if (typeof(tuta) === "undefined") {
  tuta = {};
}

tuta.routes = {};


tuta.routes.createRoute = function(id, point) {
  var input = {
    _id : id,
    points : [ {
      lat: point.lng, 
      lng : point.lat
    } ]
  };
  
  var data = {data: JSON.stringify(input)};
  
  application.service("manageService").invokeOperation(
  "routeAdd", {}, data,
  function(success){
  }, function(error){
    
  });
};

tuta.routes.addPoints = function(id, points, callback) {
  
  var input = {
    points : points
  };
  
  var data = {id : id, data: JSON.stringify(input)};
  
  application.service("manageService").invokeOperation(
  "routeUpdate", {}, data,
  function(success){
    callback();
  }, function(error){
    
  });
};

tuta.routes.pushPoint = function(lat, lng){
  var locationPoint = {
    lat: lat,
    lng: lng
  };
  
  routePoints.push(locationPoint);
};
