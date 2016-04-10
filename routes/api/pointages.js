var express = require('express');
var router = express.Router();
var vmPointages  = [];

module.exports = (function(){
  // /api/pointages
  router.get('/', function(req, res){
        res.json(vmPointages);
  });
  router.post('/', function(req, res){
    console.log('Post Pointage');
        var demande = req.body;
          demande.addedAt = new Date();
          vmPointages.unshift(demande) ;
          res.json(vmPointages);
  });
  return router;
}())
