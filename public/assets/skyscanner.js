var request = require("request");

$(document).ready(function () {

  $('form').on('submit', function () {
var query = 'London';
var externalURL = {
  method: 'GET',
  url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
  qs: { query: query },
  headers: {
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
    'x-rapidapi-key': ''
  }
};

request(externalURL, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
  });
});

module.exports.callApi = externalURL;

const request = require('request');

$(document).ready(function () {

  $('form').on('submit', function () {

    var item = $('form input');
    var todo = { item: item.val() };

    $.ajax({
      type: 'POST',
      url: '/skyscanner',
      data: todo,
      success: function (data) {
        console.log('kek');


        var query = item;
        const url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/";
        const headers = {
          'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': ''
        };

        var externalURL = {
          method: 'GET',
          url: url,
          qs: { query: query },
          headers: headers
        };

        request(externalURL, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
        });
      }
    });
    return false;
  });
});