if (Ti.version < 2.0) {
	alert('Sorry - this application template requires Titanium Mobile SDK 2.0 or later');
}

var isAndroid;
var isClick = false;

if(Ti.Platform.osname == 'android'){
	isAndroid = true;
}

var store_selected;

var Stopped = false;
//require the UI components necessary to drive the test
var NavigationController = require('ui/NavigationController').NavigationController, HomeWindow = require('ui/HomeWindow').HomeWindow;

//create NavigationController which will drive our simple application
var controller = new NavigationController();

//open initial window
controller.open(new HomeWindow(controller));


