var cSearchRow = function(_id, _title, _subtitle, _thumbnail, _category, _shopping) {

	if (isAndroid) {
		var dbItem = Ti.Database.open('pinpoint');
	} else {
		var dbItem = Ti.Database.open('pinpoint.sql');
	}

	// Custom table View row for the View List Controller
	var self = Ti.UI.createTableViewRow({
		layout : 'absolute',
		width : '60dp',
		selectionStyle : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE

	});

	//Image of the Item in the row
	var imageItems = Ti.UI.createImageView({
		top : '10dp',
		left : '10dp',
		width : '60dp',
		backgroundColor : 'transparent',
		height : '60dp',
		image : _thumbnail
	});

	// Title Label name of the Item
	var titleItem = Ti.UI.createLabel({
		top : '10dp',
		left : '80dp',
		height : '40dp',
		width : '190dp',
		font : {
			fontSize : 15,
			fontWeight : 'bold'
		},
		text : _title,
		color : '#D75404'
	});

	// Label for the Quantity of the Item
	var quantityItem = Ti.UI.createLabel({
		top : '50dp',
		left : '80dp',
		text : _subtitle,
		font : {
			fontSize : 13
		}
	});

	// Adding Item Image
	var addItem = Ti.UI.createImageView({
		top : '10dp',
		right : '5dp',
		height : '40dp',
		width : '40dp',
		clickName : 'add',
		image : '/images/add_item_normal.png'
	});

	var isAdded = false;
	addItem.addEventListener('click', function(e) {

		if (isAndroid) {
			var dbItem = Ti.Database.open('pinpoint');
		} else {
			var dbItem = Ti.Database.open('pinpoint.sql');
		}
		// Bug in Titanium for Android
		if (addItem.image == '/images/add_item_normal.png') {

			// Inserting into Database
			if (Ti.Platform.osname == 'android') {
				var db = Ti.Database.open('pinpoint');
			} else {
				var db = Ti.Database.open('pinpoint.sql');
			}
			var data = db.execute('select * from itemsList where item_name = ? and shopping_name = ?', _title, _shopping);
			if (data.getRowCount() > 0) {
				alert('Already added');
			} else {
				isAdded = true;
				addItem.image = '/images/add_item_pressed.png';
				dbItem.execute('insert into itemsList(item_id,item_name,item_category,item_image,quantity,shopping_name) values(?,?,?,?,?,?)', _id, _title, _category, _thumbnail, 1, _shopping);
			}
			dbItem.close();
			db.close();
		} else if (isAdded == true) {
			if (Ti.Platform.osname == 'android') {
				var dbItem = Ti.Database.open('pinpoint');
			} else {
				var dbItem = Ti.Database.open('pinpoint.sql');
			}
			addItem.image = '/images/add_item_normal.png';
			// Deletion from Database
			dbItem.execute('delete from itemsList where item_id = ?', _id);
			dbItem.close();
			isAdded = false;
		}
	});

	// Add the Views to the Parent Table View Layout
	self.add(imageItems);
	self.add(titleItem);
	self.add(quantityItem);
	self.add(addItem);

	return self;
};

module.exports = cSearchRow;
