const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=fe5ab025f08c32bec7152a45f3bee4e9&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weatherstack services!", undefined);
    } else if (res.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature: res.body.current.temperature,
      });
    }
  });
};
module.exports = forecast;
