/**
 * @author Rajeev N B
 * @param {Object} navController
 */
exports.AddShoppingScreen = function(navController) {

	if (isAndroid) {
		var db = Ti.Database.open('pinpoint');
	} else {
		var db = Ti.Database.open('pinpoint.sql');
	}

	var SearchForProducts = require('ui/SearchForProducts').SearchForProducts;

	var addShoppingWindow = Ti.UI.createWindow({
		backgroundImage : '/images/background.jpg',
		layout : 'vertical',
		barColor : '#12100D',
		barImage : '/images/header.png',
	});

	if (isAndroid) {
		addShoppingWindow.navBarHidden = true;
	}

	if (isAndroid) {
		var imageHeader = Ti.UI.createView({
			top : '0dp',
			height : '55dp',
			width : '100%',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var homeBackButton = Ti.UI.createButton({
			height : '33dp',
			width : '58dp',
			top : 20,
			left : 25,
			backgroundImage : '/images/cancel_normal.png',
			backgroundSelectedImage : '/images/cancel_pressed.png'
		});

		homeBackButton.addEventListener('click', function(e) {
			navController.home();
		});

		imageHeader.add(homeBackButton);

		addShoppingWindow.add(imageHeader);
	}
	var namelist = Ti.UI.createImageView({
		image : '/images/name_your_list.png',
		top : 80,
		height : '5%',
		width : '80%',
	});

	var editText = Ti.UI.createTextField({
		top : 10,
		height : '40dp',
		width : '80%',
		backgroundImage : '/images/text_box.png',
		color : '#DF581D'
	});

	editText.addEventListener('change', function(e) {
		if (editText.value.length > 15) {
			alert('Max Limit Exceeded , Slow Down!!');
			editText.enabled = false;
		}
	});
	
	addShoppingWindow.addEventListener('focus', function(event, type) {
		// Issue in Android 'focus'
		editText.focus();
	});

	// Create a Button.
	var createButton = Ti.UI.createButton({
		title : 'Create',
		height : '40dp',
		width : '80dp',
		top : 10,
		right : 30,
		color : '#DF581D'
	});

	// Listen for click events.
	createButton.addEventListener('click', function() {

		if (editText.value.length == 0) {
			alert('Enter some name');
		} else {
			Ti.App.Properties.setString('name', editText.value);

			// Getting todays date
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
			if (Ti.Platform.osname == 'android') {
				var db = Ti.Database.open('pinpoint');
				isAndroid = true;
			} else {
				var db = Ti.Database.open('pinpoint.sql');
			}

			if (Ti.Platform.osname == 'android') {
				var d = Ti.Database.open('pinpoint');

			} else {
				var d = Ti.Database.open('pinpoint.sql');
			}
			var rows = d.execute('select * from shoppingList where shopping_name = ?', editText.value);
			if (rows.getRowCount() == 0) {
				db.execute('insert into shoppingList(shopping_name,time,no_of_items) values(?,?,?)', editText.value, today, 0);
				d.close();
				rows.close();
				db.close();
				var shopping = editText.value;
				Ti.App.fireEvent('updateTable');
				Ti.App.Properties.setString('shop', shopping);
				navController.open(new SearchForProducts(navController));
			} else {
				alert('Shopping Name already Exists');
			}
		}
	});

	// Add to the parent view.
	var addShoppingCancelButton = Ti.UI.createButton({
		height : '30dp',
		width : '60dp',
		top : 0,
		left : 20,
		backgroundImage : '/images/cancel_normal.png',
		backgroundSelectedImage : '/images/cancel_pressed.png'
	});

	// Listen for click events.
	addShoppingCancelButton.addEventListener('click', function() {
		navController.home();
	});

	addShoppingWindow.leftNavButton = addShoppingCancelButton;

	addShoppingWindow.add(namelist);
	addShoppingWindow.add(editText);
	addShoppingWindow.add(createButton);

	return addShoppingWindow;
}