/**
 * @author Mohammed Shahid
 */
/*Usage var ZipCodeFinder = require('modules/ZipCodeFinder');
 ZipCodeFinder.ZipCodeFinder(37.77,-122.41,function(zipCode){});
 Here zipCode Contains the value*/

exports.ZipCodeFinder = function(lat, lon,callback) {

	var zipCode;
	var GOOGLE_URL = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = function() {
		Ti.App.addEventListener('Stop',function(e){
			xhr.abort();
		});
		// var json = JSON.parse(this.responseText);
		// var length = json.results[0].address_components.length;
		// zipCode = json.results[0].address_components[length - 1].long_name;
		var StoresByZip = require('modules/StoresByZip');
		// console.log('Adding');
		//94109
		StoresByZip.StoresByZip(94109,function(lat, lon,storeName,storeID,store_add) {
			callback(lat, lon, storeName, storeID, store_add, true);
		});

	};

	xhr.onerror = function(e) {
		Ti.API.error(e.error);
		alert(ERROR_MESSAGE);
	};
	
	xhr.open('GET', GOOGLE_URL + lat + ',' + lon + '&sensor=true');
	xhr.send();
	
};
