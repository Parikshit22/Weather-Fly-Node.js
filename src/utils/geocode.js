const request = require("request");

const geocode = (address, callback) => {
  var url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicGFyaWtzaGl0NDAiLCJhIjoiY2tmaHBlOXBlMG5oMjJybnZoYXhpb3kwcyJ9.E9Jz7NamGGl8F_TxAwfFNg";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect with location service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Wrong input provided", undefined);
    } else {
      var data = response.body;

      callback(undefined, {
        longitude: data.features[0].center[0],
        latitude: data.features[0].center[1],
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
