exports.BrowseItems = function(navController, availableItems, store_selected) {

	var shopping_name = Ti.App.Properties.getString('name');
	var avail = 0;
	// Sliding Drawer
	Ti.UI.backgroundColor = '#ddd';

	var win = Ti.UI.createWindow({
		backgroundImage : '/images/background.jpg',
		title : 'Browse Items',
		layout : 'absolute',
		barImage : '/images/header_nologo.png',
		backButtonTitleImage : 'transparent'
	});

	if (isAndroid) {
		win.navBarHidden = true;
		win.addEventListener('android:back', function(e) {
			navController.pop();
		});

		var headerView = Ti.UI.createView({
			top : '0dp',
			width : '100%',
			height : '60dp',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var storeName = Ti.UI.createLabel({
			top : 20,
			left : 160,
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 23
			},
			text : 'Browse Items'
		});

		var back = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 15,
			left : 10,
			backgroundImage : '/images/overview.png',
			backgroundSelectedImage : '/images/overview-pressed.png'
		});

		back.addEventListener('click', function() {
			navController.pop();
		});

		headerView.add(back);
		headerView.add(storeName);
		win.add(headerView);
	}

	var backButton = Ti.UI.createButton({
		height : '30dp',
		width : '60dp',
		top : 0,
		left : 20,
		backgroundImage : '/images/overview.png'
	});
	win.leftNavButton = backButton;

	backButton.addEventListener('click', function(e) {
		navController.pop();
	});

	var views = [];
	var buttonGotIt = [];
	var buttonNotGotIt = [];
	Ti.App.fireEvent('updateInv');

	for (var i = 0; i < availableItems.length; i++) {

		var image = Ti.UI.createImageView({
			image : availableItems[i].image,
			top : '100dp',
			left : '100dp',
			width : 150,
			height : 100
		});

		buttonGotIt[i] = Ti.UI.createButton({
			top : '300dp',
			left : '20dp',
			height : '80dp',
			width : '80dp',
			title : 'Got it',
			clickIdGot : i,
			image : '/images/checked.png'

		});

		buttonNotGotIt[i] = Ti.UI.createButton({
			top : '300dp',
			right : '20dp',
			height : '80dp',
			width : '80dp',
			title : 'NotGot',
			clickIdNotGot : i,
			image : '/images/cant_get_it_sad_face.png'
		});

		var itemLabel = Ti.UI.createLabel({
			top : '250dp',
			text : availableItems[i].itemName,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			color : 'orange'
		});

		// Code to remove buttons if item already added
		if (isAndroid) {
			var dbInventory = Ti.Database.open('pinpoint');
		} else {
			var dbInventory = Ti.Database.open('pinpoint.sql');
		}
		var rows = dbInventory.execute('select * from inventory where shopping_name = ? and itemName = ?', shopping_name, availableItems[i].itemName);
		if (rows.isValidRow()) {
			buttonGotIt[i].hide();
			buttonNotGotIt[i].hide();
		}
		rows.close();
		dbInventory.close();
		buttonGotIt[i].addEventListener('click', function(e) {
			buttonGotIt[e.source.clickIdGot].hide();
			buttonNotGotIt[e.source.clickIdGot].hide();
			if (isAndroid) {
				var dbInventory = Ti.Database.open('pinpoint');
			} else {
				var dbInventory = Ti.Database.open('pinpoint.sql');
			}
			var rows = dbInventory.execute('select * from inventory where itemName = ? and shopping_name = ?', availableItems[e.source.clickIdGot].itemName, shopping_name);
			if (rows.getRowCount() != 0) {
				buttonGotIt[e.source.clickIdNotGot].hide();
				buttonNotGotIt[e.source.clickIdNotGot].hide();
			} else {
				if (isAndroid) {
					var dbInvent = Ti.Database.open('pinpoint');
				} else {
					var dbInvent = Ti.Database.open('pinpoint.sql');
				}
				dbInvent.execute('insert into inventory(itemName,itemCategory,itemImage,shopping_name,gotit,quantity) values(?,?,?,?,?,?)', availableItems[e.source.clickIdGot].itemName, availableItems[e.source.clickIdGot].category, availableItems[e.source.clickIdGot].image, availableItems[e.source.clickIdGot].shopping_name, 1, availableItems[e.source.clickIdGot].quantity);
				dbInvent.close();
			}
			dbInventory.close();

			if (isAndroid) {
				var dbInvent = Ti.Database.open('pinpoint');
			} else {
				var dbInvent = Ti.Database.open('pinpoint.sql');
			}
			alert(avail);
			var count = dbInvent.execute('select * from inventory where shopping_name == ?', shopping_name);
			if (count.getRowCount() == avail) {
				alert('All Items Added into list');
			}
			dbInvent.close();

			Ti.App.fireEvent('updateInv');
			Ti.App.fireEvent('updateItemCount');

		});

		buttonNotGotIt[i].addEventListener('click', function(e) {
			buttonGotIt[e.source.clickIdNotGot].hide();
			buttonNotGotIt[e.source.clickIdNotGot].hide();
			if (isAndroid) {
				var dbInventory = Ti.Database.open('pinpoint');
			} else {
				var dbInventory = Ti.Database.open('pinpoint.sql');
			}
		
			var rows = dbInventory.execute('select * from inventory where itemName = ? and shopping_name = ?', availableItems[e.source.clickIdNotGot].itemName, shopping_name);
			if (rows.getRowCount() != 0) {
				buttonGotIt[e.source.clickIdNotGot].hide();
				buttonNotGotIt[e.source.clickIdNotGot].hide();
			} else {
				if (isAndroid) {
					var dbInvent = Ti.Database.open('pinpoint');
				} else {
					var dbInvent = Ti.Database.open('pinpoint.sql');
				}
				dbInvent.execute('insert into inventory(itemName,itemCategory,itemImage,shopping_name,gotit,quantity) values(?,?,?,?,?,?)', availableItems[e.source.clickIdNotGot].itemName, availableItems[e.source.clickIdNotGot].category, availableItems[e.source.clickIdNotGot].image, availableItems[e.source.clickIdNotGot].shopping_name, 0, availableItems[e.source.clickIdNotGot].quantity);
				dbInvent.close();
			}
			dbInventory.close();
			if (isAndroid) {
				var dbInvent = Ti.Database.open('pinpoint');
			} else {
				var dbInvent = Ti.Database.open('pinpoint.sql');
			}
			var count = dbInvent.execute('select * from inventory where shopping_name == ?', shopping_name);
			if (count.getRowCount() == avail) {
				alert('All Items Added into list');
			}
			dbInvent.close();

			Ti.App.fireEvent('updateInv');
			Ti.App.fireEvent('updateItemCount');

		});

		var viewCarousel = Ti.UI.createView();

		viewCarousel.add(image);
		viewCarousel.add(buttonGotIt[i]);
		viewCarousel.add(buttonNotGotIt[i]);
		viewCarousel.add(itemLabel);

		views.push(viewCarousel);

	}

	if (isAndroid) {

		var Done = Ti.UI.createImageView({
			bottom : 30,
			image : '/images/done.png',
			width : '100%'
		});

		Done.addEventListener('click', function(e) {
			doneList();
		});

		var scrollableView = Ti.UI.createScrollableView({
			views : views,
			top : '30dp',
			right : 0,
			height : '70%',
			bottom : 0,
			left : 0,
			showPagingControl : true
		});

		win.add(Done);
	} else {
		var scrollableView = Ti.UI.createScrollableView({
			views : views,
			top : 0,
			right : 0,
			bottom : 0,
			left : 0,
			showPagingControl : true
		});
	}

	win.add(scrollableView);

	// Sliding Drawer
	var options = {
		barHeight : 30,
		barColor : '#8888ff'
	};

	var viewContent = Ti.UI.createTableViewRow({
		layout : 'vertical',
		height : 'auto',
		borderColor : '#555'
	});

	// Content to be displayed inside sliding drawer

	var scrollContent = Ti.UI.createTableView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		height : 500,
		layout : 'vertical',
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true,
		backgroundImage : '/images/background.jpg',
		opacity : 0.85,
		scrollable : true
	});

	var doneee = Ti.UI.createImageView({
		image : '/images/done.png',
		width : '100%'
	});
	if (!isAndroid) {
		var allDone = Ti.UI.createImageView({
			top : 110,
			image : '/images/done.png',
			width : '100%'
		});

		var quantGot = Ti.UI.createLabel({
			top : 0,
			left : 0,
			text : '19 /20  Items Got',
			font : {
				fontSize : 15
			},
			color : 'gray'
		});

	} else {
		var quantGot = Ti.UI.createLabel({
			top : '0dp',
			left : 0,
			text : '19 /20  Items Got',
			font : {
				fontSize : 15
			},
			color : 'gray'
		});

	}

	Ti.App.addEventListener('updateItemCount', function(e) {
		var countNotGot = 0;
		var countGot = 0;
		if (isAndroid) {
			var dbInvent = Ti.Database.open('pinpoint');
		} else {
			var dbInvent = Ti.Database.open('pinpoint.sql');
		}
		var rows = dbInvent.execute('select * from inventory where shopping_name = ?', shopping_name);

		while (rows.isValidRow()) {
			if (rows.fieldByName('gotit') == 0) {
				countNotGot++;
			} else {
				countGot++;
			}

			rows.next();
		}
		rows.close();
		dbInvent.close();
		avail = 0;
		var items_available = Ti.App.Properties.getList('AvailableIt');

		for ( i = 0; i < items_available.length; i++) {
			if (items_available[i].store_id == store_selected) {
				avail++;
			}
		}

		quantGot.text = countNotGot + '/' + avail + ' Items' + ' not found in the Store';

	});

	Ti.App.fireEvent('updateItemCount');

	var shopping_name = Ti.App.Properties.getString('name');
	var allDoneView = require('ui/doneShopping').doneShopping;

	// Delete the Shopping list , create a new One with gotit = 0
	if (!isAndroid) {
		allDone.addEventListener('click', function(e) {
			doneList();
		});
	}

	function doneList() {
		//count for alertbox
		var countOfNotGotItems = 0;
		if (isAndroid) {
			var dbInvent = Ti.Database.open('pinpoint');
		} else {
			var dbInvent = Ti.Database.open('pinpoint.sql');
		}
		var rows = dbInvent.execute('select * from inventory where shopping_name = ?', shopping_name);

		while (rows.isValidRow()) {
			if (rows.fieldByName('gotit') == 0) {
				countOfNotGotItems++;
			}

			rows.next();
		}
		rows.close();
		dbInvent.close();

		var alertBox = Titanium.UI.createAlertDialog({
			title : 'All done with your shopping?',
			message : 'We\'ll move your ' + countOfNotGotItems + ' unavailable item to a new list so you remember to shop it for later.',
			buttonNames : ['Cancel', 'All done!'],
			cancel : 0
		});

		alertBox.addEventListener('click', function(e) {
			switch(e.index) {
				case 1 :
					if (isAndroid) {
						var db = Ti.Database.open('pinpoint');
					} else {
						var db = Ti.Database.open('pinpoint.sql');
					}
					db.execute('delete from shoppingList where shopping_name = ?', shopping_name);
					db.close();
					if (Ti.Platform.osname == 'android') {
						var toast = Titanium.UI.createNotification({
							duration : Ti.UI.NOTIFICATION_DURATION_LONG,
							message : 'Deleted Successfully',
							backgroundColor : 'black'
						});
						toast.show();
					}
					//Step 3

					var nameNewList = 'NGot:' + shopping_name;
					var today = new Date();

					var dd = today.getDate();

					var mm = today.getMonth() + 1;

					var yyyy = today.getFullYear();

					if (dd < 10) {
						dd = '0' + dd
					}

					if (mm < 10) {
						mm = '0' + mm
					}

					today = mm + '/' + dd + '/' + yyyy;
					Ti.App.fireEvent('updateTable');

					// Step 2
					var newList = [];
					// Navigationt to Last Window
					if (isAndroid) {
						var dbInvent = Ti.Database.open('pinpoint');
					} else {
						var dbInvent = Ti.Database.open('pinpoint.sql');
					}
					var rows = dbInvent.execute('select * from inventory where shopping_name = ?', shopping_name);
					var i = 1;
					var shopping = '';
					if (countOfNotGotItems != 0) {
						dbInvent.execute('insert into shoppingList(shopping_name,no_of_items,time) values(?,?,?)', nameNewList, 0, today);
						while (rows.isValidRow()) {
							if (rows.fieldByName('gotit') == 0) {
								newList.push({
									name : rows.fieldByName('itemName'),
									category : rows.fieldByName('itemCategory'),
									image : rows.fieldByName('itemImage'),
									shopping_name : rows.fieldByName('shopping_name'),
									quantity : rows.fieldByName('quantity')
								});

								dbInvent.execute('insert into itemsList(item_name,item_category,item_image,quantity,shopping_name) values (?,?,?,?,?)', rows.fieldByName('itemName'), rows.fieldByName('itemCategory'), rows.fieldByName('itemImage'), rows.fieldByName('quantity'), nameNewList)
							} else if (rows.fieldByName('gotit') == 1) {
								shopping = shopping + "......" + '\n' + i + '> ' + rows.fieldByName('itemName');
								i++;
							}
							rows.next();
						}

						rows.close();
					}
					dbInvent.close();
					if (isAndroid) {
						var dbInvent = Ti.Database.open('pinpoint');
					} else {
						var dbInvent = Ti.Database.open('pinpoint.sql');
					}
					var rows = dbInvent.execute('select * from itemsList where shopping_name = ?', shopping_name);
					while (rows.isValidRow()) {
						rows.next();
					}
					rows.close();
					dbInvent.close();
					// Navigate

					navController.open(new allDoneView(navController));
					break;

				case 0 :
					if (isAndroid) {

						var toast = Titanium.UI.createNotification({
							duration : Ti.UI.NOTIFICATION_DURATION_LONG,
							message : 'Not Deleted',
							backgrouncvdColor : 'black'
						});

						toast.show();

					}
					break;
			}
		});
		alertBox.show();
	}

	var inventoryItemTableView = require('modules/SlidingDrawerTableView');
	var availableInventoryItemsList = new inventoryItemTableView('Availabilty List', store_selected);

	if (!isAndroid)
		scrollContent.add(allDone);
	scrollContent.add(quantGot);
	scrollContent.add(availableInventoryItemsList);

	if (isAndroid) {
		var handles = require('ui/SlidingDrawer').createSlidingDrawer({
			position : 'bottom',
			contentView : scrollContent
			//viewContent
		});
	} else {
		var handles = require('ui/SlidingDrawer').createSlidingDrawer({
			position : 'top',
			contentView : scrollContent
			//viewContent
		});
	}

	win.add(handles[2]);
	win.add(handles[0]);
	win.add(handles[1]);
	return win;
};
