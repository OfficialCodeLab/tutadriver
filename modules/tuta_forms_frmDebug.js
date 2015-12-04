if (typeof(tuta) === "undefined") {
    tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
    tuta.forms = {};
}

tuta.forms.frmDebug = function() {
    // initialize controller 
    tuta.forms.frmDebug = new tuta.controller(frmDebug);

    // Initialize form events	
    tuta.forms.frmDebug.onInit = function(form) {};

    tuta.forms.frmDebug.onPreShow = function(form) {
        var self = this;

        this.control("btnBack").onClick = function(button) {
            tuta.forms.frm004Home.show();
        };



        this.control("btnTickPress1").onClick = function(button) {
            //Shows trip history
            var staticAddress1 = {
                formatted_address: "42 Bright Street, Somerset West, South Africa"
            };
            var staticAddress2 = {
                formatted_address: "90 Parel Vallei, Somerset West, South Africa"
            };
            var decodedRoute;

            try {

                tuta.location.directions(staticAddress1, staticAddress2, null, function(success, id) {
                    var retrievedDirections = success;

                    //tuta.util.alert("TEST", JSON.stringify(success));
                    //decodedRoute = tuta.location.decodeRoute(retrievedDirections.routes[0].overview_polyline, 0);
                    //tuta.util.alert("TEST", JSON.stringify(retrievedDirections.routes[0].overview_polyline.points));

                    tuta.location.tripHistoryImage(retrievedDirections.routes[0].overview_polyline.points, function(result) {
                        //img1.src = success;
                            tuta.util.alert("Trip History", JSON.stringify(result));

                        
                    });
                }, 1);




            } catch (ex) {
                tuta.util.alert("Trip Huuurstory", "I'M A SROFWRAE DEEVELIPPIR!\n\n" + ex);
            }
        };

        this.control("btnTickPress2").onClick = function(button) {
            toggleImage(frmDebug.imgTickIcon2);
        };

        this.control("btnTickPress3").onClick = function(button) {
            toggleImage(frmDebug.imgTickIcon3);
        };

        this.control("btnTickPress4").onClick = function(button) {
            toggleImage(frmDebug.imgTickIcon4);
        };

        this.control("btnTickPress5").onClick = function(button) {
            try {
                tuta.events.csShowDistance();
            } catch (exception) {
                tuta.util.alert("ERROR", "Something went wrong with showing the distance.");
            }
        };

        this.control("btnTickPress6").onClick = function(button) {
            try {
                tuta.util.alert("Current User", currentBooking);

            } catch (exception) {
                tuta.util.alert("Error", "Something went wrong with showing the User ID.");
            }
        };



        /*
          var staticAddress1 = "42 Bright Street, Somerset West, South Africa";
          var staticAddress2 = "90 Parel Vallei, Somerset West, South Africa";



          tuta.location.directions(staticAddress1, staticAddress2, null, function(success, error){
            tuta.location.tripHistoryImage(success, function(success, error){
              //img1.src = success;
            });
          }, 1);



        */
    }; //END OF PRE-SHOW

    tuta.forms.frmDebug.onPostShow = function(form) {
        var self = this;
    };
};