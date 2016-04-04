var express = require('express');
var router = express.Router();
var Firebird = require('../../server/firebird');
var utilsDAIP =require('../../server/utilsdaip')
var listPointages = [];

router.get('/', function(req, res){
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
