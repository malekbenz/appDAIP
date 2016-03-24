var express = require('express');
var router = express.Router();
var Firebird = require('../server/firebird');


router.get('/', function(req, res){
  Firebird.getContrat(
    function(data){
      res.json(data);
    });
  });

router.get('/contrat/:id', function(req, res){
    var sqlParams =[];
    sqlParams.push(req.params.id);
    Firebird.getContratByCCP(sqlParams,
      function(data){
        res.json(data);
      });

    });

router.get('/contrat', function(req, res){
  var sqlParams =[];
  var ccp = (req.query.ccp || '') +'%';
  var nom = (req.query.nom || '') +'%';
  var prenom = (req.query.prenom || '') +'%' ;

  sqlParams.push(ccp);
  sqlParams.push(nom.toUpperCase());
  sqlParams.push(prenom.toUpperCase());

  Firebird.getContratByFLname(sqlParams,
      function(data){
        res.json(data);
      });
     });


module.exports = router;
