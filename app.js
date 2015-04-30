'use strict';

var express = require('express'),
app         = express(),
bodyParser  = require('body-parser'),
mongoose    = require('mongoose');

/**
*	Configuring Express
*/
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/build'));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * Connect to DB
 */

mongoose.connect('mongodb://localhost/meantodo');

require('./routes')(app);
require('./api')(app);

/**
*	Initializing Server
*/
var server = app.listen(3000, function () {

  var host = 'localhost';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});