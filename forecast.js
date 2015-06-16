/*
	Written By: Malik Henry
	Date: June 11, 2015
	Description: Program to get the day's forecast with
		the supplied latitude anf longitude coordinates
	Dependencies: Uses the FORECAST.IO API to get forecast
*/

var https = require('https');

var API_KEY_FORECAST = "d315d7cd29f1c881e4b35b1e48fbd3f3";

function printError(error) {
	console.log("Got error: " + error);
};

// Get the days forecast with the given latitude and longitude coordinates
//forecast.getForecast(lat, lng);
function get(lat, lng, callback) {
	// Make a request to Forecast.io's API (https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE)
	var request = https.get("https://api.forecast.io/forecast/" + API_KEY_FORECAST + "/" + lat + "," + lng, function(response) {
		// Get Data
		var responseBody = '';
		response.on("data", function(data) {
			responseBody += data;
		});
		response.on("end", function() {
			//Parse Data
			parsedResData = JSON.parse(responseBody);
			// Save Data
			data = {
				summary: parsedResData.daily.data[0].summary,
				tempMin: parsedResData.daily.data[0].temperatureMin,
				tempMax: parsedResData.daily.data[0].temperatureMax
			}
			callback(data);
		});
	});
	// Respond to error on the Request
	request.on("error", function(error) {
		printError();
		console.error("Sorry there has been a connection error.");
		console.error("Please check your connection and try again!");
	});
};


// Expose this module for use in other applications
module.exports.get = get;




