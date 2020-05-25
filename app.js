require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');

//port
app.set('port', 3000)

//middleware
app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

//Enable Parsing
app.use(bodyParser.urlencoded({ extended: false}));

//setup routing
app.use('/api', routes);

//Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log("App started on port " + port);
});
