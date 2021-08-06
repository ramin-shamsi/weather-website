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
        description: res.body.current.weather_descriptions[0],
        wind_speed: res.body.current.wind_speed,
        wind_degree: res.body.current.wind_degree,
        wind_dir: res.body.current.wind_dir,
        pressure: res.body.current.pressure,
        precip: res.body.current.precip,
        humidity: res.body.current.humidity,
        cloudcover: res.body.current.cloudcover,
        feelslike: res.body.current.feelslike,
      });
    }
  });
};
module.exports = forecast;
