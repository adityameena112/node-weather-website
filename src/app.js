const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates') // if we change name of views folder to templates
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // if we change name of views folder to templates
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))





app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Aditya Meena'
	})
})


app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Aditya Meena'
	})
})


app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'This is some helpful text.',
		name: 'Aditya Meena'
	})
})


app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		})
	}

	geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({ error: error })
		}

		forecast(longitude, latitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error })
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
	})
 
	// res.send({
	// 	forecast: 'It is raining',
	// 	location: 'Indore',
	// 	address: req.query.address
	// })
})



app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}
	console.log(req.query)
	res.send({
		product: []
	})
})


app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Aditya Meena',
		errorMessage: 'Help artical not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Aditya Meena',
		errorMessage: 'Page not found'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})









