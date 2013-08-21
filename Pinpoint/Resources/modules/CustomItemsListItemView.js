// @Author Rajeev N Bharshetty
/**
 * Module for View of the Items in View Items Controller
 *
 * @param {Object} _data (Data Object for the Row)
 */

var cRow = function(_title, _image, _deleteItemPresent, id, quantity) {

	var shopping_name = Ti.App.Properties.getString('name');
	// Custom table View row for the View List Controller
	var self = Ti.UI.createTableViewRow({
		layout : 'absolute',
		width : '60dp',
		selectionStyle : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		className : 'ViewItemsList'
	});

	// Image of the Item in the row
	var imageItems = Ti.UI.createImageView({
		top : '15dp',
		left : '20dp',
		width : '50dp',
		height : '50dp',
		image : _image
	});

	// Title Label name of the Item
	var titleItem = Ti.UI.createLabel({
		top : '10dp',
		left : '80dp',
		width : '60%',
		height : '40dp',
		font : {
			fontSize : 15,
			fontWeight : 'bold'
		},
		text : _title,
		color : '#DF581D'
	});

	var quantityItem = Ti.UI.createLabel({
		top : '45dp',
		left : '80dp',
		text : 'QTY : 1',
		font : {
			fontSize : 12
		},
		color : '#75706D'
	});

	quantityItem.text = 'QTY' + ': ' + quantity;

	titleItem.addEventListener('click', function(e) {

		Ti.App.fireEvent('do', {
			index : e.index
		});
	});

	// Deleting Item Image
	var deleteItem = Ti.UI.createImageView({
		top : 30,
		right : 20,
		width : '40dp',
		image : '/images/shopping_x_normal.png',
		backgroundSelectedImage : '/images/shopping_x_selected.png',
		index : id
	});
	
	try{
	deleteItem.addEventListener('click', function(e1) {

		var alertBox = Titanium.UI.createAlertDialog({
			title : 'Delete ' + '"' + _title + '"',
			message : 'Deleting this item will remove it from the list' + '"' + _title + '"',
			buttonNames : ['Delete', 'Cancel'],
			cancel : 1
		});

		alertBox.addEventListener('click', function(e) {
			switch(e.index) {
				case 0 :
					if (isAndroid) {
						var dbList = Ti.Database.open('pinpoint');
					} else {
						var dbList = Ti.Database.open('pinpoint.sql');
					}
					dbList.execute('delete from itemsList where item_name = ? and shopping_name = ?', _title, shopping_name);
					dbList.execute('delete from inventory where itemName = ? and shopping_name = ?', _title, shopping_name);
					dbList.close();
					Ti.App.fireEvent('updateListLabel');
					if (isAndroid) {
						var toast = Titanium.UI.createNotification({
							duration : Ti.UI.NOTIFICATION_DURATION_LONG,
							message : 'Deleted Successfully',
							backgroundColor : 'black'
						});
						toast.show();
					}
					if (isAndroid) {
						Ti.App.fireEvent('deleteRow', {
						});
					} else {
						Ti.App.fireEvent('deleteRow', {
							index : e1.index
						});
					}

					break;

				case 1 :
					if (isAndroid) {

						var toast = Titanium.UI.createNotification({
							duration : Ti.UI.NOTIFICATION_DURATION_LONG,
							message : 'Not Deleted',
							backgroundColor : 'black'
						});

						toast.show();

					}
					break;
			}
		});
		alertBox.show();

	});
	}catch(e){
		alert('Crashed');
	}

	// Add the Views to the Parent Table View Layout

	self.add(imageItems);
	self.add(titleItem);
	self.add(quantityItem);

	//DeleteItem Present or not?
	if (_deleteItemPresent)
		self.add(deleteItem);

	return self;
};

module.exports = cRow;
