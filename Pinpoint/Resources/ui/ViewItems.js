exports.ViewItems = function(navController) {
	
	if (isAndroid) {
		var dbList = Ti.Database.open('pinpoint');
	} else {
		var dbList = Ti.Database.open('pinpoint.sql');
	}

	var SearchForProducts = require('ui/SearchForProducts').SearchForProducts;

	// Shopping Name
	var list_name;
	list_name = Ti.App.Properties.getString('name');

	var viewItemsWindow = Ti.UI.createWindow({
		title : list_name,
		layout : 'vertical',
		backButtonTitle : 'All Lists',
		barImage : '/images/header_nologo.png',
		backgroundImage : '/images/background.jpg',
		backButtonTitleImage : 'transparent'
	});

	if (isAndroid) {
		viewItemsWindow.navBarHidden = true;
	}

	viewItemsWindow.addEventListener('android:back', function(e) {
		Ti.App.fireEvent('updateTable');
		navController.home();
	});

	// Android Specific Stuff starts here
	var headerView = Ti.UI.createView({
		top : 0,
		width : '100%',
		height : '60dp',
		layout : 'absolute',
		backgroundImage : '/images/header_nologo.png'
	});

	var nameShoppingList = Ti.UI.createLabel({
		top : 20,
		left : 180,
		color : 'white',
		font : {
			fontWeight : 'bold',
			fontSize : 23
		},
		text : list_name
	});

	var allLists = Ti.UI.createButton({
		height : '30dp',
		width : '60dp',
		top : 15,
		left : 10,
		backgroundImage : '/images/all_lists_normal.png',
		backgroundSelectedImage : '/images/all_lists_pressed.png'
	});

	allLists.addEventListener('click', function() {
		Ti.App.fireEvent('updateTable');
		navController.home();
	});

	var cancelButton = Ti.UI.createButton({
		backgroundImage : '/images/x1.png',
		backgroundSelectedImage : '/images/x_pressed.png',
		height : 35,
		width : 35,
		top : 15,
		right : 10
	});

	cancelButton.addEventListener('click', function(e) {
		var alertBox = Titanium.UI.createAlertDialog({
			title : 'Delete Shopping List',
			message : 'Deleting this will delete the entire cart?' + '"' + list_name + '"',
			buttonNames : ['Yes,Delete', 'Cancel'],
			cancel : 1
		});

		alertBox.addEventListener('click', function(e) {
			switch(e.index) {
				case 0 :
					var dbList = Ti.Database.open('pinpoint');
					dbList.execute('delete from shoppingList where shopping_name = ?', list_name);
					dbList.execute('delete from itemsList where shopping_name = ?', list_name);
					dbList.execute('delete from inventory where shopping_name = ?', list_name);
					dbList.close();
					var toast = Titanium.UI.createNotification({
						duration : Ti.UI.NOTIFICATION_DURATION_LONG,
						message : 'Deleted Successfully',
						backgroundColor : 'black'
					});
					toast.show();

					Ti.App.fireEvent('updateTable', {
						name : list_name
					});
					navController.home();
					break;

				case 1 :
					var toast = Titanium.UI.createNotification({
						duration : Ti.UI.NOTIFICATION_DURATION_LONG,
						message : 'Not Deleted',
						backgrouncvdColor : 'black'
					});

					toast.show();
					break;

			}

		});

		alertBox.show();

	});

	headerView.add(cancelButton);
	headerView.add(allLists);
	headerView.add(nameShoppingList);

	// Ends Here Android Specific

	var xButton = Ti.UI.createButton({
		backgroundImage : '/images/x1.png',
		backgroundSelectedImage : '/images/x_pressed.png',
		height : 25,
		width : 25
	});

	xButton.addEventListener('click', function(e) {
		var alertBox = Titanium.UI.createAlertDialog({
			title : 'Delete Shopping List',
			message : 'Deleting this will delete the entire cart?' + '"' + list_name + '"',
			buttonNames : ['Yes,Delete', 'Cancel'],
			cancel : 1
		});

		alertBox.addEventListener('click', function(e) {
			switch(e.index) {
				case 0 :
					var dbList = Ti.Database.open('pinpoint.sql');
					dbList.execute('delete from shoppingList where shopping_name = ?', list_name);
					dbList.execute('delete from itemsList where shopping_name = ?', list_name);
					dbList.execute('delete from inventory where shopping_name = ?', list_name);
					dbList.close();
					if (Ti.Platform.osname == 'android') {
						var toast = Titanium.UI.createNotification({
							duration : Ti.UI.NOTIFICATION_DURATION_LONG,
							message : 'Deleted Successfully',
							backgroundColor : 'black'
						});
						toast.show();
					}

					Ti.App.fireEvent('updateTable', {
						name : list_name
					});
					navController.home();
					break;

				case 1 :
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

	});

	var addMoreProducts = Ti.UI.createImageView({
		top : '-4dp',
		height : '60dp',
		width : '100%',
		image : '/images/add_products_normal.png',
		backgroundSelectedImage : '/images/add_products_pressed.png'
	});

	addMoreProducts.addEventListener('click', function(e) {

		Ti.App.Properties.setString('shop', list_name);
		navController.open(new SearchForProducts(navController));
	});

	var findNearByStore = Ti.UI.createImageView({
		top : '-16dp',
		height : '60dp',
		width : '100%',
		image : '/images/find_store_normal.png',
		backgroundSelectedImage : '/images/find_store_selected.png'
	});

	var allListsBackButton = Ti.UI.createButton({
		height : '30dp',
		width : '60dp',
		top : 0,
		left : 20,
		backgroundImage : '/images/all_lists_normal.png',
		backgroundSelectedImage : '/images/all_lists_pressed.png'
	});

	// Listen for click events.
	allListsBackButton.addEventListener('click', function() {
		Ti.App.fireEvent('updateTable');
		navController.home();
	});

	viewItemsWindow.leftNavButton = allListsBackButton;

	var selectStore = require('ui/SelectStore').SelectStore;

	// Listen for click events.
	findNearByStore.addEventListener('click', function() {
		Stopped = false;
		if (isAndroid) {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		var count = dbList.execute('select item_name from itemsList where shopping_name = ?', list_name);
		if (count.getRowCount() != 0){
			navController.open(new selectStore(navController));
			isClick = false;
		}else
			alert('Add Some items to Search');
		dbList.close();
	});

	viewItemsWindow.addEventListener('focus', function(e) {
		findNearByStore.touchEnabled = true;
		addMoreProducts.touchEnabled = true;
	});

	if (isAndroid) {
		// Todo
		viewItemsWindow.add(headerView);

	} else {
		viewItemsWindow.rightNavButton = xButton;
	}

	viewItemsWindow.add(addMoreProducts);
	viewItemsWindow.add(findNearByStore);

	var noOfItemsLabel = Ti.UI.createLabel({
		top : 0,
		height : 35,
		textAlign : 'left',
		left : 20

	});
	var data = [];
	var dataCategory = [];

	if (Ti.Platform.osname == 'android') {
		var dbList = Ti.Database.open('pinpoint');
	} else {
		var dbList = Ti.Database.open('pinpoint.sql');
	}

	var count = dbList.execute('select item_name from itemsList where shopping_name = ?', list_name);

	noOfItemsLabel.text = 'Your List Contains ' + count.getRowCount() + ' items';
	viewItemsWindow.add(noOfItemsLabel);
	dbList.close();

	Ti.App.addEventListener('updateListLabel', function(e) {
		if (isAndroid) {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		var count = dbList.execute('select quantity from itemsList where shopping_name = ?', list_name);
		noOfItemsLabel.text = 'Your List Contains ' + count.getRowCount() + ' items';
		dbList.close();
	});

	if (isAndroid) {
		var dbList = Ti.Database.open('pinpoint');
	} else {
		var dbList = Ti.Database.open('pinpoint.sql');
	}
	var rowItems = dbList.execute('select distinct item_category from itemsList where shopping_name = ?', list_name);

	while (rowItems.isValidRow()) {
		dataCategory.push(rowItems.fieldByName('item_category'));
		rowItems.next();
	}
	rowItems.close();
	dbList.close();
	var pureData = [];

	for (var i = 0; i < dataCategory.length; i++) {

		data.push({
			header : dataCategory[i]
		});
		if(isAndroid) {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		var items = dbList.execute('select * from itemsList where shopping_name = ? and item_category = ?', list_name, dataCategory[i]);

		while (items.isValidRow()) {
			data.push({
				title : items.fieldByName('item_name'),
				image : items.fieldByName('item_image'),
				quantity : items.fieldByName('quantity')
			});
			pureData.push({
				title : items.fieldByName('item_name'),
				image : items.fieldByName('item_image'),
				quantity : items.fieldByName('quantity')
			});

			items.next();
		}
		items.close();
		dbList.close();
	}

	var viewItemTableView = require('modules/ViewItemTableView');
	var itemsList = new viewItemTableView(data, 'Items List', true, pureData, true);
	viewItemsWindow.add(itemsList);
	//Picker List

	if (isAndroid) {
		var pickerList = Ti.UI.createPicker({
			bottom : -260,
			height : '100dp',
			width : Ti.UI.FILL
		});
	} else {
		var pickerList = Ti.UI.createPicker({
			bottom : '0dp',
			height : '30dp',
			width : Ti.UI.FILL
		});
	}

	var pickerView = Ti.UI.createView({
		bottom : -260
	});

	var barForPicker = Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.9
	});

	var cancel = Ti.UI.createButton({
		title : 'Cancel',
		left : '10dp',
		top : '5dp',
		height : '35dp',
		backgroundColor : 'black'
	});

	cancel.addEventListener('click', function(e) {
		pickerView.hide();
	});

	var done = Ti.UI.createButton({
		title : 'Done',
		right : '10dp',
		top : '5dp',
		height : '35dp',
		backgroundColor : 'black'
	});

	barForPicker.add(cancel);
	barForPicker.add(done);
	pickerList.selectionIndicator = true;
	var listName;

	Ti.App.addEventListener('pickerShow', function(e) {

		var picker = [];
		if (pickerList.columns[0]) {
			var _col = pickerList.columns[0];
			var len = _col.rowCount;
			for (var x = len - 1; x >= 0; x--) {
				var _row = _col.rows[x];
				_col.removeRow(_row);
			}
		}

		if (Ti.Platform.osname == 'android') {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		var i = 0, shopIndex;

		var rows = dbList.execute('select shopping_name from shoppingList');
		while (rows.isValidRow()) {
			if (list_name == rows.fieldByName('shopping_name')) {
				shopIndex = i;
			}

			picker[i] = Ti.UI.createPickerRow({
				title : rows.fieldByName('shopping_name')
			});
			rows.next();
			i++;
		}
		rows.close();
		dbList.close();

		pickerList.setSelectedRow(0, shopIndex, true);
		pickerList.add(picker);
		pickerView.add(barForPicker);
		pickerView.add(pickerList);
		pickerView.show();
		viewItemsWindow.add(pickerView);
		viewItemsWindow.add(pickerView);
	});

	pickerList.addEventListener('change', function(e) {
		// Get the Selected Shopping list Name
		listName = pickerList.getSelectedRow(0).title;

	});

	done.addEventListener('click', function(e) {
		if (listName == list_name) {
			alert('Moving to Same List not Allowed !! Bummer');
		} else {
			isClicked = false;
			Ti.App.fireEvent('moveList', {
				name : listName,
				clicked : isClicked
			});

			Ti.App.fireEvent('updateListLabel');
			pickerView.hide();
		}
	});
	
	return viewItemsWindow;
}