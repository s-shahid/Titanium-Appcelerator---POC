var InventoryTableView = function(_title,store_selected) {

	var shopping_name = Ti.App.Properties.getString('name');
	if (isAndroid) {
		var dbInventory = Ti.Database.open('pinpoint');
	} else {
		var dbInventory = Ti.Database.open('pinpoint.sql');
	}

	if (isAndroid) {
		var tableView = Ti.UI.createTableView({
			objName : 'table',
			backgroundColor : 'transparent',
			top : '50dp',
			style : Ti.UI.iPhone.TableViewStyle.PLAIN,
			clickName : 'table'
		});
	} else {
		var tableView = Ti.UI.createTableView({
			objName : 'table',
			backgroundColor : 'transparent',
			top : 0,
			style : Ti.UI.iPhone.TableViewStyle.PLAIN,
			clickName : 'table'
		});
	}

	var cHeader = require('modules/CustomItemsListHeaderView');
	var flags = [];

	Ti.App.addEventListener('updateInv', function(e) {
		var uniqueCatogories = 'nothing';
		var tableData = [];
		var _data = [];
		var rows = dbInventory.execute('select * from inventory where shopping_name = ? ORDER BY itemCategory', shopping_name);
		while (rows.isValidRow()) {

			if (uniqueCatogories != rows.fieldByName('itemCategory')) {
				_data.push({
					header : rows.fieldByName('itemCategory')
				});
				uniqueCatogories = rows.fieldByName('itemCategory');
			}

			_data.push({
				title : rows.fieldByName('itemName'),
				image : rows.fieldByName('itemImage'),
				shopping_name : rows.fieldByName('shopping_name'),
				gotit : rows.fieldByName('gotit'),
				quantity : rows.fieldByName('quantity')
			});
			rows.next();
		}
		rows.close();

		for (var i = 0; i < _data.length; i++) {

			if (_data[i].header != null) {
				var section1 = Ti.UI.createTableViewSection();
				section1.headerView = new cHeader(_data[i].header, false,true);
				tableData.push(section1);
			} else {
				var cRow = require('modules/CustomSlidingDrawerRow');
				var itemRow = new cRow(_data[i].title, _data[i].image, _data[i].gotit, _data[i].quantity);
				itemRow.height = '70dp';
				itemRow.clickName = 'row';
				tableData.push(itemRow);
			}
		}

		tableView.setData(tableData);
	});

	Ti.App.fireEvent('updateInv');

	tableView.addEventListener('click', function(e) {
		if (e.source.clickName == 'row') {
			var row = e.row;
		}
	});

	var self = Ti.UI.createView({

	});

	self.add(tableView);
	return self;

};

module.exports = InventoryTableView;
