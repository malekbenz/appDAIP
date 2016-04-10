var path = require('path'),
    routes = require('./routes'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    // methodOverride = require('method-override'),
    favicon = require('serve-favicon');
    errorHandler = require('errorhandler');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':true}));
    app.use(bodyParser.json());
    // app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);  //moving the routes to routes folder.
    app.use(express.static(path.join(__dirname, '../public')));
    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    // catch 404 and forward to error handler

    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    app.use(function(req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
          });

    if ('development' === app.get('env')) {
            app.use(errorHandler());
          }

          app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
              message: err.message,
              error: {}
            });
          });

      return app;
};
