exports.StoreLayout = function(navController, store_selected) {
	var availableBack = [];
	var availableFront = [];
	var availableLeft = [];
	var availableRight = [];
	var itemaisle1 = [];
	var itemaisle2 = [];
	var itemaisle3 = [];
	var itemaisle4 = [];
	var itemaisle5 = [];
	var itemaisle6 = [];
	var itemaisle7 = [];
	var itemaisle8 = [];
	var itemaisle9 = [];
	var itemaisle10 = [];
	var itemaisle11 = [];
	var itemaisle12 = [];
	var itemaisle13 = [];
	var itemaisle14 = [];
	var itemaisle15 = [];
	var itemaisle16 = [];
	var itemaisle17 = [];
	var itemaisle18 = [];
	var itemaisle19 = [];
	var itemaisle20 = [];

	var store_title = Ti.App.Properties.getString('store_name');

	var BrowseItems = require('ui/BrowseItems').BrowseItems;

	var storeWindow = Ti.UI.createWindow({
		title : store_title,
		barImage : '/images/header_nologo.png',
		backgroundImage : '/images/background.jpg'
	});

	if (isAndroid) {
		storeWindow.navBarHidden = true;
		var headerView = Ti.UI.createView({
			top : '0dp',
			width : '100%',
			height : '60dp',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var storeName = Ti.UI.createLabel({
			top : 20,
			left : 200,
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 23
			},
			text : store_title
		});

		var back = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 15,
			left : 10,
			backgroundImage : '/images/back.png',
			backgroundSelectedImage : '/images/back-pressed.png'
		});

		back.addEventListener('click', function() {
			navController.pop();
		});

		headerView.add(back);
		headerView.add(storeName);
		storeWindow.add(headerView);

		var imageArea = Ti.UI.createImageView({
			image : '/images/store_overview_header.png',
			top : '55dp',
			width : '100%'
		});

		var aisleFront = Ti.UI.createImageView({
			image : '/images/front_inactive.png',
			top : '140dp',
			left : '80dp',
			touchEnabled : false
		});

		var aisleLeft = Ti.UI.createImageView({
			image : '/images/left_inactive.png',
			top : '240dp',
			left : '0dp',
			touchEnabled : false
		});

		var aisleRight = Ti.UI.createImageView({
			image : '/images/right_inactive.png',
			top : '240dp',
			right : '0dp',
			touchEnabled : false
		});

		var aisleBottom = Ti.UI.createImageView({
			image : '/images/back_inactive.png',
			bottom : '0dp',
			left : '80dp',
			touchEnabled : false
		});

		var aisle1 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '240dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle2 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '240dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle3 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '240dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle4 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '240dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle5 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '240dp',
			left : '220dp',
			touchEnabled : false
		});

		var aisle6 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '290dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle7 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '290dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle8 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '290dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle9 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '290dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle10 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '290dp',
			left : '220dp',
			touchEnabled : false
		});

		var aisle11 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '340dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle12 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '340dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle13 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '340dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle14 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '340dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle15 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '340dp',
			left : '220dp',
			touchEnabled : false

		});

		var aisle16 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '390dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle17 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '390dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle18 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '390dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle19 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '390dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle20 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '390dp',
			left : '220dp',
			touchEnabled : false

		});

	} else {

		var backButton = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 0,
			left : 20,
			backgroundImage : '/images/back.png',
			backgroundSelectedImage : '/images/back_pressed.png'

		});
		storeWindow.leftNavButton = backButton;

		backButton.addEventListener('click', function(e) {
			navController.pop();
		});

		var imageArea = Ti.UI.createImageView({
			image : '/images/store_overview_header.png',
			top : '0dp'
		});

		var aisleFront = Ti.UI.createImageView({
			image : '/images/front_inactive.png',
			top : '50dp',
			left : '70dp',
			touchEnabled : false
		});

		var aisleLeft = Ti.UI.createImageView({
			image : '/images/left_inactive.png',
			top : '100dp',
			left : '0dp',
			touchEnabled : false
		});

		var aisleRight = Ti.UI.createImageView({
			image : '/images/right_inactive.png',
			top : '100dp',
			right : '0dp',
			touchEnabled : false
		});

		var aisleBottom = Ti.UI.createImageView({
			image : '/images/back_inactive.png',
			bottom : '0dp',
			touchEnabled : false
		});

		var aisle1 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '100dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle2 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '100dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle3 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '100dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle4 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '100dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle5 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '100dp',
			left : '220dp',
			touchEnabled : false
		});

		var aisle6 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '150dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle7 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '150dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle8 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '150dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle9 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '150dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle10 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '150dp',
			left : '220dp',
			touchEnabled : false
		});

		var aisle11 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '200dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle12 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '200dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle13 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '200dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle14 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '200dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle15 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '200dp',
			left : '220dp',
			touchEnabled : false
		});

		var aisle16 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '250dp',
			left : '60dp',
			touchEnabled : false
		});

		var aisle17 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '250dp',
			left : '100dp',
			touchEnabled : false
		});

		var aisle18 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '250dp',
			left : '140dp',
			touchEnabled : false
		});

		var aisle19 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '250dp',
			left : '180dp',
			touchEnabled : false
		});

		var aisle20 = Ti.UI.createImageView({
			image : '/images/aisle_inactive.png',
			top : '250dp',
			left : '220dp',
			touchEnabled : false
		});

	}

	//Event Listeners Getting Outside//
	aisleBottom.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, availableBack, store_selected));
		//Navigation to next Controller
	});
	aisleFront.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, availableFront, store_selected));
	});
	aisleRight.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, availableRight, store_selected));
	});
	aisleLeft.addEventListener('click', function(e) {
		// Navigation
		navController.open(new BrowseItems(navController, availableLeft, store_selected));
	});

	aisle1.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle1, store_selected));
	});
	aisle2.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle2, store_selected));
	});

	aisle3.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle3, store_selected));
	});
	aisle4.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle4, store_selected));
	});
	aisle5.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle5, store_selected));
	});
	aisle6.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle6, store_selected));
	});
	aisle7.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle7, store_selected));
	});

	aisle8.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle8, store_selected));
	});

	aisle9.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle9, store_selected));
	});
	aisle10.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle10, store_selected));
	});

	aisle11.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle11, store_selected));
	});
	aisle12.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle12, store_selected));
	});
	aisle13.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle13, store_selected));
	});
	aisle14.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle14, store_selected));
	});
	aisle15.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle15, store_selected));
	});
	aisle16.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle16, store_selected));
	});
	aisle17.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle17, store_selected));
	});
	aisle18.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle18, store_selected));
	});
	aisle19.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle19, store_selected));
	});
	aisle20.addEventListener('click', function(e) {
		navController.open(new BrowseItems(navController, itemaisle20, store_selected));
	});

	var store_id = Ti.App.Properties.getString('StoreId');
	var store_title = Ti.App.Properties.getString('store_name');

	var items_available = Ti.App.Properties.getList('AvailableIt');
	var items_unavailable = Ti.App.Properties.getList('UnAvailable');

	var available_items = [];

	for (var i = 0; i < items_available.length; i++) {

		if (items_available[i].store_id == store_id) {
			available_items.push({
				itemName : items_available[i].itemName,
				itemid : items_available[i].itemid,
				image : items_available[i].image,
				category : items_available[i].category,
				shopping_name : items_available[i].shopping_name,
				store_id : items_available[i].storeID,
				aisle_no : items_available[i].aisle_no,
				quantity : items_available[i].quantity
			});

		}
	}

	Ti.App.Properties.setList('ItemsStoreAvailable', available_items);

	var searchAisle;

	for (var i = 0; i < available_items.length; i++) {

		searchAisle = available_items[i].aisle_no;
		console.log(searchAisle);
		var commaSeperatedAisle = searchAisle.split(",");

		var l = 1;

		for ( j = 0; j < l; j++) {
			if (searchAisle == 'Aisle:Back' || searchAisle == 'Aisle:Back Right' || searchAisle == 'Aisle:Back Left') {
				aisleBottom.image = '/images/back_active.png';
				aisleBottom.touchEnabled = true;
				availableBack.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:Front' || searchAisle == 'Aisle:Front Right' || searchAisle == 'Aisle:Front Left') {
				aisleFront.image = '/images/front_active.png';
				aisleFront.touchEnabled = true;
				availableFront.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});
			} else if (searchAisle == 'Aisle:Right' || searchAisle == 'Aisle:NOAISLE' || searchAisle == 'Aisle:Right Center') {
				aisleRight.image = '/images/right_active.png';
				aisleRight.touchEnabled = true;
				availableRight.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:Left' || searchAisle == 'Aisle:NOAISLE' || searchAisle == 'Aisle:Left Center') {
				aisleLeft.image = '/images/left_active.png';
				aisleLeft.touchEnabled = true;
				availableLeft.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:1') {
				aisle1.image = '/images/aisle.png';
				aisle1.touchEnabled = true;
				itemaisle1.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:2') {
				aisle2.image = '/images/aisle.png';
				aisle2.touchEnabled = true;
				itemaisle2.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:3') {
				aisle3.image = '/images/aisle.png';
				aisle3.touchEnabled = true;
				itemaisle3.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:4') {
				aisle4.image = '/images/aisle.png';
				aisle4.touchEnabled = true;
				itemaisle4.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:5') {
				aisle5.image = '/images/aisle.png';
				aisle5.touchEnabled = true;
				itemaisle5.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:6') {
				aisle6.image = '/images/aisle.png';
				aisle6.touchEnabled = true;
				itemaisle6.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:7') {
				aisle7.image = '/images/aisle.png';
				aisle7.touchEnabled = true;
				itemaisle7.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:8') {
				aisle8.image = '/images/aisle.png';
				aisle8.touchEnabled = true;
				itemaisle8.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:9') {
				aisle9.image = '/images/aisle.png';
				aisle9.touchEnabled = true;
				itemaisle9.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:10') {
				aisle10.image = '/images/aisle.png';
				aisle10.touchEnabled = true;
				itemaisle10.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:11') {
				aisle11.image = '/images/aisle.png';
				aisle11.touchEnabled = true;
				itemaisle11.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:12') {
				aisle12.image = '/images/aisle.png';
				aisle12.touchEnabled = true;
				itemaisle12.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:13') {
				aisle13.image = '/images/aisle.png';
				aisle13.touchEnabled = true;
				itemaisle13.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:14') {
				aisle14.image = '/images/aisle.png';
				aisle14.touchEnabled = true;
				itemaisle14.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:15') {
				aisle15.image = '/images/aisle.png';
				aisle15.touchEnabled = true;
				itemaisle15.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:16') {
				aisle16.image = '/images/aisle.png';
				aisle16.touchEnabled = true;
				itemaisle16.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:17') {
				aisle17.image = '/images/aisle.png';
				aisle17.touchEnabled = true;
				itemaisle17.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:18') {
				aisle18.image = '/images/aisle.png';
				aisle18.touchEnabled = true;
				itemaisle18.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:19') {
				aisle19.image = '/images/aisle.png';
				aisle19.touchEnabled = true;
				itemaisle19.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			} else if (searchAisle == 'Aisle:20') {
				aisle20.image = '/images/aisle.png';
				aisle20.touchEnabled = true;
				itemaisle20.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});

			}
			else{
				aisle5.image = '/images/aisle.png';
				aisle5.touchEnabled = true;
				itemaisle5.push({
					itemName : available_items[i].itemName,
					itemid : available_items[i].itemid,
					image : available_items[i].image,
					category : available_items[i].category,
					shopping_name : available_items[i].shopping_name,
					store_id : available_items[i].storeID,
					aisle_no : available_items[i].aisle_no,
					quantity : available_items[i].quantity
				});
			}
			if (commaSeperatedAisle.length > 1) {

				commaSeperatedAisle[1] = 'Aisle:' + commaSeperatedAisle[1];
				searchAisle = commaSeperatedAisle[1];
				l = 2;
			}
		}

	}
	storeWindow.add(imageArea);
	storeWindow.add(aisleFront);
	storeWindow.add(aisleLeft);
	storeWindow.add(aisleRight);
	storeWindow.add(aisleBottom);
	storeWindow.add(aisle1);
	storeWindow.add(aisle2);
	storeWindow.add(aisle3);
	storeWindow.add(aisle4);
	storeWindow.add(aisle5);
	storeWindow.add(aisle6);
	storeWindow.add(aisle7);
	storeWindow.add(aisle8);
	storeWindow.add(aisle9);
	storeWindow.add(aisle10);
	storeWindow.add(aisle11);
	storeWindow.add(aisle12);
	storeWindow.add(aisle13);
	storeWindow.add(aisle14);
	storeWindow.add(aisle15);
	storeWindow.add(aisle16);
	storeWindow.add(aisle17);
	storeWindow.add(aisle18);
	storeWindow.add(aisle19);
	storeWindow.add(aisle20);

	return storeWindow;
};
