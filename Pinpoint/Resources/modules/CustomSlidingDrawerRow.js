var cSlidingRow = function(_title, _image, _flag, _quantity) {

	// Custom table View row for the View List Controller
	var self = Ti.UI.createTableViewRow({
		layout : 'absolute',
		width : '60dp',
		selectionStyle : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	if (isAndroid) {
		var titleItem = Ti.UI.createLabel({
			top : 10,
			left : 120,
			width : '220dp',
			height : '40dp',
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			},
			text : _title,
			color : 'orange'
		});

		var quantityItem = Ti.UI.createLabel({
			top : 60,
			left : 120,
			text : 'QTY : 1',
			font : {
				fontSize : 12
			},
			color : '#75706D'
		});
	} else {
		var titleItem = Ti.UI.createLabel({
			top : 10,
			left : 80,
			width : '220dp',
			height : '40dp',
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			},
			text : _title,
			color : 'orange'
		});

		var quantityItem = Ti.UI.createLabel({
			top : 50,
			left : 80,
			text : 'QTY : 1',
			font : {
				fontSize : 12
			},
			color : '#75706D'
		});
	}
	// Image of the Item in the row
	var imageItems = Ti.UI.createImageView({
		top : 15,
		left : 20,
		width : '50dp',
		height : '50dp',
		image : _image
	});

	// Title Label name of the Item

	quantityItem.text = 'QTY' + ': ' + _quantity;

	var got = Ti.UI.createImageView({
		image : '/images/checked.png',
		top : 30,
		right : 20,
		width : '20dp',
	});

	var notgot = Ti.UI.createImageView({
		image : '/images/cant_get_it_sad_face.png',
		top : 30,
		right : 20,
		width : '20dp',
	});

	self.add(quantityItem);
	self.add(imageItems);
	self.add(titleItem);
	if (_flag == 1) {
		self.add(got);
	} else if (_flag == 0) {
		self.add(notgot);
	}

	return self;
};

module.exports = cSlidingRow;
