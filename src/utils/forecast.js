const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1884e81586327251ed96e3c73e566951&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weather service!`, undefined);
    } else if (body.error) {
      callback(`Unable to find location!`, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${
          body.current.temperature
        } degree celcius out. It feels like ${
          body.current.feelslike
        } degree celcius out. There is ${
          body.current.precip * 100
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
