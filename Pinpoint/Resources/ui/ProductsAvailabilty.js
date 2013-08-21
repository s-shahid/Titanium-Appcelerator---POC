/**
 * @author Mohammed Shahid
 */

exports.ProductAvailability = function(navController, store_selected) {

	var dataAvailable = [];
	var dataUnAvailable = [];
	var items_available = Ti.App.Properties.getList('AvailableIt');
	var items_unavailable = Ti.App.Properties.getList('UnAvailable');
	var store_id = Ti.App.Properties.getString('StoreId');
	var uniqueCatogories = 'nothing';

	var avail = 0;
	var unavail = 0;
	if (items_available) {

		for ( i = 0; i < items_available.length; i++) {
			if (items_available[i].store_id == store_id) {

				if (uniqueCatogories != items_available[i].category) {
					avail++;
					dataAvailable.push({
						header : items_available[i].category
					});
					uniqueCatogories = items_available[i].category;

				}

				dataAvailable.push({
					title : items_available[i].itemName,
					image : items_available[i].image,
					quantity : items_available[i].quantity
				});

			}

		}
	}

	uniqueCatogories = 'nothing';
	if (items_unavailable) {
		for ( i = 0; i < items_unavailable.length; i++) {

			if (items_unavailable[i].store_id == store_id) {
				if (uniqueCatogories != items_unavailable[i].category) {
					unavail++;

					dataUnAvailable.push({
						header : items_unavailable[i].category
					});
					uniqueCatogories = items_unavailable[i].category;
				}

				dataUnAvailable.push({
					title : items_unavailable[i].itemName,
					image : items_unavailable[i].image,
					quantity : items_unavailable[i].quantity
				});

			}
		}
	}

	var availabilityWindow = Ti.UI.createWindow({
		title : 'What is Available',
		barImage : '/images/header_nologo.png'
	});

	if (isAndroid) {
		availabilityWindow.navBarHidden = true;
		var headerView = Ti.UI.createView({
			top : 0,
			width : '100%',
			height : '60dp',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var productsAvaialble = Ti.UI.createLabel({
			top : 20,
			left : 175,
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 23
			},
			text : 'What is Available'
		});

		var productsAvailabiltyBackButton = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 15,
			left : 10,
			backgroundImage : '/images/back.png',
			backgroundSelectedImage : '/images/back_pressed.png'
		});

		productsAvailabiltyBackButton.addEventListener('click', function() {
			navController.pop();
		});

		var topImageView = Ti.UI.createImageView({
			top : '55dp',
			height : '60dp',
			width : '100%',
			backgroundImage : '/images/orange_background_stores.png'
		});

		var available = Ti.UI.createButton({
			title : 'AVAILABLE' + '(' + (dataAvailable.length - avail) + ')',
			height : '30dp',
			width : '130dp',
			top : '75dp',
			left : '20dp',
			backgroundImage : '/images/products_tab_selected.png',
			color : 'Black',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}

		});

		available.addEventListener('click', function(e) {
			availableItemstableView.show();
			unAvailableItemstableView.hide();
			available.color = 'Black'
			unAvailable.color = 'White'
			available.backgroundImage = '/images/categories_tab_selected.png'
			unAvailable.backgroundImage = '/images/products_tab_normal.png'

		});

		var unAvailable = Ti.UI.createButton({
			title : 'UNAVAILABLE' + '(' + (dataUnAvailable.length - unavail) + ')',
			height : '30dp',
			width : '130dp',
			top : '75dp',
			left : '150dp',
			backgroundImage : '/images/categories_tab_normal.png',
			color : 'White',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}

		});

		unAvailable.addEventListener('click', function(e) {

			unAvailableItemstableView.show();
			availableItemstableView.hide();
			unAvailable.color = 'Black'
			available.color = 'White'
			unAvailable.backgroundImage = '/images/categories_tab_selected.png'
			available.backgroundImage = '/images/products_tab_normal.png'

		});

		var availableItemstableView = Ti.UI.createView({
			top : '105dp',
			backgroundImage : '/images/background.jpg'
		})

		var unAvailableItemstableView = Ti.UI.createView({
			top : '105dp',
			backgroundImage : '/images/background.jpg'
		})

		headerView.add(productsAvailabiltyBackButton);
		headerView.add(productsAvaialble);
		availabilityWindow.add(headerView);
	} else {
		var backButton = Ti.UI.createButton({

			height : '30dp',
			width : '60dp',
			top : 0,
			left : 20,
			backgroundImage : '/images/back.png',
			backgroundSelectedImage : '/images/back_pressed.png'

		});
		availabilityWindow.leftNavButton = backButton;

		backButton.addEventListener('click', function(e) {
			navController.pop();
		});

		var topImageView = Ti.UI.createImageView({
			top : '0dp',
			height : '60dp',
			width : '100%',
			backgroundImage : '/images/orange_background_stores.png'
		});

		var available = Ti.UI.createButton({
			title : 'AVAILABLE' + '(' + (dataAvailable.length - avail) + ')',
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
		available.addEventListener('click', function(e) {
			availableItemstableView.show();
			unAvailableItemstableView.hide();
			available.color = 'Black'
			unAvailable.color = 'White'
			available.backgroundImage = '/images/categories_tab_selected.png'
			unAvailable.backgroundImage = '/images/products_tab_normal.png'

		});

		var unAvailable = Ti.UI.createButton({
			title : 'UNAVAILABLE' + '(' + (dataUnAvailable.length - unavail) + ')',
			height : '30dp',
			width : '130dp',
			top : '15dp',
			left : '150dp',
			backgroundImage : '/images/categories_tab_normal.png',
			color : 'White',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}

		});

		unAvailable.addEventListener('click', function(e) {

			unAvailableItemstableView.show();
			availableItemstableView.hide();
			unAvailable.color = 'Black'
			available.color = 'White'
			unAvailable.backgroundImage = '/images/categories_tab_selected.png'
			available.backgroundImage = '/images/products_tab_normal.png'

		});

		var availableItemstableView = Ti.UI.createView({
			top : '45dp',
			backgroundImage : '/images/background.jpg'
		})

		var unAvailableItemstableView = Ti.UI.createView({
			top : '45dp',
			backgroundImage : '/images/background.jpg'
		})

	}

	var viewItemTableView = require('modules/ViewItemTableView');
	var availableItemsList = new viewItemTableView(dataAvailable, 'Availabilty List', null, false, false);
	var unAvailableItemsList = new viewItemTableView(dataUnAvailable, 'UnAvailabilty List', null, false, false);

	availableItemstableView.add(availableItemsList);
	unAvailableItemstableView.add(unAvailableItemsList)

	availabilityWindow.add(unAvailableItemstableView);
	availabilityWindow.add(availableItemstableView);

	availabilityWindow.add(topImageView);
	availabilityWindow.add(available);
	availabilityWindow.add(unAvailable);

	return availabilityWindow;

}