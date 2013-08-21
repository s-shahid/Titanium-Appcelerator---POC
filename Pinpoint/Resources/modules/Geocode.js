// Usage
// var geo = require('modules/GeoCode');
// geo.forwardGeocode('Luckys 200 El Paseo De Saratoga San Jose CA', getLatLng(lat,lng));
// Add a function callBack getLatLng(lat,lng) in file
// Url to get the Lat and Long from Address

var GOOGLE_BASE_URL = 'http://maps.googleapis.com/maps/geo?output=json&q=';
var ERROR_MESSAGE = 'There was an error geocoding. Please try again.';

exports.forwardGeocode = function(address, storeName, i, callback) {
	forwardGeocodeNative(address, storeName, i, callback);
};

// For Native components (iPhone and Android)
var xhr;
var Lat, Lon;
var json;
var forwardGeocodeNative = function(address, storeName, i, callback) {

	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', GOOGLE_BASE_URL + address);

	xhr.onload = function() {
		Ti.App.addEventListener('Stop', function(e) {
			xhr.abort();
		});
		json = JSON.parse(this.responseText);
		if (!json.Placemark || !json.Placemark[0].Point || !json.Placemark[0].Point.coordinates) {
			return;
		}
		Lat = json.Placemark[0].Point.coordinates[1];
		Lon = json.Placemark[0].Point.coordinates[0];
		callback(Lat, Lon, storeName, i);
	};

	xhr.onerror = function(e) {
		Ti.API.error(e.error);
		alert(ERROR_MESSAGE);
	};
	xhr.send();
};
