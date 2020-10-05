const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Mary'
	});
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query.search);
	res.send({
		products: []
	})
})

app.get('/help', (req, res) => {

	res.render('help', {
		title: 'Help',
		name: 'Mary',
		message: 'You need help? Pshht. I need help...'
	})
	// res.send([{

	// 	name: 'Mary',
	// 	age: 27

	// }, { 

	// 	name: 'Joanne',
	// 	age: 'Never ask a lady her age'
	// }
	// ]);
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Mary'
	} );
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		console.log('You must provide an address')
		return res.send({
			error: 'You must provide an address'
		})
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

		if(error) {
			console.log(error);
			res.send({error: error});
			return;
		}

		forecast(latitude, longitude, (error, forecastData) => {

			if(error) {
				console.log(error);
				return;
			}
			
	  		// console.log(location)
	  		// console.log(forecastData)
	  			res.send({ 
					forecast: forecastData,
					location, 
					address: req.query.address
				});
		});
	});

});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Mary',
		type: 'Help Article'
	});
	// res.render('index', {
	// 	title: 'Weather App',
	// 	name: 'Mary'
	// });
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Mary',
		type: 'Page'
	});
	// res.render('index', {
	// 	title: 'Weather App',
	// 	name: 'Mary'
	// });
})

app.listen(3000, () => {
	console.log('Server Running')
})