exports.HomeWindow = function(navController) {

	if (isAndroid) {
		var dbHandle = Ti.Database.open('pinpoint');
		isAndroid = true;
		mainWindow.navBarHidden = true;
	} else {
		var dbHandle = Ti.Database.open('pinpoint.sql');
	}

	//Create Tables in the Database
	var shoppingList = dbHandle.execute('create table if not exists shoppingList(_id INTEGER PRIMARY KEY,shopping_name TEXT,no_of_items INTEGER,time TEXT)');
	var itemsList = dbHandle.execute('create table if not exists itemsList(_id INTEGER PRIMARY KEY,item_id INTEGER,item_name TEXT,item_category TEXT,item_image TEXT,quantity INTEGER,shopping_name TEXT)');
	var inventory = dbHandle.execute('create table if not exists inventory(_id INTEGER PRIMARY KEY,itemName TEXT,itemCategory TEXT,itemImage TEXT,shopping_name TEXT,gotit INTEGER,quantity INTEGER,store_id TEXT)');

	var AddShoppingScreen = require('ui/AddShoppingScreen').AddShoppingScreen;

	var mainWindow = Titanium.UI.createWindow({
		width : "100%",
		height : '100%',
		backgroundImage : '/images/background.jpg',
		layout : 'vertical',
		barImage : '/images/header.png'
	});

	var actionBarImage = Titanium.UI.createImageView({
		top : 0,
		width : '100%',
		height : 'auto',
		image : '/images/header.png'
	});

	var addShoppingList = Titanium.UI.createImageView({
		width : '100%',
		height : '13%',
		top : '-4dp',
		left : '0dp',
		backgroundImage : '/images/new_list_normal.png',
		backgroundSelectedImage : '/images/new_list_pressed.png'
	});

	addShoppingList.addEventListener('click', function() {
		navController.open(new AddShoppingScreen(navController));
	});

	var listWin = require('modules/listWin');
	var listTable = new listWin('Shopping_List', true, navController);
	if (isAndroid) {
		mainWindow.add(actionBarImage);
	}

	mainWindow.add(addShoppingList);
	mainWindow.add(listTable);

	dbHandle.close();
	mainWindow.exitOnClose = true;

	return mainWindow;
};
