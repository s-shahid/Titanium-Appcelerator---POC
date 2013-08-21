// Module to modify the Items in the view Items Controller

var view = function(quant, title) {

	var list_name = Ti.App.Properties.getString('name');
	var quantityChange = Ti.UI.createTableViewRow({
		top : '65dp',
		width : Ti.UI.FILL,
		backgroundImage : '/images/modify_item_background.png',
		selectionStyle : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	var label = Ti.UI.createLabel({
		text : 'Quantity',
		top : '10dp',
		left : '20dp',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : 'orange'
	});

	var subQuant = Ti.UI.createImageView({
		top : '10dp',
		right : '120dp',
		height : '20dp',
		backgroundColor : 'transparent',
		image : '/images/quantity_less_normal.png',
		width : '40dp'

	});

	subQuant.addEventListener('click', function(e) {
		if (quant > 1) {
			quant--;
			textLabel.text = quant;
			if (Ti.Platform.osname == 'android') {
				var dbList = Ti.Database.open('pinpoint');
			} else {
				var dbList = Ti.Database.open('pinpoint.sql');
			}
			dbList.execute('update itemsList SET quantity = ? where item_name = ? and shopping_name = ?', quant, title, list_name);
			dbList.close();
		}
	});
	
	var addQuant = Ti.UI.createImageView({
		top : '10dp',
		right : '30dp',
		height : '20dp',
		backgroundColor : 'transparent',
		image : '/images/quantity_more_normal.png',
		width : '40dp'
	});
	
	if(isAndroid){
	addQuant.width = '20dp';
	subQuant.width = '20dp';
	}

	addQuant.addEventListener('click', function(e) {
		if (isAndroid) {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		quant++;
		textLabel.text = quant;
		dbList.execute('update itemsList SET quantity = ? where item_name = ? and shopping_name = ?', quant, title, list_name);
		dbList.close();
	});

	var textLabel = Ti.UI.createLabel({
		text : quant,
		top : '10dp',
		height : '30dp',
		width : '40dp',
		right : '75dp',
		backgroundImage : '/images/quantity_box.png',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	if(isAndroid)
	textLabel.right = '65dp';

	var labelMove = Ti.UI.createLabel({
		text : 'Move to List',
		top : '60dp',
		left : '20dp',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : 'orange'
	});
	var shopIndex;
	if (isAndroid) {
		var picker = [];
		var movetolist = Ti.UI.createPicker({
			top : '55dp',
		});

		if (isAndroid) {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		var i = 0;
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

		movetolist.add(picker);

		var listName;
		var isClicked;
		movetolist.setSelectedRow(0, shopIndex, true);

		movetolist.addEventListener('change', function(e) {
			// Get the Selected Shopping list Name

			listName = movetolist.getSelectedRow(0).title;
			isClicked = false;

			Ti.App.fireEvent('moveList', {
				name : listName,
				clicked : isClicked
			});
			Ti.App.fireEvent('updateListLabel');
		});

	} else {

		var movetolist = Ti.UI.createImageView({
			top : '55dp',
			clickName : 'picker',
			image : '/images/drop_down.png'
		});

		movetolist.addEventListener('click', function(e) {
			if (e.source.clickName == 'picker') {
				Ti.App.fireEvent('pickerShow');

			}
		});
	}

	if (isAndroid) {
		movetolist.right = '5dp';
		movetolist.width = '120dp';
		movetolist.height = '40dp';
		movetolist.image = '/images/drop_down_android-1.png'
		quantityChange.height = '100dp';
	} else {
		movetolist.right = '15dp';
		quantityChange.height = '100dp';
	}

	quantityChange.add(label);
	quantityChange.add(addQuant);
	quantityChange.add(subQuant);
	quantityChange.add(textLabel);
	quantityChange.add(labelMove);
	quantityChange.add(movetolist);

	return quantityChange;
};

module.exports = view;
