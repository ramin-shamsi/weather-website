const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFtaW4tc2hhbXNpIiwiYSI6ImNrcnB6dGoxNzAyc3oybnBxZmZxaGNzMWEifQ.TfpzRr09-yM_Bzuan0437g&limit=1`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect  to mapbox services!", undefined);
    } else if (!res.body.features.length) {
      callback("Unable to find location. try another search", undefined);
    } else {
      callback(undefined, {
        longitude: res.body.features[0].center[0],
        latitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
