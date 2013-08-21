var listStore = function(data, navController) {

	var storenameForList = Ti.App.Properties.getList('storesInformation');

	console.log(JSON.stringify(storenameForList));

	var listStores = Ti.UI.createView({
		layout : 'vertical',
		backgroundImage : '/images/background.jpg'
	});
	var StoreInfo = require('ui/StoreInfo').StoreInfo;

	var listTableView = Ti.UI.createTableView({
		clickName : 'table',
		backgroundColor : 'transparent'
	});

	var itemNames = [];
	itemNames.push({
		title : 'nothing'
	});

	Ti.App.fireEvent('updateListStoresView', {
		title : itemNames
	});

	var count = [];
	for (var i = 0; i < data.length; i++) {
		count.push(0);
	}

	var listRow = require('modules/ListStoresView');
	Ti.App.addEventListener('updateListStoresView', function(e) {

		data = Ti.App.Properties.getList('storesInformation');

		tableData = [];
		for (var i = 0; i < data.length; i++) {

			if (Ti.App.Properties.getList('AvailableItemsCount') != null)
				count = Ti.App.Properties.getList('AvailableItemsCount');
			var tableRow = new listRow(data[i].title, data[i].distance, count[i]);
			tableData.push(tableRow);
			tableRow.height = '100dp';

			if (i % 5 == 0) {
				tableRow.backgroundImage = '/images/location_edge1.png';
			} else if (i % 5 == 1) {
				tableRow.backgroundImage = '/images/location_edge2.png';
			} else if (i % 5 == 2) {
				tableRow.backgroundImage = '/images/location_edge3.png';
			} else if (i % 5 == 3) {
				tableRow.backgroundImage = '/images/location_edge4.png';
			} else if (i % 5 == 4) {
				tableRow.backgroundImage = '/images/location_edge5.png';
			}
		}

		listTableView.setData(tableData);
	});

	listTableView.addEventListener('click', function(e) {
		//if (isClick) {
		//Ti.App.fireEvent('Stop');
		Ti.App.Properties.setDouble('latitude', storenameForList[e.index].lat);
		Ti.App.Properties.setDouble('longitude', storenameForList[e.index].lon);
		var storeaddress = Ti.App.Properties.getList('addresses');
		var storeIds = Ti.App.Properties.getList('StoreIDS');
		//Ti.App.Properties.setString('StoreId', storeIds[e.index]);
		Ti.App.Properties.setString('store_name', data[e.index].title);
		Ti.App.Properties.setString('store_distance', data[e.index].distance);
		Ti.App.Properties.setString('percentage', ((count[e.index] / Ti.App.Properties.getInt('TotalItemsCount')) * 100).toFixed(0) + '%');
		Ti.App.Properties.setString('AvailableItems', count[e.index]);
		Ti.App.Properties.setString('address', storeaddress[e.index]);
		store_selected = storeIds[e.index];
		Ti.App.fireEvent('removeMap');
		navController.open(new StoreInfo(navController, store_selected));
		isClick = false;
		//}
	});

	listStores.add(listTableView);
	return listStores;
}

module.exports = listStore;
