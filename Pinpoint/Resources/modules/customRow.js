var cRow = function(_title, _subtitle, _time) {

	if (isAndroid) {
		var db = Ti.Database.open('pinpoint');
	} else {
		var db = Ti.Database.open('pinpoint.sql');
	}

	var count = db.execute('select item_name from itemsList where shopping_name = ?', _title);

	var self = Ti.UI.createTableViewRow({
		layout : 'absolute',
		width : '60dp',
		selectionStyle : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	var title = Ti.UI.createLabel({
		font : {
			fontSize : '22dp',
			fontWeight : 'bold'
		},
		color : 'orange',
		top : '4dp',
		left : '25dp',
		width : 'auto',
		text : _title
	});

	// var share = Ti.UI.createImageView({
		// top : '8dp',
		// image : '/images/share_facebook.png',
		// right : '35dp'
	// });
// 
	// share.removeEventListener('click', function(e) {
// 
	// });
// 	
	// share.addEventListener('click', function(e) {
		// if (Titanium.Facebook.loggedIn) {
			// send_facebook_stream();
		// } else {
			// Titanium.Facebook.authorize();
// 
			// Titanium.Facebook.addEventListener('login', function(e) {
				// Titanium.API.info('FACEBOOK LOGIN DATA' + e.data);
				// send_facebook_stream();
			// })
		// }
	// });
// 
	// var dataShare = [];
	// if (Ti.Platform.osname == 'android') {
		// var dbList = Ti.Database.open('pinpoint');
	// } else {
		// var dbList = Ti.Database.open('pinpoint.sql');
	// }
	// var items = dbList.execute('select * from itemsList where shopping_name = ? ', _title);
	// var shopping = '';
	// var i = 1;
	// while (items.isValidRow()) {
		// shopping = shopping + i + ') ' + items.fieldByName('item_name');
		// items.next();
		// i++;
	// }
	// items.close();
	// dbList.close();
// 
	// Titanium.Facebook.appid = "458502127527506";
// 
	// // set the request permissions
	// Titanium.Facebook.permissions = ['publish_stream'];
// 
	// /**
	 // * GENERATE THE FACEBOOK SHARE DIALOG
	 // * SEND THE FACEBOOK STREAM TO FACEBOOK
	 // */
	// function send_facebook_stream() {
		// var facebook_dialog;
		// // CREATE THE FACEBOOK MESSAGE
		// var data = {
			// name : "My Shopping List : " + " " + _title,
// 
			// // set the link if necessary
			// link : "http://www.socialshoppingnetwork.org/wp-content/uploads/2012/10/social-shopping-network1.png",
// 
			// caption : "Social Shopping",
// 
			// // now you add your text
			// description : shopping
// 
		// };
		// if (!facebook_dialog) {
			// facebook_dialog = Titanium.Facebook.dialog("feed", data, showRequestResult);
		// }
// 
		// /**
		 // * HANDLE THE REQUEST RESULT FROM FACEBOOK
		 // */
		// function showRequestResult(r) {
			// //alert(r)
// 
			// if (r.result) {
				// facebook_response = Ti.UI.createAlertDialog({
					// title : 'Facebook Shared!',
					// message : 'Your stream was published'
				// });
			// } else {
				// facebook_response = Ti.UI.createAlertDialog({
					// title : 'Facebook Stream was cancelled',
					// message : 'Nothing was published.'
				// });
// 
			// }
			// facebook_response.show();
			// var fb_resp_timeout = setTimeout(function() {
				// facebook_response.hide();
			// }, 2000);
		// }
// 
	// }


	title.addEventListener('click', function(e) {
		Ti.App.fireEvent('nav', {
			title : _title
		});
	});

	var subtitle = Ti.UI.createLabel({
		font : {
			fontSize : '12dp',
			fontWeight : 'bold'
		},

		color : 'black',
		top : '35dp',
		left : '25dp',
		width : 'auto'
	});

	subtitle.text = count.getRowCount() + ' ITEMS';

	var updatedTime = Ti.UI.createLabel({
		font : {
			fontSize : '12dp',
		},

		top : '35dp',
		left : '115dp',
		width : 'auto'
	});

	updatedTime.text = 'UPDATED' + '  ' + _time;
	var imageRightDelete = Ti.UI.createImageView({
		width : '40dp',
		top : '32dp',
		image : '/images/curl.png',
		backgroundSelectedImage : '/images/curl_pressed.png',
		clickName : 'image',
		right : -2
	});

	// Delete Shopping List Items

	imageRightDelete.addEventListener('click', function(e) {

		if (e.source.clickName == 'image') {
			var alertBox = Titanium.UI.createAlertDialog({

				title : 'Delete Shopping List',
				message : 'Deleting this will delete the entire cart ' + '"' + _title + '"',
				buttonNames : ['Yes,Delete', 'Cancel'],
				cancel : 1

			});

			alertBox.addEventListener('click', function(e) {

				switch(e.index) {

					case 0 :

						if (isAndroid) {
							var db = Ti.Database.open('pinpoint');
						} else {
							var db = Ti.Database.open('pinpoint.sql');
						}
						db.execute('delete from shoppingList where shopping_name = ?', _title);
						db.execute('delete from itemsList where shopping_name = ?', _title);
						db.execute('delete from inventory where shopping_name = ?', _title);
						db.close();

						if (isAndroid) {

							var toast = Titanium.UI.createNotification({
								duration : Ti.UI.NOTIFICATION_DURATION_LONG,
								message : 'Deleted Successfully',
								backgroundColor : 'black'
							});
							toast.show();
						}

						Ti.App.fireEvent('updateTable', {
							name : _title
						});
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

		}

	});

	self.add(updatedTime);

	self.add(title);

	// self.add(share);

	self.add(subtitle);

	self.add(imageRightDelete);
	count.close();
	db.close();
	return self;

};

module.exports = cRow;
