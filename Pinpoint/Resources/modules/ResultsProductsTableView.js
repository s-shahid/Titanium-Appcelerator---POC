var ResultsProductsTableView = function(_data, _title, shopping_name,searchField) {

	var cRow = require('modules/CustomSearchProductsRow');
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
		itemName : 'nothing'
	});

	Ti.App.fireEvent('update', {
		data : itemNames
	});

	Ti.App.addEventListener('scrollToTop', function(e) {
		tableView.scrollToTop(0);
	});
	var lastRow = 10;

	Ti.App.addEventListener('update', function(e) {
		var tableData = [];
		var _data = [];
		_data = e.data;
		lastRow = _data.length;
		if (e.data.length > 0) {

			if (e.data[0].itemName != 'nothing') {
				_data = e.data;
			}
			if (Ti.Platform.osname == 'android') {
				lastRow = _data.length;
			}
			for (var i = 0; i < lastRow; i++) {
				var splittedData = _data[i].itemName.split("-");
				var tableRow = new cRow(_data[i].id, splittedData[0], splittedData[1], _data[i].thumbnailImage, _data[i].category, shopping_name);
				tableRow.height = '75dp';
				tableData.push(tableRow);
			}

		}
		tableView.setData(tableData);
	});

	var updating = false;
	// var loadingRow = Ti.UI.createTableViewRow({
		// title : "...Load more..."
	// });

	tableView.addEventListener('click', function(e) {

	});
	var lastDistance = 0;
// else {
// 
		// tableView.addEventListener('scroll', function(e) {
			// var offset = e.contentOffset.y;
			// var height = e.size.height;
			// var total = offset + height;
			// var theEnd = e.contentSize.height;
			// var distance = theEnd - total;
// 
			// // going down is the only time we dynamically load,
			// // going up we can safely ignore -- note here that
			// // the values will be negative so we do the opposite
			// if (distance < lastDistance) {
				// // adjust the % of rows scrolled before we decide to start fetching
				// var nearEnd = theEnd * .75;
// 
				// if (!updating && (total >= nearEnd)) {
					// beginUpdate();
				// }
			// }
			// lastDistance = distance;
		// });
	// }
// 
	// // calculate location to determine direction
// 
	// function beginUpdate() {
		// updating = true;
		// tableView.appendRow(loadingRow);
// 
		// // just mock out the reload
		// setTimeout(endUpdate, 2000);
	// }
// 
	// function endUpdate() {
		// updating = false;
// 
		// tableView.deleteRow(lastRow, {
			// animationStyle : Titanium.UI.iPhone.RowAnimationStyle.NONE
		// });
// 
		// // simulate loading
		// for (var c = lastRow; c < lastRow + 10; c++) {
			// var splittedData = _data[c].itemName.split("-");
			// var tableRow = new cRow(_data[c].id, splittedData[0], splittedData[1], _data[c].thumbnailImage, _data[c].category, shopping_name);
			// tableRow.height = '75dp';
			// //tableData.push(tableRow);
			// tableView.appendRow(tableRow, {
				// animationStyle : Titanium.UI.iPhone.RowAnimationStyle.NONE
			// });
		// }
		// if(lastRow >= 10)
		// lastRow += 10;
// 
		// // just scroll down a bit to the new rows to bring them into view
		// tableView.scrollToIndex(lastRow - 9, {
			// animated : true,
			// position : Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
		// });
	// }

	var self = Ti.UI.createView({
	});

	self.add(tableView);
	return self;
};

module.exports = ResultsProductsTableView;
