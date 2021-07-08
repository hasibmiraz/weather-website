const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaGFzaWJtaXJheiIsImEiOiJja2VrN2p0N3EwOGVzMndwYm03dmt3YnZ3In0.Ecmk6IxOQEx7B3Mkx-fPXA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (body.features.length === 0) {
      callback(`Unable to find location. Try again later.`, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
