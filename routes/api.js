var express = require('express');
var router = express.Router();
var Firebird = require('../server/firebird');
var utilsDAIP =require('../server/utilsdaip')
var listPointages = [];
router.get('/', function(req, res){
  Firebird.getContrat(
    function(data){
      res.json(data);
    });
  });


router.get('/pointages', function(req, res){
        res.json(listPointages);
});

router.post('/pointages', function(req, res){
      console.log(req.body);
      var demande = req.body;
        demande.addedAt = new Date();
        listPointages.unshift(demande) ;
        res.json(listPointages);
});

router.get('/contrat/:id', function(req, res){
    var sqlParams =[];
    sqlParams.push(req.params.id);
    Firebird.getContratByCCP(sqlParams,
      function(data){
        res.json(data);
      });

    });


router.get('/contrats', function(req, res){
       var q = req.query.q || '';
       var persone = utilsDAIP.getPersoneFromStr(q);

       var sqlParams =[];
       sqlParams.push(persone.CCP+'%');
       sqlParams.push(persone.nom.toUpperCase()+'%');
       sqlParams.push(persone.prenom.toUpperCase()+'%');
       sqlParams.push(persone.dateNaissance || '%' );

      //  console.log(sqlParams);
       Firebird.getContratByFLname(sqlParams,
           function(data){
             res.json(data);
           });
    });


module.exports = router;
