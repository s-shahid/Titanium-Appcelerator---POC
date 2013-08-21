/**
 * @author Mohammed Shahid
 */
//Finds the product is available or not..
//returns true if available else fasle

exports.FindItemsInStores = function(storeID, itemName, itemID, index, item_index, callback) {

	var resultsData = [];
	var xhr = Ti.Network.createHTTPClient();
	var url = ('http://www.supermarketapi.com/api.asmx/SearchForItem?APIKEY=8d0d3a96c3&StoreId=' + storeID + '&ItemName=' + itemName);
	xhr.open("GET", url);
	Ti.App.addEventListener('Stop', function(e) {
		xhr.abort();
	});

	xhr.onload = function() {
		Ti.App.addEventListener('Stop', function(e) {
			xhr.abort();
		});

		try {
			var doc = this.responseXML.documentElement;
			var items = doc.getElementsByTagName("Product");
			var c = 0;
			var item = items.item(c);
			var item_Name = item.getElementsByTagName("Itemname").item(0).text;
			var item_ID = item.getElementsByTagName("ItemID").item(0).text;
			var aisle_No = item.getElementsByTagName("AisleNumber").item(0).text;
			if (item_Name == 'NOITEM') {
				callback('NotFound', index, item_index, aisle_No);
			} else {
				callback('Found', index, item_index, aisle_No);
			}
		} catch(E) {
		}
	};

	xhr.send();

};
