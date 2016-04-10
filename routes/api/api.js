var express = require('express');
    router = express.Router(),

    utilsDAIP =  require('../../server/utilsdaip'),
    pointages =  require('./pointages'),
    contrats  =  require('./contrats');

var listPointages = [];
router.use('/pointages', pointages);
router.use('/contrats', contrats);

module.exports = router;
