var express = require('express');
var router = express.Router();
var Firebird = require('../server/firebird');


router.get('/contrat', function(req, res){
     Firebird.getContrat(
          function(data){
              res.json(data);
       });
});

router.get('/', function(req, res){
  Firebird.getContrat(
    function(data){
      res.json(data);
    });
});
module.exports = router;
