exports.SelectStore = function(navController) {

	Titanium.App.Properties.setList('AvailableIt', []);
	Titanium.App.Properties.setList('UnAvailable', []);

	var ListView;
	var count = [];
	var ViewItems = require('ui/ViewItems').ViewItems;
	var StoreInfo = require('ui/StoreInfo').StoreInfo;

	Ti.App.addEventListener('navigateToStoreInfo', function(e) {
		navController.open(new StoreInfo(navController));
	});

	if (isAndroid) {
		var selectStoreWindow = Ti.UI.createWindow({
		});
		selectStoreWindow.navBarHidden = true;
	} else {
		var selectStoreWindow = Ti.UI.createWindow({
			title : 'Select a Store',
			barImage : '/images/header_nologo.png',
			backButtonTitleImage : 'transparent'
		});
	}
	var i = 0;
	var storeNameForLists = [];
	var dist;
	var ZipCodeFinder = require('modules/ZipCodeFinder');
	var listRow = require('ui/ListStores');
	var distanceFinder = require('modules/DistanceFinder');
	ListView = new listRow(storeNameForLists, navController);

	var leftImage = Ti.UI.createView({
		backgroundImage : '/images/percentage_background.png',
		width : '55dp',
		height : '35dp'
	});

	var percentage = Ti.UI.createLabel({
		left : '10dp',
		font : {
			fontSize : 1
		},
		color : 'orange',
		width : '50dp',
		top : '5dp',
		height : '10dp'
	});

	var noOfitem = Ti.UI.createLabel({
		top : '20dp',
		left : '10dp',
		width : '60dp',
		font : {
			fontSize : 1
		},
		height : '10dp',
		color : 'white'
	});

	leftImage.add(percentage);
	leftImage.add(noOfitem);

	var storeIds = [];
	var storeaddress = [];

	var indicator = Titanium.UI.createActivityIndicator({
		height : 80,
		width : 20,
		color : 'black',
		style : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});

	indicator.show();
	ZipCodeFinder.ZipCodeFinder(37.771068, -122.407402, function(lat, lon, storeName, storeID, store_add, finished) {
		storeIds.push(storeID);
		storeaddress.push(store_add);
		Ti.App.Properties.setList('StoreIDS', storeIds);
		Ti.App.Properties.setList('addresses', storeaddress);

		distanceFinder.DistanceFinder(37.771068, -122.407402, lat, lon, function(distance) {
			dist = distance;
			storeNameForLists.push({
				title : storeName,
				distance : dist,
				lat : lat,
				lon : lon,
				address : store_add
			});

			Ti.App.Properties.setList('storesInformation', storeNameForLists);
			Ti.App.fireEvent('updateListStoresView', {
				title : storeNameForLists
			});
			var totalCount = Ti.App.Properties.getInt('TotalItemsCount');
			var available = Ti.App.Properties.getString('AvailableItems');
			var percentageValue = Ti.App.Properties.getString('percentage');
			percentage.text = percentageValue;
			noOfitem.text = available + '/' + totalCount;
			mapview.addAnnotation(Ti.Map.createAnnotation({
				title : storeName,
				subtitle : dist + 'les away',
				image : '/images/pin.png',
				latitude : lat,
				longitude : lon,
				id : i,
				leftView : leftImage,
				rightButton : Ti.UI.iPhone.SystemButton.DISCLOSURE
			}));
			i++;
			indicator.hide();
			isClick = true;
			if (!isAndroid)
				backButton.enabled = true;
		});
	});

	if (isAndroid) {

		var headerView = Ti.UI.createView({
			top : 0,
			width : '100%',
			height : '60dp',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var selectAStore = Ti.UI.createLabel({
			top : 20,
			left : 160,
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 23
			},
			text : 'Select A Store'
		});

		var viewLists = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 15,
			left : 10,
			backgroundImage : '/images/view_list.png',
			backgroundSelectedImage : '/images/view_list_pressed.png'
		});

		viewLists.addEventListener('click', function() {
			navController.open(new ViewItems(navController));
		});

		headerView.add(viewLists);
		headerView.add(selectAStore);

		var topImageView = Ti.UI.createView({
			top : '55dp',
			layout : 'absolute',
			height : '100dp',
			width : '100%',
			backgroundImage : '/images/orange_background_stores.png',
		});

		var mapview;
		mapview = Ti.Map.createView();

		mapview.setTop = '0dp';
		mapview.setMapType = Titanium.Map.STANDARD_TYPE;
		mapview.region = {
			latitude : 37.771068,
			longitude : -122.407402,
			latitudeDelta : 0.8,
			longitudeDelta : 0.8
		};
		mapview.regionFit = true;

		var mapButton = Ti.UI.createButton({
			title : 'MAP',
			height : '30dp',
			width : '130dp',
			top : '35dp',
			left : '30dp',

			backgroundImage : '/images/products_tab_selected.png',
			color : 'Black',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		mapButton.addEventListener('click', function() {
			ListView.hide();
			mapview.show();
			mapButton.color = 'Black'
			listButton.color = 'White'
			mapButton.backgroundImage = '/images/products_tab_selected.png'
			listButton.backgroundImage = '/images/products_tab_normal.png'
			listButton.backgroundImage = '/images/categories_tab_normal.png'
		});

		var listButton = Ti.UI.createButton({
			title : 'LIST',
			height : '30dp',
			width : '130dp',
			top : '35dp',
			left : '158dp',
			backgroundImage : '/images/products_tab_normal.png',
			color : 'white',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		listButton.addEventListener('click', function() {

			ListView.show();
			mapview.hide();
			listButton.color = 'Black'
			mapButton.color = 'White'
			listButton.backgroundImage = '/images/categories_tab_selected.png'
			mapButton.backgroundImage = '/images/products_tab_normal.png'

		});

		Ti.App.addEventListener('removeMap', function(e) {
			selectStoreWindow.remove(mapview);
		});

		mapview.addEventListener('click', function(evt) {
			// Check for all of the possible names that clicksouce
			// can report for the left button/view.
			if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView') {
				count = Ti.App.Properties.getList('AvailableItemsCount');
				Ti.API.info("Annotation " + evt.title + ", left button clicked.");

				Ti.App.Properties.setDouble('latitude', storeNameForLists[evt.annotation.id].lat);
				Ti.App.Properties.setDouble('longitude', storeNameForLists[evt.annotation.id].lon);
				Ti.App.Properties.setString('store_name', evt.title);
				Ti.App.Properties.setString('address', storeNameForLists[evt.annotation.id].address);
				Ti.App.Properties.setString('store_distance', storeNameForLists[evt.annotation.id].distance);
				Ti.App.Properties.setString('StoreId', storeIds[evt.annotation.id]);
				store_selected = storeIds[evt.annotation.id];
				Ti.App.Properties.setString('AvailableItems', count[evt.annotation.id]);

				selectStoreWindow.remove(mapview);
				navController.open(new StoreInfo(navController, store_selected));
			}
		});

		var selectStoreSegmentViews = Ti.UI.createView({
			top : '125dp',
			height : '100%'
		});

		selectStoreWindow.add(headerView);
		topImageView.add(mapButton);
		topImageView.add(listButton);
		selectStoreSegmentViews.add(ListView);
		selectStoreSegmentViews.add(mapview);
		selectStoreWindow.add(selectStoreSegmentViews);
		selectStoreWindow.add(topImageView);

	} else {
		var backButton = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 0,
			left : 20,
			backgroundImage : '/images/view_list.png',
			backgroundSelectedImage : '/images/view_list_pressed.png',
		});
		selectStoreWindow.leftNavButton = backButton;

		backButton.addEventListener('click', function(e) {
			Ti.App.fireEvent('Stop');
			navController.pop();
		});

		var topImageView = Ti.UI.createImageView({
			top : '0dp',
			height : '60dp',
			width : '100%',
			backgroundImage : '/images/orange_background_stores.png'
		})

		var mapButton = Ti.UI.createButton({
			title : 'Map',
			height : '30dp',
			width : '130dp',
			top : '15dp',
			left : '20dp',
			backgroundImage : '/images/products_tab_selected.png',
			color : 'Black',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		mapButton.addEventListener('click', function() {
			ListView.hide();
			mapview.show();
			mapButton.color = 'Black'
			listButton.color = 'White'
			mapButton.backgroundImage = '/images/products_tab_selected.png'
			listButton.backgroundImage = '/images/categories_tab_normal.png'
		});

		var listButton = Ti.UI.createButton({
			title : 'List',
			height : '30dp',
			width : '130dp',
			top : '15dp',
			left : '145dp',
			backgroundImage : '/images/products_tab_normal.png',
			color : 'white',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		listButton.addEventListener('click', function() {
			ListView.show();
			mapview.hide();
			listButton.color = 'Black'
			mapButton.color = 'White'
			listButton.backgroundImage = '/images/categories_tab_selected.png'
			mapButton.backgroundImage = '/images/products_tab_normal.png'
		});

		var mapview = Titanium.Map.createView({
			mapType : Titanium.Map.TERRAIN_TYPE,
			region : {
				latitude : 37.771068,
				longitude : -122.407402,
				latitudeDelta : 0.05,
				longitudeDelta : 0.05
			},
			animate : true,
			regionFit : true,
			userLocation : true,
			top : '0dp',
			height : '90%'

		});

		mapview.addEventListener('click', function(evt) {
			if (Ti.App.Properties.getList('AvailableItemsCount') != null)
				count = Ti.App.Properties.getList('AvailableItemsCount');
			Ti.App.Properties.setString('AvailableItems', count[evt.annotation.id]);
			var totalCount = Ti.App.Properties.getInt('TotalItemsCount');
			var available = Ti.App.Properties.getString('AvailableItems');
			var percentageValue = Ti.App.Properties.getString('percentage');
			noOfitem.text = available + '/' + totalCount;

			// Check for all of the possible names that clicksouce
			// can report for the left button/view.
			if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'rightButton' || evt.clicksource == 'leftView') {
				Ti.App.Properties.setString('AvailableItems', count[evt.annotation.id]);
				store_selected = storeIds[evt.annotation.id];
				Ti.App.Properties.setDouble('latitude', storeNameForLists[evt.annotation.id].lat);
				Ti.App.Properties.setDouble('longitude', storeNameForLists[evt.annotation.id].lon);
				Ti.App.Properties.setString('store_name', evt.title);
				Ti.App.Properties.setString('address', storeNameForLists[evt.annotation.id].address);
				Ti.App.Properties.setString('store_distance', storeNameForLists[evt.annotation.id].distance);
				Ti.App.Properties.setString('StoreId', store_selected);
				navController.open(new StoreInfo(navController, store_selected));
			}
		});

		var selectStoreSegmentViews = Ti.UI.createView({
			top : '45dp',
			height : '100%'
		});

		topImageView.add(mapButton);
		topImageView.add(listButton);

		selectStoreSegmentViews.add(mapview);
		selectStoreSegmentViews.add(ListView);
		ListView.hide();
		selectStoreWindow.add(selectStoreSegmentViews);
		selectStoreWindow.add(topImageView);
		selectStoreWindow.add(indicator);
	}

	return selectStoreWindow;

};
