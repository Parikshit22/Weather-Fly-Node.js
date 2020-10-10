const request = require("request");

const weather_stack = (latitude, longitude, callback) => {
  var url = `http://api.weatherstack.com/current?access_key=90553f76d3f581bdea26d9db6cdee2c2&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect with weather service", undefined);
    } else if (response.body.error) {
      callback("Wrong input provided", undefined);
    } else {
      var data = response.body;
      const curr_temp = data.current.temperature;
      const feels_like = data.current.feelslike;
      const weather_descriptions = data.current.weather_descriptions;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${curr_temp} out, it feels like ${feels_like} degree out.`
      );
    }
  });
};

module.exports = weather_stack;
