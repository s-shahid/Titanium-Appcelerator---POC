/**
 * @author Mohammed Shahid
 */
var CategoriesTableView = function(_data, _title, _shopping,searchField) {
	var cRow = require('modules/CategoriesTableViewRow');
	if (isAndroid) {
		var dbCat = Ti.Database.open('pinpoint');
	} else {
		var dbCat = Ti.Database.open('pinpoint.sql');
	}

	var allData = [];
	var tableView = Ti.UI.createTableView({
		objName : 'table',
		backgroundColor : 'transparent',
		top : 0,
		backgroundImage : '/images/background.jpg'
	});
	
	tableView.addEventListener('scroll',function(e){
		searchField.blur();
	});

	var itemNames = [];
	itemNames.push({
		category : 'nothing'
	});

	Ti.App.fireEvent('updateCategories', {
		data : itemNames
	});
	var tableRow  = [];

	Ti.App.addEventListener('updateCategories', function(e) {
		var tableData = [];

		if (e.data.length > 0) {
			if (e.data[0].category != null) {
				_data = e.data;
			}

			allData = e.catData;

			for (var i = 0; i < _data.length; i++) {
				tableRow = new cRow(_data[i].category,allData,_shopping);
				tableRow.height = '65dp';

				tableData.push(tableRow);
			}
		}

		tableView.setData(tableData);
	});

	// Has our Awesome Data
	var itemData = [];
	tableView.addEventListener('click', function(e1) {
	});

	var self = Ti.UI.createView({
	});

	self.add(tableView);
	return self;
};

module.exports = CategoriesTableView;
