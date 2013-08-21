var ViewItemTableView = function(_data, _title, _deleteItemPresent, good_data, isExpanded) {

	var data = [];
	var isClicked = false;
	var list_name;
	list_name = Ti.App.Properties.getString('name');

	var tableView = Ti.UI.createTableView({

		objName : 'table',
		backgroundColor : 'transparent',
		top : 0,
		style : Ti.UI.iPhone.TableViewStyle.PLAIN,
		clickName : 'table'
	});

	var item_to_move;
	tableView.removeEventListener('click', function(e) {
	});

	if (isExpanded) {
		var cleanData = [];
		Ti.App.addEventListener('do', function(e) {
			if (!isAndroid) {
				
				if (isClicked) {
					updatetableView();
					isClicked = false;
				} else {
					data = [];
					var dataCategory = [];

					if (isAndroid) {
						var dbList = Ti.Database.open('pinpoint');
					} else {
						var dbList = Ti.Database.open('pinpoint.sql');
					}
					var rowItems = dbList.execute('select distinct item_category from itemsList where shopping_name = ?', list_name);

					while (rowItems.isValidRow()) {

						dataCategory.push(rowItems.fieldByName('item_category'));
						rowItems.next();
					}
					rowItems.close();
					dbList.close();

					for (var i = 0; i < dataCategory.length; i++) {

						if (isAndroid) {
							var dbList = Ti.Database.open('pinpoint');
						} else {
							var dbList = Ti.Database.open('pinpoint.sql');
						}
						var items = dbList.execute('select * from itemsList where shopping_name = ? and item_category = ?', list_name, dataCategory[i]);

						while (items.isValidRow()) {

							cleanData.push({
								title : items.fieldByName('item_name'),
								image : items.fieldByName('item_image'),
								quantity : items.fieldByName('quantity')
							});
							items.next();
						}
						items.close();
						dbList.close();
					}

					item_to_move = cleanData[e.index].title;
					modifyRow = new modify(cleanData[e.index].quantity, cleanData[e.index].title);
					tableView.insertRowAfter(e.index, modifyRow);
					tableView.scrollToIndex(e.index + 1);
					isClicked = true;

				}
			}
		});
	}

	if (isExpanded) {
		tableView.addEventListener('click', function(e) {
			if (e.source.clickName == 'row') {
				if (isClicked) {
					updatetableView();
					isClicked = false;
				} else {
					index = e.index;
					data = [];
					var dataCategory = [];

					if (isAndroid) {
						var dbList = Ti.Database.open('pinpoint');
					} else {
						var dbList = Ti.Database.open('pinpoint.sql');
					}
					var rowItems = dbList.execute('select distinct item_category from itemsList where shopping_name = ?', list_name);

					while (rowItems.isValidRow()) {

						dataCategory.push(rowItems.fieldByName('item_category'));
						rowItems.next();
					}
					rowItems.close();
					dbList.close();
					var pureData = [];
					for (var i = 0; i < dataCategory.length; i++) {

						if (isAndroid) {
							var dbList = Ti.Database.open('pinpoint');
						} else {
							var dbList = Ti.Database.open('pinpoint.sql');
						}
						var items = dbList.execute('select * from itemsList where shopping_name = ? and item_category = ?', list_name, dataCategory[i]);

						while (items.isValidRow()) {

							pureData.push({
								title : items.fieldByName('item_name'),
								image : items.fieldByName('item_image'),
								quantity : items.fieldByName('quantity')
							});
							items.next();
						}
						items.close();
						dbList.close();
					}

					item_to_move = pureData[e.index].title;
					modifyRow = new modify(pureData[e.index].quantity, pureData[e.index].title);
					tableView.insertRowAfter(e.index, modifyRow);
					tableView.scrollToIndex(e.index + 1);
					isClicked = true;
				}
			}
		});
	}

	var list_name;
	list_name = Ti.App.Properties.getString('name');

	Ti.App.addEventListener('moveList', function(e) {
		isClicked = e.clicked;
		if (isAndroid) {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		dbList.execute('update itemsList SET shopping_name = ? where item_name = ?', e.name, item_to_move);
		dbList.close();

		// Problem
		updatetableView();

	});

	var list_name;
	list_name = Ti.App.Properties.getString('name');
	var tableData = [];
	var cHeader = require('modules/CustomItemsListHeaderView');

	for (var i = 0; i < _data.length; i++) {

		// For Headers
		if (_data[i].header != null) {

			if (isAndroid) {
				var section = Ti.UI.createTableViewSection({
					headerTitle : _data[i].header
					// Bug in Titanium
					//headerView : new cHeader(_data[i].header, _deleteItemPresent)
				});
				tableData.push(section);
			} else {
				var section1 = Ti.UI.createTableViewSection();
				section1.headerView = new cHeader(_data[i].header, _deleteItemPresent,false);
				tableData.push(section1);
			}
		} else {
			// FOr Items
			var cRow = require('modules/CustomItemsListItemView');
			var itemRow = new cRow(_data[i].title, _data[i].image, _deleteItemPresent, i, _data[i].quantity);
			itemRow.height = '70dp';
			itemRow.clickName = 'row';
			tableData.push(itemRow);
		}
	}

	tableView.setData(tableData);

	Ti.App.addEventListener('deleteRow', function(e) {
		if (Ti.Platform.osname == 'android') {
			updatetableView();

		} else {
			tableView.deleteRow(e.index, {
				animationStyle : Titanium.UI.iPhone.RowAnimationStyle.UP
			});
			updatetableView();
		}
	});

	var isClicked = false;
	var modifyRow;
	var modify = require('modules/ModifyList');

	Ti.App.addEventListener('deleteHeader', function(e) {
		Ti.App.fireEvent('updateListLabel');
		updatetableView();

	});

	function updatetableView() {
		try {
		data = [];
		var dataCategory = [];

		if (isAndroid) {
			var dbList = Ti.Database.open('pinpoint');
		} else {
			var dbList = Ti.Database.open('pinpoint.sql');
		}
		
			var rowItems = dbList.execute('select distinct item_category from itemsList where shopping_name = ?', list_name);

			while (rowItems.isValidRow()) {
				dataCategory.push(rowItems.fieldByName('item_category'));
				rowItems.next();
			}
			rowItems.close();
			dbList.close();
			var pureData = [];
			for (var i = 0; i < dataCategory.length; i++) {
				data.push({
					header : dataCategory[i]
				});
				if (Ti.Platform.osname == 'android') {
					var db1 = Ti.Database.open('pinpoint');
				} else {
					var db1 = Ti.Database.open('pinpoint.sql');
				}
				var items = db1.execute('select * from itemsList where shopping_name = ? and item_category = ?', list_name, dataCategory[i]);

				while (items.isValidRow()) {
					data.push({
						title : items.fieldByName('item_name'),
						image : items.fieldByName('item_image')
					});
					pureData.push({
						title : items.fieldByName('item_name'),
						image : items.fieldByName('item_image'),
						quantity : items.fieldByName('quantity')
					});
					items.next();
				}
				items.close();
				db1.close();
			}

			tableData = [];
			var m = 0;
			for (var i = 0; i < data.length; i++) {

				// For Headers
				if (data[i].header != null) {

					if (isAndroid) {
						var section1 = Ti.UI.createTableViewSection({
							headerTitle : data[i].header
							//headerView : new cHeader(data[i].header, _deleteItemPresent)
						});
						tableData.push(section1);

					} else {

						var section1 = Ti.UI.createTableViewSection();
						section1.headerView = new cHeader(data[i].header, true);
						tableData.push(section1);
					}
				} else {
					// For Items

					var cRow = require('modules/CustomItemsListItemView');
					var itemRow = new cRow(data[i].title, data[i].image, true, i, pureData[m].quantity);
					m++;
					itemRow.height = '70dp';
					itemRow.clickName = 'row';
					tableData.push(itemRow);

				}
			}
			tableView.setData(tableData);
		} catch(e) {
			alert('Exception');
		}
	}

	var self = Ti.UI.createView({

	});

	self.add(tableView);

	return self;

};

module.exports = ViewItemTableView;
