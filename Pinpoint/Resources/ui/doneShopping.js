/**
 * @author Mohammed Shahid
 */
exports.doneShopping = function(navController) {
	
	var AddShoppingScreen = require('ui/AddShoppingScreen').AddShoppingScreen;
	var doneShoppingWindow = Ti.UI.createWindow({
		backgroundImage : '/images/background.jpg',
		title : 'All Done',
		barImage : '/images/header_nologo.png'
	});

	if (isAndroid) {
		doneShoppingWindow.navBarHidden = true;

		var headerView = Ti.UI.createView({
			top : 0,
			width : '100%',
			height : '60dp',
			layout : 'absolute',
			backgroundImage : '/images/header_nologo.png'
		});

		var all = Ti.UI.createLabel({
			top : 20,
			left : 200,
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 23
			},
			text : 'All Done'
		});

		headerView.add(all);
		doneShoppingWindow.add(headerView);
	}

	var emptyView = Titanium.UI.createView({});
	doneShoppingWindow.leftNavButton = emptyView

	var urDoneimage = Ti.UI.createImageView({
		image : '/images/success.png',
		top : '100dp',
		width : '100%',
		height : '15%'
	});

	var createNewList = Ti.UI.createImageView({
		top : '73%',
		image : '/images/another_list.png'
	});

	if (isAndroid) {
		var createNewList = Ti.UI.createImageView({
			bottom : '55dp',
			image : '/images/another_list.png',
			width : '100%'
		});
	}

	createNewList.addEventListener('click', function(e) {
		Ti.App.fireEvent('updateTable');
		navController.open(new AddShoppingScreen(navController));

	});

	var returnBackToHomeImage = Ti.UI.createImageView({
		top : '85%',
		image : '/images/dashboard.png',
	});

	if (isAndroid) {
		var returnBackToHomeImage = Ti.UI.createImageView({
			bottom : '0dp',
			image : '/images/dashboard.png',
			width : '100%'
		});
	}

	returnBackToHomeImage.addEventListener('click', function(e) {
		Ti.App.fireEvent('updateTable');
		navController.home();
	});

	doneShoppingWindow.add(urDoneimage);
	doneShoppingWindow.add(createNewList);
	doneShoppingWindow.add(returnBackToHomeImage);

	return doneShoppingWindow;

}
