if (typeof(tuta) === "undefined") {
  tuta = {};
}

if (typeof(tuta.forms) === "undefined") {
  tuta.forms = {};
}

tuta.forms.frmMessageMain = function() {
  // initialize controller 
  tuta.forms.frmMessageMain = new tuta.controller(frmMessageMain); 

  // Initialize form events	
  tuta.forms.frmMessageMain.onInit = function(form) {
  };  

  tuta.forms.frmMessageMain.onPreShow = function(form) {
    var self = this;
    this.control("btnComposeMessage").onClick = function(button){
      frmMessageCompose.flexLoading.setVisibility(true);
      frmMessageCompose.lblHeaderTitle.text = "New Messages";
      frmMessageCompose.lblSender.text =  "";
      frmMessageCompose.txtSendTo.setVisibility(true);
      tuta.animate.move(frmMessageCompose.flexMessageSent, 0, 0, "100%", null);
      tuta.forms.frmMessageCompose.show();
      tuta.animate.move(frmMessageCompose.flexScrollMessages ,0, 105, "100%", null);
      frmMessageCompose.flexLoading.setVisibility(false);
    };
    this.control("btnBack").onClick = function(button){
      kony.application.getPreviousForm().show();
    };

    this.control("segMessages").onRowClick = function (widget){
      frmMessageCompose.flexLoading.setVisibility(true);
      var data = frmMessageMain.segMessages.selectedItems[0];
      frmMessageCompose.lblHeaderTitle.text = "Reply";
      frmMessageCompose.lblSender.text = data.sender;
      frmMessageCompose.rtMessage.text = data.text;
      frmMessageCompose.lblTime.text = data.time;
      frmMessageCompose.txtSendTo.setVisibility(false);
      tuta.forms.frmMessageCompose.show();
      tuta.animate.move(frmMessageCompose.flexMessageSent, 0, 0, "100%", null);
      tuta.animate.move(frmMessageCompose.flexScrollMessages ,0, 105, 0, null);
      frmMessageCompose.flexLoading.setVisibility(false);
      if(data.status === "0"){
        tuta.readMessage(data.id);
      }
    };

    //#ifdef android
    this.control("txtSearch").onTextChange = function(widget) {

      if (frmMessageMain.txtSearch.text.length === 0) {

        frmMessageMain.imgSearchIcon.setVisibility(true);

      }
      else if (frmMessageMain.txtSearch.text.length > 0) {

        frmMessageMain.imgSearchIcon.setVisibility(false);
      }
    };
    //#endif


    //#ifdef iphone
    this.control("txtSearch").onBeginEditing = function(widget) {
      frmMessageMain.imgSearchIcon.setVisibility(false);
    };

    this.control("txtSearch").onEndEditing = function (widget) {
      if(frmMessageMain.txtSearch.text.length === 0)
        frmMessageMain.imgSearchIcon.setVisibility(true);
    };
    //#endif
    
    loadMessages();
    tuta.map.stopMapListener();

  };//END of OnPreShow

  tuta.forms.frmMessageMain.onPostShow = function(form) {
    var self = this;
    /*this.header("btnMenu").onClick =function(button) {
     	self.topMenu.toggle();
    };*/
    loadMessages();
  };//END of OnPostShow
};

var messageList = [];
function loadMessages(){
  tuta.getMessages(function(success, error){
    if(error === undefined){
      // Put in try-catch to ignore tempMessageList.length = null TypeError
      // It's fine to have no messages (loner)
      try {
        var tempMessageList = success;
        messageList = [];
        //Split the list by whether the message is read or not (ie status = 0)
        //tuta.util.alert("TEST", tempMessageList[0].id);
        var messagesRead = [];
        var messagesUnread = [];
        for(var i = 0; i < tempMessageList.length; i++){
          if(tempMessageList[i].status == "0"){
            messagesUnread.push(tempMessageList[i]);
          }
          else{
            messagesRead.push(tempMessageList[i]);
          }
        }

        var textShort;
        var text;
        var parsedTimeStr;
        for(var j = 0; j < messagesUnread.length; j++){
          parsedTimeStr = tuta.events.dateString(messagesUnread[j].time + "");
          text = messagesUnread[j].text;
          if (text.length > 18){
            textShort = shortenText(text, 15);
          }
          else{
            textShort = text;
          }
          var msgunread = {
            "sender" : messagesUnread[j].sender.replace(" ", "").toLowerCase(),
            "time" : parsedTimeStr,
            "text" : text, 
            "textShort" : textShort, 
            "imgStatus" : "unreadbg.png",
            "imgDot" : "ellipsecs.png",
            "status" : messagesUnread[j].status,
            "id" : messagesUnread[j].id
          };
          messageList.push(msgunread);
        }

        for(var k = 0; k < messagesRead.length; k++){    
          parsedTimeStr = tuta.events.dateString(messagesRead[k].time + "");
          text = messagesRead[k].text;
          if (text.length > 18){
            textShort = shortenText(text, 15);
          }
          else{
            textShort = text;
          }
          var msgread = {
            "sender" : messagesRead[k].sender.replace(" ", "").toLowerCase(),
            "time" :  parsedTimeStr,
            "text" : text, 
            "textShort" : textShort, 
            "imgStatus" : "readbg.png",
            "imgDot" : "readbg.png",
            "status" : messagesRead[k].status,
            "id" : messagesRead[k].id
          };
          messageList.push(msgread);
        }

        //Take the half of the array that contains unread messages and assign imgStatus and imgDot to the unread state and vice versa

        //Join the arrays to messageList
        var unreadCount = parseInt(messagesUnread.length);
        if(unreadCount > 0){
          frm004Home.imgMessages.src = "envelope.png";
          frm004Home.lblMessageCount.text = Math.round(unreadCount) + "";
          frm004Home.lblMessageCount.setVisibility(true);
        }
        else{
          frm004Home.imgMessages.src = "envelope.png";
          frm004Home.lblMessageCount.text = "";
          frm004Home.lblMessageCount.setVisibility(false);        
        }

        frmMessageMain.segMessages.widgetDataMap = { "lblFrom"  : "sender", "lblTime" : "time", "lblTextPreview" : "textShort", "imgMessageStatus" : "imgStatus", "imgEllipse" : "imgDot"};
        frmMessageMain.segMessages.setData(messageList);
      } catch (e) {}
    }
  });
}

