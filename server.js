var express = require('express'),
  config = require('./server/configure'),
  app = express(),
  db = require('./server/models/db'),
  dbURI = 'mongodb://localhost/awem';
  mongoose = require('mongoose');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');


  app = config(app);

var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
  });
