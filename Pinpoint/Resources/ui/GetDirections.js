exports.GetDirections = function(navController) {

	var win = Ti.UI.createWindow({
		title : 'Directions to Store',
		barImage : '/images/header_nologo.png',
		layout : 'vertical'
	});

	if (isAndroid) {
		win.navBarHidden = true;
	}

	var headerView = Ti.UI.createView({
		top : 0,
		width : '100%',
		height : '60dp',
		layout : 'absolute',
		backgroundImage : '/images/header_nologo.png'
	});

	var getDirections = Ti.UI.createLabel({
		top : 20,
		left : 200,
		color : 'white',
		font : {
			fontWeight : 'bold',
			fontSize : 23
		},
		text : 'Directions'
	});

	var storesBackButton = Ti.UI.createButton({
		height : '30dp',
		width : '60dp',
		top : 15,
		left : 10,
		backgroundImage : '/images/stores.png',
		backgroundSelectedImage : '/images/stores_pressed.png'
	});

	storesBackButton.addEventListener('click', function() {
		navController.pop();
	});

	var backButton = Ti.UI.createButton({

		height : '30dp',
		width : '60dp',
		top : 0,
		left : 20,
		backgroundImage : '/images/stores.png',
		backgroundSelectedImage : '/images/stores_pressed.png'
	});
	win.leftNavButton = backButton;

	backButton.addEventListener('click', function(e) {

		navController.pop();
	});

	var lat = Ti.App.Properties.getDouble('latitude');
	var lon = Ti.App.Properties.getDouble('longitude');

	var googleUrl = "http://maps.google.com/maps?saddr=37.771068,-122.407402&daddr=" + lat + "," + lon;

	var extwebview = Titanium.UI.createWebView({
		top : '-4dp',
		left : 0,
		right : 0,
		url : googleUrl,
		backgroundColor : '#ccc'
	});
	if (isAndroid) {
		headerView.add(storesBackButton);
		headerView.add(getDirections);
		win.add(headerView);
	}
	win.add(extwebview);

	return win;

}