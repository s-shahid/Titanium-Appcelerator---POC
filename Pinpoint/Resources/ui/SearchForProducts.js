exports.SearchForProducts = function(navController) {

	// Variable name to determine the Shopping Name

	var shopping_name;
	var ResultsProductsTableView = require('modules/ResultsProductsTableView');
	var ResultsCategoriesTableView = require('modules/CategoriesTableView');

	if (Ti.App.Properties.getString('shop') != null) {
		shopping_name = Ti.App.Properties.getString('shop');
	} else {
		shopping_name = Ti.App.Properties.getString('name');
	}
	var productList;
	var categoryList;
	var isCategoryHidden = true;
	//calling XML Parsing Function
	var results = require('modules/ProdutsResultsXML');
	var ViewItems = require('ui/ViewItems').ViewItems;

	if (isAndroid) {
		var searchWindow = Ti.UI.createWindow({
			title : shopping_name,
			backgroundImage : '/images/orange_background.png',
			layout : 'absolute'
		});

		searchWindow.navBarHidden = true;

		var imageHeaderAndroid = Ti.UI.createView({
			top : 0,
			height : '60dp',
			width : '100%',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var HintText = Ti.UI.createLabel({

			text : 'Search For Products...',
			touchEnabled : false,
			height : 100,
			top : 270,
			left : 17,
			width : 330,
			color : 'green',
			visible : true,
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		var nameShoppingList = Ti.UI.createLabel({
			top : 20,
			left : 180,
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 23
			},
			text : shopping_name
		});

		var findSomeStuff = Ti.UI.createImageView({
			image : '/images/gotta_find.png',
			top : 140,
			height : '50%',
			width : '70%'
		});

		var noSearchView = Ti.UI.createView({
			top : 50,
			height : '40%',
			width : '80%'
		});
		noSearchView.add(findSomeStuff);
		
		var searchCancel = Titanium.UI.createButton({
			right : 10,
			height : 20,
			width : 20,
			backgroundImage : '/images/search_x_normal.png',
			backgroundSelectedImage : '/images/search_x_pressed.png'
		});

		var searchField = Titanium.UI.createTextField({
			color : '#fff',
			top : 100,
			left : 35,
			width : '85%',
			height : '40dp',
			rightButton : searchCancel,
			hintText : HintText.text,
			backgroundImage : '/images/search_box.png',
		});

		searchCancel.addEventListener('click', function() {
			searchField.value = "";
			Ti.App.fireEvent('callChange');
		});

		var xButton = Ti.UI.createButton({
			backgroundImage : '/images/x1.png',
			backgroundSelectedImage : '/images/x_pressed.png',
			height : 35,
			width : 35,
			top : 20,
			right : 15
		});

		xButton.addEventListener('click', function(e) {

			var alertBox = Titanium.UI.createAlertDialog({
				title : 'Delete Shopping List',
				message : 'Deleting this will delete the entire cart?' + '"' + shopping_name + '"',
				buttonNames : ['Yes,Delete', 'Cancel'],
				cancel : 1
			});

			alertBox.addEventListener('click', function(e) {
				switch(e.index) {
					case 0 :
						if (Ti.Platform.osname == 'android') {
							var db = Ti.Database.open('pinpoint');
						} else {
							var db = Ti.Database.open('pinpoint.sql');
						}
						db.execute('delete from shoppingList where shopping_name = ?', shopping_name);
						db.execute('delete from itemsList where shopping_name = ?', shopping_name);
						db.execute('delete from inventory where shopping_name = ?', shopping_name);
						db.close();

						if (Ti.Platform.osname == 'android') {
							var toast = Titanium.UI.createNotification({
								duration : Ti.UI.NOTIFICATION_DURATION_LONG,
								message : 'Deleted Successfully',
								backgroundColor : 'black'
							});
							toast.show();
						}

						Ti.App.fireEvent('updateTable', {
							name : shopping_name
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

		var noOfResultsFoundLabel = Ti.UI.createLabel({
			font : {
				fontFamily : 'Georgia-Italic',
				fontSize : 16
			},
			top : 100,
			color : 'White'
		});

		var searchBackButton = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 15,
			left : 20,
			backgroundImage : '/images/view_list.png',
			touchEnabled : true,
			backgroundSelectedImage : '/images/view_list_pressed.png'
		});

		searchBackButton.addEventListener('click', function(e) {
			searchBackButton.enabled = false;
			Ti.App.Properties.setString('name', shopping_name);
			navController.open(new ViewItems(navController));
		});

		var productsButton = Ti.UI.createButton({
			title : 'PRODUCTS',
			height : '30dp',
			width : '130dp',
			top : 120,
			left : 35,
			backgroundImage : '/images/products_tab_normal.png',
			color : 'black',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		productsButton.addEventListener('click', function() {
			isCategoryHidden = true;
			noOfResultsFoundLabel.text = productsCount;
			categoryList.hide();
			productList.show();
			productsButton.color = 'Black'
			categoriesButton.color = 'White'
			productsButton.backgroundImage = '/images/products_tab_selected.png'
			categoriesButton.backgroundImage = '/images/products_tab_normal.png'
		});

		var categoriesButton = Ti.UI.createButton({
			title : 'CATEGORIES',
			height : '30dp',
			width : '130dp',
			top : 120,
			left : 227,
			backgroundImage : '/images/products_tab_normal.png',
			color : 'white',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		categoriesButton.addEventListener('click', function() {
			isCategoryHidden = false;
			noOfResultsFoundLabel.text = categoriesCount;
			productList.hide();
			categoryList.show();
			categoriesButton.color = 'Black'
			productsButton.color = 'White'
			categoriesButton.backgroundImage = '/images/products_tab_selected.png'
			productsButton.backgroundImage = '/images/products_tab_normal.png'
		});

		var resultsView = Ti.UI.createView({
			top : '60dp',
			height : '25%',
			width : '100%'
		});
		resultsView.add(noOfResultsFoundLabel);
		resultsView.add(productsButton);
		resultsView.add(categoriesButton);
		resultsView.hide();

		var tableViewsForSegments = Ti.UI.createView({
			top : 255,
			height : '80%',
			width : '100%'

		});

		searchField.addEventListener('change', function(e) {
			callChange();
			Ti.App.fireEvent('scrollToTop');
		});

		searchWindow.addEventListener('android:back', function(e) {
			Ti.App.Properties.setString('name', shopping_name);
			navController.open(new ViewItems(navController));
		});

		searchWindow.addEventListener('focus', function(e) {
			searchBackButton.enabled = true;
		});

		searchWindow.add(tableViewsForSegments);
		searchWindow.add(noSearchView);
		searchWindow.add(imageHeaderAndroid);
		searchWindow.add(searchBackButton);
		searchWindow.add(xButton);
		searchWindow.add(nameShoppingList);
		searchWindow.add(resultsView);
		searchWindow.add(noOfResultsFoundLabel);
		searchWindow.add(searchField);

	} else {

		var searchWindow = Ti.UI.createWindow({
			backgroundImage : '/images/orange_background.png',
			barColor : '#444',
			barImage : '/images/header_nologo.png',
			title : shopping_name,
			backButtonTitle : 'View Lists',
			backButtonTitleImage : 'transparent'

		});

		var noOfResultsFoundLabel = Ti.UI.createLabel({
			font : {
				fontFamily : 'Georgia-Italic'
			},
			top : 0,
			height : '25dp',
			color : 'White',
			left : 40

		});

		// Create a Back Button For Navigation.
		var searchBackButton = Ti.UI.createButton({
			height : '30dp',
			width : '60dp',
			top : 0,
			left : 20,
			backgroundImage : '/images/view_list.png',
			backgroundSelectedImage : '/images/view_list_pressed.png'
		});

		searchWindow.leftNavButton = searchBackButton;

		// Listen for click events.
		searchBackButton.addEventListener('click', function() {
			Ti.App.Properties.setString('name', shopping_name);
			searchBackButton.touchEnabled = false;
			navController.open(new ViewItems(navController));
		});

		var HintText = Ti.UI.createLabel({

			text : 'Search For Products...',
			touchEnabled : false,
			height : 100,
			top : 260,
			left : 20,
			width : 330,
			color : 'green',
			visible : true,
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		//Created a button for X in textField
		var searchCancel = Titanium.UI.createButton({
			left : 5,
			right : 10,
			height : 20,
			width : 20,
			backgroundImage : '/images/search_x_normal.png',
			backgroundSelectedImage : '/images/search_x_pressed.png'
		});

		searchCancel.addEventListener('click', function() {
			searchField.value = "";
			Ti.App.fireEvent('cancel');
			Ti.App.fireEvent('callChange');
		});

		var dummyView = Ti.UI.createView({
			height : 20,
			width : 20
		});
		var searchField = Titanium.UI.createTextField({
			color : '#fff',
			top : 10,
			left : 20,
			width : '90%',
			height : '8%',
			leftButton : dummyView,
			hintText : HintText.text,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
			backgroundImage : '/images/search_box.png',
			leftButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
			rightButton : searchCancel,
			rightButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});

		searchField.clearButtonMode = Titanium.UI.INPUT_BUTTONMODE_ALWAYS;
		Ti.App.addEventListener('callChange', function(e) {
			callChange();
		});
		searchField.addEventListener('change', function(e) {
			callChange();
			// Scroll to Top on Change
			Ti.App.fireEvent('scrollToTop');
		});

		var xButton = Ti.UI.createButton({
			backgroundImage : '/images/x1.png',
			backgroundSelectedImage : '/images/x_pressed.png',
			height : 25,
			width : 25
		});

		xButton.addEventListener('click', function(e) {

			var alertBox = Titanium.UI.createAlertDialog({
				title : 'Delete Shopping List',
				message : 'Sure?',
				buttonNames : ['Yes', 'No'],
				cancel : 1
			});

			alertBox.addEventListener('click', function(e) {
				switch(e.index) {
					case 0 :
						var db = Ti.Database.open('pinpoint.sql');
						db.execute('delete from shoppingList where shopping_name = ?', shopping_name);
						db.execute('delete from itemsList where shopping_name = ?', shopping_name);
						db.execute('delete from inventory where shopping_name = ?', shopping_name);
						db.close();
						Ti.App.fireEvent('updateTable', {
							name : shopping_name
						});
						navController.home();
						break;

					case 1 :
						break;
				}
			});
			alertBox.show();
		});

		var findSomeStuff = Ti.UI.createImageView({
			image : '/images/gotta_find.png',
			top : 0,
			height : '100%',
			width : '100%'
		});
		if (isAndroid) {
			searchWindow.add(imageHeaderAndroid);
		} else {
			searchWindow.rightNavButton = xButton;

		}

		var noSearchView = Ti.UI.createView({
			top : 50,
			height : '50%',
			width : '80%'
		});
		noSearchView.add(findSomeStuff);

		searchWindow.add(searchField);

		searchWindow.add(noSearchView);

		var productsButton = Ti.UI.createButton({
			title : 'PRODUCTS',
			height : '30dp',
			width : '145dp',
			top : 30,
			left : 20,
			backgroundImage : '/images/products_tab_normal.png',
			color : 'white',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			},
			color : 'Black'
		});

		productsButton.addEventListener('click', function() {
			isCategoryHidden = true;
			noOfResultsFoundLabel.text = productsCount;
			categoryList.hide();
			productList.show();
			productsButton.color = 'Black'
			categoriesButton.color = 'White'
			productsButton.backgroundImage = '/images/products_tab_selected.png'
			categoriesButton.backgroundImage = '/images/categories_tab_normal.png'
		});

		var categoriesButton = Ti.UI.createButton({
			title : 'CATEGORIES',
			height : '30dp',
			width : '145dp',
			top : 30,
			left : 160,
			backgroundImage : '/images/categories_tab_normal.png',
			color : 'white',
			font : {
				fontSize : 15,
				fontFamily : 'TrebuchetMS-Bold'
			}
		});

		categoriesButton.addEventListener('click', function() {

			isCategoryHidden = false;
			noOfResultsFoundLabel.text = categoriesCount;
			productList.hide();
			categoryList.show();
			categoriesButton.color = 'Black'
			productsButton.color = 'White'
			categoriesButton.backgroundImage = '/images/categories_tab_selected.png'
			productsButton.backgroundImage = '/images/products_tab_normal.png'
		});

		var resultsView = Ti.UI.createView({
			top : 50,
			height : '80%',
			width : '100%'
		});
		resultsView.add(noOfResultsFoundLabel);
		resultsView.add(productsButton);
		resultsView.add(categoriesButton);
		resultsView.hide();

		searchWindow.add(resultsView);

		//Created A view Which Holds Two TableViews of Segments

		var tableViewsForSegments = Ti.UI.createView({
			top : 105,
			height : '80%',
			width : '100%'

		});

	}

	// Function to Fetch Unique Categories
	var unique = function(origArr) {
		var newArr = [], origLen = origArr.length, found, x = 0, y = 0;
		for ( x = 0; x < origLen; x++) {
			found = undefined;

			for ( y = 0; y < newArr.length; y++) {

				if (origArr[x].category === newArr[y].category) {
					found = true;
					break;
				}
			}
			if (!found)
				newArr.push(origArr[x]);
		}
		return newArr;
	};

	var productsCount, categoriesCount;

	var isFirst = true;

	function callChange() {
		if (searchField.value.length > 2) {
			var resultsTable = new results(searchField.value, function(returnedData) {
				productsCount = returnedData.length + ' matching items found.';
				productsButton.title = 'PRODUCTS ' + '(' + returnedData.length + ')';
				noOfResultsFoundLabel.text = productsCount;
				var categories = [];

				for ( i = 0; i < returnedData.length; i++) {
					categories.push({
						category : returnedData[i].category
					});

				}
				var uniqueCategories = unique(categories);
				categoriesCount = uniqueCategories.length + ' matching items found.';
				categoriesButton.title = 'CATEGORIES ' + '(' + uniqueCategories.length + ')';
				if (isFirst) {
					productList = new ResultsProductsTableView(returnedData, 'Products List', shopping_name,searchField);
					categoryList = new ResultsCategoriesTableView(uniqueCategories, 'Categories List', shopping_name,searchField);
					isFirst = false;
				} else {
					Ti.App.fireEvent('update', {
						data : returnedData
					});
					Ti.App.fireEvent('updateCategories', {
						data : uniqueCategories,
						catData : returnedData
					});

				}

				tableViewsForSegments.add(productList);
				tableViewsForSegments.add(categoryList);

				if (isCategoryHidden) {
					categoryList.hide();
					noOfResultsFoundLabel.text = productsCount;
				} else {
					productsButton.backgroundImage = '/images/products_tab_normal.png', noOfResultsFoundLabel.text = categoriesCount;
				}
				searchWindow.add(tableViewsForSegments);
			});
			tableViewsForSegments.show();
			resultsView.show();
			noSearchView.hide();
			productsButton.backgroundImage = '/images/products_tab_selected.png';
		} else {
			Ti.App.fireEvent('cancel');
			tableViewsForSegments.hide();
			noSearchView.show();
			resultsView.hide();
		}

	}


	searchWindow.addEventListener("open", function(event, type) {
		searchField.focus();
	});

	return searchWindow;

}