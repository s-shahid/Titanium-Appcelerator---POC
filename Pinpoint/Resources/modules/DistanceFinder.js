/**
 * @author Mohammed Shahid
 */
exports.DistanceFinder = function(srcLat,srcLon,DestLat,DestLon,callback) {

	var distance;
	var GOOGLE_URL = 'http://maps.googleapis.com/maps/api/directions/json?';
	
	GOOGLE_URL = GOOGLE_URL+'origin='+srcLat+','+srcLon+'&destination='+DestLat+','+DestLon+'&sensor=false&mode=driving';
	var json;
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', GOOGLE_URL);
	Ti.App.addEventListener('Stop', function(e) {
			xhr.abort();
		});
	xhr.onload = function() {  
		Ti.App.addEventListener('Stop', function(e) {
			xhr.abort();
		});
	    json = JSON.parse(this.responseText);
	    if(json != undefined && json.routes[0] != undefined){
	     distance = json.routes[0].legs[0].distance.text;
	 	 callback(distance);
	 	 }
	};
	
	xhr.onerror = function(e) {
		Ti.API.error(e.error);
		alert(ERROR_MESSAGE);
	};
	xhr.send();
	
};
