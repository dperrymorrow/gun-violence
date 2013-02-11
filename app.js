
/**
 * Module dependencies.
 */

var express = require('express');
var http    = require('http');
var app     = express();
var path    = require('path');

app.configure(function() {
  app.set('port', process.env.PORT || 3011);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public')));
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});


