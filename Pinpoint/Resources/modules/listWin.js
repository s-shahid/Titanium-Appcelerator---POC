// Module to set the Shopping Lists Tableview with data
var listWin = function(_title, flag, navController) {

	var isFirst = true;
	var ViewList = require('ui/ViewItems').ViewItems;

	var noItemsView = Ti.UI.createImageView({
		image : '/images/arrow_smile_text.png'
	});

	noItemsView.hide();

	if (isAndroid) {
		var dbHandle = Ti.Database.open('pinpoint');
	} else {
		var dbHandle = Ti.Database.open('pinpoint.sql');
	}

	var tableView = Ti.UI.createTableView({
		objName : 'table',
		clickName : 'table',
		backgroundColor : 'transparent'
	});

	var _data = [];

	setTableData();
	var shop_list;

	function setTableData() {
		_data = [];
		var rows = dbHandle.execute('select * from shoppingList');
		while (rows.isValidRow()) {
			_data.push({
				title : rows.fieldByName('shopping_name'),
				id : rows.fieldByName('_id'),
				time : rows.fieldByName('time')
			});
			rows.next();
		}
		if (_data.length == 0) {
			noItemsView.show();
			tableView.hide();
		} else {
			tableView.show();
			noItemsView.hide();
		}
		rows.close();
		var tableData = [];
		for (var i = 0; i < _data.length; i++) {

			var cRow = require('modules/customRow');
			var tableRow = new cRow(_data[i].title, '18 Items', _data[i].time);
			tableRow.clickName = 'row';
			tableRow.height = '65dp';
			if (i % 5 == 0) {
				tableRow.backgroundImage = '/images/edge1.png';
			} else if (i % 5 == 1) {
				tableRow.backgroundImage = '/images/edge2.png';
			} else if (i % 5 == 2) {
				tableRow.backgroundImage = '/images/edge3.png';
			} else if (i % 5 == 3) {
				tableRow.backgroundImage = '/images/edge4.png';
			} else if (i % 5 == 4) {
				tableRow.backgroundImage = '/images/edge5.png';
			}
			tableData.push(tableRow);

		}

		tableView.setData(tableData);

		isFirst = flag;
		var count = 0;

	}

	Ti.App.addEventListener('nav', function(e) {
		shop_list = e.title;
		Ti.App.Properties.setString('name', shop_list);
		navController.open(new ViewList(navController));
	});

	tableView.addEventListener('click', function(e) {

		if (e.source.clickName == 'row') {
			shop_list = _data[e.index].title;
			Ti.App.Properties.setString('name', shop_list);
			navController.open(new ViewList(navController));
		}
	});


	Ti.App.addEventListener('updateTable', function(e) {
		setTableData();
	});

	var self = Ti.UI.createView({

	});

	self.add(noItemsView);
	self.add(tableView);

	return self;

};

module.exports = listWin;
