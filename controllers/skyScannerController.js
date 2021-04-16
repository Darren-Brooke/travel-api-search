var bodyParser = require('body-parser');
var request = require("request");


var urlencodedParser = bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000})
var jsonParser = bodyParser.json({limit: '50mb'}); 

module.exports = function (app) {

    var location = 'glasgow';

    app.get('/hotels', function (req, res) {

        hotelSearch();

        res.render('hotels');
    });

    function hotelSearch() {

        var options = {
            method: 'GET',
            url: 'https://hotels4.p.rapidapi.com/locations/search',
            qs: {
                locale: 'en_US',
                query: location
            },
            headers: {
                'x-rapidapi-host': 'hotels4.p.rapidapi.com',
                'x-rapidapi-key': ''
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            var destinationId = JSON.parse(body)

            var id = JSON.stringify(destinationId.suggestions[0].entities[0].destinationId);

            hotelList(id);
        });

    }

    function hotelList(destId) {
        var locationId = destId;

        var options = {
            method: 'GET',
            url: 'https://hotels4.p.rapidapi.com/properties/list',
            qs: {
              currency: 'USD',
              starRatings: '2%2C3',
              checkIn: '2020-03-25',
              locale: 'en_US',
              checkOut: '2020-03-26',
              sortOrder: 'PRICE',
              destinationId: locationId,
              type: 'CITY',
              pageNumber: '1',
              pageSize: '25',
              adults1: '1'
            },
            headers: {
              'x-rapidapi-host': 'hotels4.p.rapidapi.com',
              'x-rapidapi-key': ''
            }
          };
          
          request(options, function (error, response, body) {
              if (error) throw new Error(error);

              var listJSON = JSON.parse(response)

              console.log(JSON.parse(body).data.body.searchResults.results)

              console.log(listJSON + ' success');
          });
    }

    app.post('/hotels', urlencodedParser, function (req, res) {
        bed = req.body.item;
        check = req.body.check;
        out = req.body.out;
        console.log(bed + ' ' + check + ' ' + out);

        return res.redirect('/hotels');
    });



    app.get('/skyscanner', function (_req, res) {
        createPoll();

        res.render('skyscanner');
    });
    function createPoll() {

        var options = {
            method: 'POST',
            url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0',
            headers: {
                'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                'x-rapidapi-key': '',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                inboundDate: '2020-03-30',
                cabinClass: 'business',
                children: '0',
                infants: '0',
                country: 'US',
                currency: 'GBP',
                locale: 'en-US',
                originPlace: 'SFO-sky',
                destinationPlace: 'LHR-sky',
                outboundDate: '2020-03-25',
                adults: '1'
            }
        };

        request(options, function (error, response, _body) {
            if (error) throw new Error(error);

            var a = response.caseless.dict.location;
            var output = a.split(/[/ ]+/).pop();

            pollResult(output);

        });
    }

    function pollResult(out) {
        var output = out;
        var pollOptions = {
            method: 'GET',
            url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/' + output,

            qs: {
                sortType: 'carrier',
                stops: '0',
                originAirports: 'Toronto Pearson International',
                destinationAirports: 'Paris Orly',
                pageIndex: '0',
                pageSize: '100'
            },
            headers: {
                'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
                'x-rapidapi-key': ''
            }
        };

        request(pollOptions, function (error, _response, body) {
            if (error) throw new Error(error);

            var poll = JSON.parse(body);

            console.dir(poll);

        });
    }

}