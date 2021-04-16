var mysql = require('mysql');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index');
    });
}