function AS_Button_e87a0188ecc64b01b112b96c792b2ce9() {
function MOVE_ACTION____5eba0aedd6bc4b6cbad5c0f2add6c172_Callback(){

}function MOVE_ACTION____b079cfaff5004c0eb543b4e88853b6ea_Callback(){

}
frm004Home["imgBurgerIcon"].animate(
kony.ui.createAnimation({"100":{"right":"0px","stepConfig":{"timingFunction":kony.anim.EASE}}}),
{"delay":0,"iterationCount":1,"fillMode":kony.anim.FILL_MODE_FORWARDS,"duration":0.25},
 {"animationEnd" : MOVE_ACTION____b079cfaff5004c0eb543b4e88853b6ea_Callback});

frm004Home["flexMenu"].animate(
kony.ui.createAnimation({"100":{"left":"0px","stepConfig":{"timingFunction":kony.anim.EASE}}}),
{"delay":0,"iterationCount":1,"fillMode":kony.anim.FILL_MODE_FORWARDS,"duration":0.25},
 {"animationEnd" : MOVE_ACTION____5eba0aedd6bc4b6cbad5c0f2add6c172_Callback});
frm004Home["imgTutaLogo"]["isVisible"] = false;
frm004Home["btnMessages"]["isVisible"] = false;
frm004Home["imgMessages"]["isVisible"] = false;
frm004Home["lblMessageCount"]["isVisible"] = false;
frm004Home["btnCloseMenu"]["isVisible"] = true;
frm004Home["imgBurgerClose"]["isVisible"] = true;
frm004Home["btnMenu"]["isVisible"] = false;

}