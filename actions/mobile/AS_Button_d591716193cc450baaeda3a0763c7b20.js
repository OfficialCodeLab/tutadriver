function AS_Button_d591716193cc450baaeda3a0763c7b20() {
function MOVE_ACTION____3b6e1ddbfca841bb9c75212387a82f6d_Callback(){

}function MOVE_ACTION____2703867474544fd99aef420ea937317c_Callback(){

}
frm004Home["flexMapScreen"].animate(
kony.ui.createAnimation({"100":{"left":"80%","stepConfig":{"timingFunction":kony.anim.EASE}}}),
{"delay":0,"iterationCount":1,"fillMode":kony.anim.FILL_MODE_FORWARDS,"duration":0.25},
 {"animationEnd" : MOVE_ACTION____2703867474544fd99aef420ea937317c_Callback});

frm004Home["flexMenu"].animate(
kony.ui.createAnimation({"100":{"left":"0%","stepConfig":{"timingFunction":kony.anim.EASE}}}),
{"delay":0,"iterationCount":1,"fillMode":kony.anim.FILL_MODE_FORWARDS,"duration":0.25},
 {"animationEnd" : MOVE_ACTION____3b6e1ddbfca841bb9c75212387a82f6d_Callback});
frm004Home["undefined"]["isVisible"] = false;
frm004Home["btnCloseCheeseburger"]["isVisible"] = true;

}