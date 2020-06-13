const request = require('request')

const forecast = (longitude, latitude, callback) => {
	const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=d3fbc0b24f1311053c8e0295c8deb34b'

	request({url: url, json: true}, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!')
		}
		else if (body.cod === '400') {
			callback('Unable to find location!')
		}
		else {
			callback(undefined, 'It is currently ' + (body.main.temp - 273.15).toFixed(2) + ' degrees out. It is a ' + body.weather[0].description + ', with wind speed ' + ((body.wind.speed * 18) / 5).toFixed(2) + ' km/h.')
		}
	})
}


module.exports = forecast