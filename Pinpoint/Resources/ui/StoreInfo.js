/**
 * @author Mohammed Shahid
 * and Rajeev N B
 */
exports.StoreInfo = function(navController,store_selected) {
	var noOfItems = Ti.App.Properties.getList('AvailableItemsCount');
	var totalCount = Ti.App.Properties.getInt('TotalItemsCount');
	var store_title = Ti.App.Properties.getString('store_name');
	var store_distance = Ti.App.Properties.getString('store_distance');
	var store_address = Ti.App.Properties.getString('address');
	var percentage = Ti.App.Properties.getString('percentage');
	var available = Ti.App.Properties.getString('AvailableItems');

	var storeInfoWindow = Ti.UI.createWindow({
		title : store_title,
		barImage : '/images/header_nologo.png',
	});
	var GetDirections = require('ui/GetDirections').GetDirections;

	var ProductsAvailability = require('ui/ProductsAvailabilty').ProductAvailability;
	var StoreLayout = require('ui/StoreLayout').StoreLayout;

	// Android Specific

	if (isAndroid) {
		storeInfoWindow.navBarHidden = true;
		var headerView = Ti.UI.createView({
			top : 0,
			width : '100%',
			height : '60dp',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var nameShoppingList = Ti.UI.createLabel({
			top : 20,
			left : 200,
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 23
			},
			text : store_title
		});

		var stores = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 15,
			left : 10,
			backgroundImage : '/images/stores.png',
			backgroundSelectedImage : '/images/stores_pressed.png'
		});

		stores.addEventListener('click', function() {
			storeInfoWindow.remove(mapview);
			Ti.App.fireEvent('addMap');
			navController.pop();
		});

		headerView.add(stores);
		headerView.add(nameShoppingList);
		storeInfoWindow.add(headerView);

		var lat = Ti.App.Properties.getDouble('latitude');
		var lon = Ti.App.Properties.getDouble('longitude');

		var mapview;
		mapview = Ti.Map.createView({
			top : '55dp',
			height : '230dp'
		});

		mapview.addAnnotation(Ti.Map.createAnnotation({

			animate : true,
			image : '/images/pin.png',
			latitude : lat,
			longitude : lon
		}));

		var mapBottomView = Ti.UI.createView({
			height : '10dp',
			width : '100%',
			backgroundImage : '/images/map_bottom.png',
			top : '245dp'
		});

		var distance = Ti.UI.createLabel({
			top : '10dp',
			right : '15dp',
			color : 'gray',
			text : '0.2 miles away'
		});

		distance.text = store_distance + 'les away';

		var goToAvailability = Ti.UI.createView({
			top : '35dp',
			height : '60dp',
			width : '120dp',
			right : '10dp',
			backgroundImage : '/images/percentage_background_light.png'
		});

		var percentage = Ti.UI.createLabel({
			top : '5dp',
			left : '25dp',
			font : {
				fontWeight : 'bold',
				fontSize : '16dp'
			},
			color : 'orange',
			text : percentage
		});

		var noOfItems = Ti.UI.createLabel({
			top : '25dp',
			left : '25dp',
			font : {
				fontSize : '12dp'
			},
			color : 'black',
			text : available + "/" + totalCount + ' Items'
		});

		goToAvailability.add(percentage);
		goToAvailability.add(noOfItems);

		goToAvailability.addEventListener('click', function(e) {
			navController.open(new ProductsAvailability(navController,store_selected));
		})
		// View of Information about the Store
		var infoImageView = Ti.UI.createView({
			bottom : '85dp',
			backgroundImage : '/images/location_edge1.png',
			height : '180dp'
		});

		var storeLabel = Ti.UI.createLabel({
			top : '10dp',
			left : '10dp',
			width : '150dp',
			font : {
				fontWeight : 'bold',
				fontSize : 24
			},
			color : 'black',
			text : store_title
		});

		var storeAddress = Ti.UI.createLabel({
			top : '20dp',
			left : '10dp',
			width : '100dp',
			height : '80dp',
			font : {
				fontSize : 18
			},
			text : store_address
		});

		var storeNumber = Ti.UI.createLabel({
			top : '95dp',
			left : '10dp',
			text : '01230129031289',
			color : 'orange',
			font : {
				fontSize : '15'
			}
		});

		storeNumber.addEventListener('click', function(e) {
			Ti.Platform.openURL('tel:9972373207');
		});

		var storeURL = Ti.UI.createLabel({
			top : '120dp',
			left : '10dp',
			text : 'Visit Store',
			color : 'orange',
			color : 'orange',
			font : {
				fontSize : '18'
			}
		});

		storeURL.addEventListener('click', function(e) {
			Titanium.Platform.openURL('www.opensourcemania.co.cc');
		});

		infoImageView.add(storeLabel);
		infoImageView.add(storeAddress);
		infoImageView.add(storeNumber);
		infoImageView.add(storeURL);
		infoImageView.add(distance);

		var getDirectionsView = Ti.UI.createView({

			backgroundImage : '/images/directions.png',
			height : '60dp',
			bottom : '50dp'
		});

		getDirectionsView.addEventListener('click', function(e) {
			navController.open(new GetDirections(navController));
		});

		var checkInView = Ti.UI.createView({

			backgroundImage : '/images/checkin.png',
			height : '60dp',
			bottom : '0dp'
		});

		infoImageView.add(goToAvailability);

		checkInView.addEventListener('click', function(e) {
			navController.open(new StoreLayout(navController,store_selected));
		});

		storeInfoWindow.add(mapview);

	} else {
		var backButton = Ti.UI.createButton({

			height : '30dp',
			width : '60dp',
			top : 0,
			left : 20,
			backgroundImage : '/images/stores.png',
			backgroundSelectedImage : '/images/stores_pressed.png'

		});
		storeInfoWindow.leftNavButton = backButton;

		backButton.addEventListener('click', function(e) {
			isClick = true;
			navController.pop();
		});

		var GetDirections = require('ui/GetDirections').GetDirections;

		var ProductsAvailability = require('ui/ProductsAvailabilty').ProductAvailability;
		var StoreLayout = require('ui/StoreLayout').StoreLayout;

		var lat = Ti.App.Properties.getDouble('latitude');
		var lon = Ti.App.Properties.getDouble('longitude');
		
		var mapView = Titanium.Map.createView({
			mapType : Titanium.Map.TERRAIN_TYPE,
			region : {
				latitude : lat,
				longitude : lon,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			},
			animate : true,
			regionFit : true,
			userLocation : true,
			top : '0dp',
			height : '180dp'
		});

		mapView.addAnnotation(Ti.Map.createAnnotation({

			animate : true,
			image : '/images/pin.png',
			latitude : lat,
			longitude : lon
		}));

		storeInfoWindow.add(mapView);

		var mapBottomView = Ti.UI.createView({
			height : '10dp',
			width : '100%',
			backgroundImage : '/images/map_bottom.png',
			top : '180dp'
		});

		var distance = Ti.UI.createLabel({
			top : '10dp',
			right : '15dp',
			color : 'gray',
			text : '0.2 miles away'
		});

		distance.text = store_distance + 'les away';

		var goToAvailability = Ti.UI.createView({
			top : '35dp',
			height : '60dp',
			width : '120dp',
			right : '10dp',
			backgroundImage : '/images/percentage_background_light.png'
		});

		var percentage = Ti.UI.createLabel({
			top : '5dp',
			left : '25dp',
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			color : 'orange',
			text : percentage
		});

		var noOfItems = Ti.UI.createLabel({
			top : '25dp',
			left : '25dp',
			font : {
				color : 'gray',
				fontSize : 12
			},
			text : 'Store'
		});

		noOfItems.text = available + "/" + totalCount + ' Items';

		goToAvailability.add(percentage);
		goToAvailability.add(noOfItems);

		goToAvailability.addEventListener('click', function(e) {
			navController.open(new ProductsAvailability(navController));
		})
		// View of Information about the Store
		var infoImageView = Ti.UI.createView({
			top : '180dp',
			backgroundImage : '/images/location_edge1.png',
			height : '155dp'
		});

		var storeLabel = Ti.UI.createLabel({
			top : '10dp',
			left : '10dp',
			width : '150dp',
			font : {
				fontWeight : 'bold',
				color : 'black',
				fontSize : 15
			},
			text : store_title
		});

		var storeAddress = Ti.UI.createLabel({
			top : '20dp',
			left : '10dp',
			width : '100dp',
			height : '80dp',
			font : {
				fontSize : 12
			},
			text : store_address
		});

		var storeNumber = Ti.UI.createLabel({
			top : '90dp',
			left : '10dp',
			text : '9972373207',
			color : 'orange',
			font : {
				fontSize : '12'
			}
		});

		storeNumber.addEventListener('click', function(e) {
			Ti.Platform.openURL('tel:9972373207');
		});

		var storeURL = Ti.UI.createLabel({
			top : '110dp',
			left : '10dp',
			text : 'Visit Website',
			color : 'orange',
			font : {
				fontSize : '12'
			}
		});

		storeURL.addEventListener('click', function(e) {
			Titanium.Platform.openURL("http://lmgtfy.com/?q=" + store_title);
		});

		infoImageView.add(storeLabel);
		infoImageView.add(storeAddress);
		infoImageView.add(storeNumber);
		infoImageView.add(storeURL);
		infoImageView.add(distance);

		var getDirectionsView = Ti.UI.createView({
			top : '310dp',
			backgroundImage : '/images/directions.png',
			height : '60dp'
		});

		if (isAndroid) {

			var getDirectionsView = Ti.UI.createView({
				top : '-5dp',
				backgroundImage : '/images/directions.png',
				height : '60dp'
			});

		}

		getDirectionsView.addEventListener('click', function(e) {
			navController.open(new GetDirections(navController));
		});

		var checkInView = Ti.UI.createView({
			top : '360dp',
			backgroundImage : '/images/checkin.png',
			height : '60dp'
		});

		if (isAndroid) {
			var checkInView = Ti.UI.createView({
				top : '0dp',
				backgroundImage : '/images/checkin.png',
				height : '60dp'
			});
		}
		infoImageView.add(goToAvailability);

		checkInView.addEventListener('click', function(e) {
			if (available == 0) {
				checkInView.touchEnabled = false;
				alert('No Items to check-In');
			}else
			navController.open(new StoreLayout(navController,store_selected));
		});
	}

	storeInfoWindow.add(infoImageView);
	storeInfoWindow.add(getDirectionsView);
	storeInfoWindow.add(checkInView);
	storeInfoWindow.add(mapBottomView);

	return storeInfoWindow;

}