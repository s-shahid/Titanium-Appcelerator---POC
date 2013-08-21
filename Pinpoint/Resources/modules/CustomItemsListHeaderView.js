/**
 * @author Rajeev N B
 * @param {Object} _title
 * @param {Object} _deleteItemPresent
 */
var cHeader = function(_title, _deleteItemPresent,_isSlider) {
	var headerView = Ti.UI.createView({
		top : 0,
		layout : 'absolute',
		height : '60dp',
		backgroundImage : '/images/table_section.png'
	});

	// Name of the Header in View Items Controller
	var itemNameLabel = Ti.UI.createLabel({
		text : _title,
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},
		top : 15,
		left : 20

	});

	// Cancel Button for the Header to delete the category
	var imageHeaderDelete = Ti.UI.createImageView({
		top : 15,
		right : 20,
		width : '40dp',
		image : '/images/shopping_x_normal.png',
		backgroundSelectedImage : '/images/shopping_x_selected.png'
	});

	imageHeaderDelete.addEventListener('click', function(e1) {
		var alertBox = Titanium.UI.createAlertDialog({
			title : 'Delete Category' + '"' + _title + '"',
			message : 'Deleting this item will remove the Entire List?' + '"' + _title + '"',
			buttonNames : ['Delete', 'Cancel'],
			cancel : 1
		});

		alertBox.addEventListener('click', function(e) {
			switch(e.index) {
				case 0 :
					if (Ti.Platform.osname == 'android') {
						var dbList = Ti.Database.open('pinpoint');
					} else {
						var dbList = Ti.Database.open('pinpoint.sql');
					}
					dbList.execute('delete from itemsList where item_category= ?', _title);
					if(!isAndroid)
					dbList.execute('delete from inventory where itemCategory = ?', _title);
					dbList.close();
					if (Ti.Platform.osname == 'android') {
						var toast = Titanium.UI.createNotification({
							duration : Ti.UI.NOTIFICATION_DURATION_LONG,
							message : 'Deleted Successfully',
							backgroundColor : 'black'
						});
						toast.show();
					}
					Ti.App.fireEvent('deleteHeader', {

					});

					break;

				case 1 :
					if (isAndroid) {

						var toast = Titanium.UI.createNotification({
							duration : Ti.UI.NOTIFICATION_DURATION_LONG,
							message : 'Not Deleted',
							backgrouncvdColor : 'black'
						});

						toast.show();

					}
					break;
			}
		});
		alertBox.show();
	});
	
	headerView.add(itemNameLabel);
	if(!_isSlider)
	headerView.add(imageHeaderDelete);

	return headerView;
}
module.exports = cHeader;
