var express = require('express');
var router = express.Router();
var Firebird = require('../../server/firebird');
var utilsDAIP =require('../../server/utilsdaip')
var listPointages = [];

router.get('/', function(req, res){
  console.log("Hi ");
        res.json(listPointages);
});

router.post('/', function(req, res){
      console.log(req.body);
      var demande = req.body;
        demande.addedAt = new Date();
        listPointages.unshift(demande) ;
        res.json(listPointages);
});

module.exports = router;
