/**
 * @author Mohammed Shahid
 */
var cCategoriesRow = function(_title, allData, _shopping) {

	var self = Ti.UI.createTableViewRow({
		layout : 'absolute',
		width : '60dp',
		selectionStyle : Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundImage : '/images/category_row.png'
	});

	// Title Label name of the Item
	var titleItem = Ti.UI.createLabel({
		top : '10dp',
		left : '20dp',
		height : '30dp',
		width : '280dp',
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},

		text : _title.toUpperCase(),
		color : 'Black'
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

	addItem.addEventListener('click', function(e) {

		if (addItem.image == '/images/add_item_normal.png') {
			var itemData = [];
			addItem.image = '/images/add_item_pressed.png';
			var categoryItem = _title;
			for (var i = 0, j = 0; i < allData.length; i++) {
				if (allData[i].category == categoryItem) {
					var string = allData[i].itemName;
					var image = allData[i].thumbnailImage;
					var id = allData[i].id;
					itemData.push({
						title : string,
						image : image
					});
					if (isAndroid) {
						var dbCat = Ti.Database.open('pinpoint');
					} else {
						var dbCat = Ti.Database.open('pinpoint.sql');
					}

					dbCat.execute('insert into itemsList(item_id,item_name,item_category,item_image,quantity,shopping_name) values(?,?,?,?,?,?)', id, itemData[j].title, categoryItem, image, 1, _shopping);
					dbCat.close();
					j++;
				}

			}
		} else {
			var itemCat = [];
			addItem.image = '/images/add_item_normal.png';
			var categoryItem = _title;
			for (var i = 0, j = 0; i < allData.length; i++) {
				if (allData[i].category == categoryItem) {
					var string = allData[i].itemName;
					var image = allData[i].thumbnailImage;
					var id = allData[i].id;
					itemCat.push({
						title : string,
						image : image,
					});
					if (isAndroid) {
						var dbCat = Ti.Database.open('pinpoint');
					} else {
						var dbCat = Ti.Database.open('pinpoint.sql');
					}
					dbCat.execute('delete from itemsList where item_name = ? and shopping_name = ?', itemCat[j].title, _shopping);
					dbCat.close();
					j++;
				}
			}
		}
	});

	self.add(titleItem);
	self.add(addItem);

	return self;
}
module.exports = cCategoriesRow;
