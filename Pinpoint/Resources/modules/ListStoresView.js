
var listRow = function(_title,_distance,_itemsCount) {
	var self = Ti.UI.createTableViewRow({
		layout : 'absolute',
		selectionStyle : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	var itemsDetailView = Ti.UI.createView({
		backgroundImage : '/images/percentage_background_light.png',
		height : '70dp',
		layout : 'absolute',
		width : '100dp',
		top : '5dp',
		left : '25dp'
	});

	var splittedData =((_itemsCount/Ti.App.Properties.getInt('TotalItemsCount'))*100).toFixed(0)+'%';
	Ti.App.Properties.setString('percentage',splittedData);
	Ti.App.Properties.setString('AvailableItems',_itemsCount);
	
	var percentage = Ti.UI.createLabel({
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		text : splittedData,
		color : '#DF581D',
		top : '10dp',
		left : '25'
	});

	var items = Ti.UI.createLabel({
		font : {
			fontSize : 13,
		},
		text :_itemsCount+'/'+Ti.App.Properties.getInt('TotalItemsCount')+' ITEMS',
		top : '35dp',
		left : '15dp',
		color:'gray'
	});

	itemsDetailView.add(percentage);
	itemsDetailView.add(items);

	var storeName = Ti.UI.createLabel({
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},
		text : _title,
		top : '20dp',
		left : '140dp',
		height:'20dp',
		width:'170dp',
		color:'#DF581D'
	});

	var storeDistance = Ti.UI.createLabel({
		font : {
			fontSize : 16,
			fontWeight : 'bold'
		},
		text : _distance+'les away',
		color:'gray',
		top : '45dp',
		left : '140dp',
		color:'#9E9C9A'
	});

	self.add(itemsDetailView);
	self.add(storeName);
	self.add(storeDistance);

	return self;
};

module.exports = listRow;
