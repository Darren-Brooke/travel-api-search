if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//create server with Express
const express = require('express');
const path = require('path');
// individual controllers to keep app.js uncluttered
const todoController = require('./controllers/todoController');
const indexController = require('./controllers/indexController');
const apiController = require('./controllers/skyScannerController');
const registerController = require('./controllers/registerController');


const app = express();

app.use(express.urlencoded({
    extended: false
}));
// setting up template engine
app.set('view engine', 'ejs');

// For Static Files
app.use(express.static('./public'))
app.use('/favicon.ico', express.static('public/images/favicon.ico'));


// Fire Controllers
todoController(app);
indexController(app);
apiController(app);
registerController(app);

//Open port
const Port = process.env.PORT;
app.listen(Port, () => console.log('Server start on Port 3000'));