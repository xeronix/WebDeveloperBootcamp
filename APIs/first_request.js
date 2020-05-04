var request = require('request');
var sunsetApiUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

request(sunsetApiUrl, function(error, response, body) {
   if (error) {
       console.log("SOMETHING WENT WRONG!");
       console.log(error);
   } else {
       if (response.statusCode == 200) {
           var weatherData = JSON.parse(body);
           console.log(weatherData["query"]["results"]["channel"]["astronomy"]["sunset"]);
       }
   } 
});  