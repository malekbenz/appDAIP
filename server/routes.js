var express = require('express'),
    router = express.Router(),
    routes = require('../routes/index'),
    api = require('../routes/api/api');


module.exports = function(app) {
    router.use('/', routes);
    router.use('/api', api);

    app.use(router);
};
