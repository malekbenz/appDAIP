var express = require('express'),
    router = express.Router(),
    db  =  require('../../server/firebird'),
    utilsDAIP =require('../../server/utilsdaip');

module.exports = (function(){
function getSqlParams(q){
        q = q || '';
        var sqlParams =[];
        var persone = utilsDAIP.getPersoneFromStr(q);
        sqlParams.push(persone.CCP+'%');
        sqlParams.push(persone.nom.toUpperCase()+'%');
        sqlParams.push(persone.prenom.toUpperCase()+'%');
        sqlParams.push(persone.dateNaissance || '%' );
        return sqlParams;
}

router.get('/', function(req, res, next){
         var sqlParams =getSqlParams(req.query.q);

         db.getContratByFLname(sqlParams,
             function(err, data){
               if (!err)
               res.json(data);
               else
               {
                 next("erreur interne");
               }

             });
      });
      return  router;
}())
