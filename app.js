var coordinates = require('./coordinates');
var forecast = require('./forecast');

var zipCode = process.argv[2];

// Have to passs in a callback as the second paramaeter in order to get return value
coordinates.get(zipCode, function gotCoordinates(cData) {
	//console.log(cData); // FOR TESTING!!!!!!! ########
	// Have to passs in a callback as the second paramaeter in order to get return value
	forecast.get(data.lat, data.lng, function gotForecast(fcData) {
		//console.log(fcData); // FOR TESTING!!!!!!! ########
		console.log("Forecast for " + cData.address);
		console.log("Summary: " + fcData.summary);
		console.log("Low: " + Math.round(fcData.tempMin) + "°F High: " + Math.round(fcData.tempMax) + "°F");
	});
});
var d = new Date();
console.log(d)

// Get the days forecast with the given latitude and longitude coordinates
//forecast.getForecast(lat, lng);