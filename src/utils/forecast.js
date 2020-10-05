const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

	const url= 'http://api.weatherstack.com/current?access_key=5cf4d58d5cde853fc271502586703320&query=' + latitude + ',' + longitude + '&units=f';

	request({ url: url, json: true }, (err, { body }) => {

		if(err){
			callback('Error. Cannot retrieve weather data', err);
		} else if(body.error){
			callback('Unable to find location', err);
		} else {
			callback(undefined, { 
				temperature: body.current.temperature,
				feelsLike: body.current.feelslike,
				current: body.current,
				description: body.current.weather_descriptions[0],
				dataString:  body.current.weather_descriptions[0] + '. The temperature outside is ' + body.current.temperature + decodeURIComponent('%C2%B0') + ' F; It feels like ' + body.current.feelslike + '. There is ' + body.current.humidity + '% humidity with a ' + body.current.precip + '% chance of precipitation.' 
			})

		}
	})

}


module.exports = forecast