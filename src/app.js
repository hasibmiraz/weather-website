// Importing library
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Get the home page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Miraz',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About us',
    name: 'Miraz',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'Have any query? Let us know!😊',
    title: 'Help',
    name: 'Miraz',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMsg: 'Help article not found',
    name: 'Miraz',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMsg: 'My 404 Page',
    name: 'Miraz',
  });
});

app.listen(3000, () => {
  console.log(`Listening to port 3000`);
});
