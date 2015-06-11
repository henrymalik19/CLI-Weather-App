/*
	Written By: Malik Henry
	Date: June 11, 2015
	Description: Program to get the day's forecast with
		the supplied latitude anf longitude coordinates
	Dependencies: Uses the FORECAST.IO API to get forecast
*/

var https = require('https');

var API_KEY_FORECAST = "d315d7cd29f1c881e4b35b1e48fbd3f3";
var lat = '40.87347';
var lng = '-73.8272029';

// Get the days forecast with the given latitude and longitude coordinates
//forecast.getForecast(lat, lng);
// Make a request to Forecast.io's API (https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE)
var request = https.get("https://api.forecast.io/forecast/" + API_KEY_FORECAST + "/" + lat + "," + lng, function(response) {
	// Get Data
	var responseBody = '';
	response.on("data", function(data) {
		responseBody += data;
	});
	//Parse Data
	response.on("end", function() {
		console.log(response.statusCode); // FOR TESTING!!!!!!! ########
		console.log(typeof responseBody); // FOR TESTING!!!!!!! ########
		parsedResData = JSON.parse(responseBody);
		console.log(typeof parsedResData); // FOR TESTING!!!!!!! ########
	});
	// Print Data	
});