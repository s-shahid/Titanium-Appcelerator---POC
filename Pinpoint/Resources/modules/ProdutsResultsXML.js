var results = function ProductsResultsXML(_searchText, callback) {

	var resultsData = [];

	var xhr = Ti.Network.createHTTPClient();
	var url = ('http://www.supermarketapi.com/api.asmx/SearchByProductName?APIKEY=8d0d3a96c3&ItemName=' + _searchText);
	xhr.open("GET", url);
	xhr.onload = function() {

		try {
			var doc = this.responseXML.documentElement;
			var items = doc.getElementsByTagName("Product");
			var x = 0;

			for (var c = 0; c < items.length; c++) {
				var item = items.item(c);
				var itemName = item.getElementsByTagName("Itemname").item(0).text;
				var category = item.getElementsByTagName("ItemCategory").item(0).text;
				var thumbnail = item.getElementsByTagName("ItemImage").item(0).text;
				var id = item.getElementsByTagName("ItemID").item(0).text;

				resultsData.push({
					itemName : itemName,
					category : category,
					thumbnailImage : thumbnail,
					id : id
				});
			}
			callback(resultsData);
		} catch(E) {
		}
	};
	Ti.App.addEventListener('cancel', function(e) {
		xhr.abort();
	});
	xhr.send();

	return resultsData;

};

module.exports = results;

