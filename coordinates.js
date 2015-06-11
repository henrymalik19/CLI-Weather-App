/*
	Written By: Malik Henry
	Date: June 11, 2015
	Description: Program to get City, State, Latitude 
		and Longitide coordinates for a specified Zip Code
	Dependencies: Uses the The Google Geocoding API to get coordinates
*/

// Import necessary modules
var https = require('https');
//var forecast = require('./forecast');
// 
var API_KEY_GOOGLE = "AIzaSyCwxNDP4TLpF-pI2K5o3IhFjxydSWKLxSU";

var address;
var lat;
var lng;


function printError(error) {
	console.log("Got error: " + error);
};

// Get the users zip code
// Convert zip code into latitude and longitude coordinates
// Make a request to Google's Geocoding API 
function getWeather(zipCode) {
	var request = https.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + API_KEY_GOOGLE, function(response) {
		// Get Data and concat together
		var responseBody = '';
		response.on("data", function(data) {
			responseBody += data;
		});
		response.on("end", function() {
			if(response.statusCode === 200) {
				try {
					// Parse Data
					parsedResData = JSON.parse(responseBody);

					// Find & Save coordinates and City and State
					address = parsedResData.results[0].formatted_address;
					lat = parsedResData.results[0].geometry.location.lat;
					lng = parsedResData.results[0].geometry.location.lng;
					console.log(response.statusCode, address, lat, lng) // FOR TESTING!!!!!!! ########
				} catch(error) { // Respond to any parsing errors
					printError(error);
					console.error("Sorry there has been an error parsing this data.");
				}
			} else {
				// Respond to status code errors
				printError({message: "There was an issue getting the coordinates with the specified zip code." +
					https.STATUS_CODES[response.statusCode]});
				console.error("Sorry there has been a status code error ");
			}
		});
		// Get the days forecast with the given latitude and longitude coordinates
		//forecast.getForecast(lat, lng);
	});
	// Respond to error on the Request
	request.on("error", function(error) {
		printError();
		console.error("Sorry there has been a connection error.");
		console.error("Please check your connection and try again!");
	});
};


// Expose this module for use in other applications
module.exports.getWeather = getWeather;




