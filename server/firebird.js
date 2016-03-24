var fs =require('fs');
var Firebird = require('node-firebird');
var sqlOptions = require('./sqlOptions');

var configDB = LoadConfig();
var pool = Firebird.pool(10, configDB);

module.exports =
      {
        getContrat : function(callback){
            execSql(sqlOptions.sqlContrat,[],callback)
          },
        getContratByCCP : function(params,callback){
            execSql(sqlOptions.sqlContratByCCP, params, callback)
          },
        getContratByFLname : function(params,callback){
              execSql(sqlOptions.sqlContratByFLname, params, callback)
              }
      }

function execSql(sql,params, cb){
  pool.get(function(err, db) {
        if (err)
          throw err;
      // db = DATABASE
      db.query(sql, params, function(err, result) {
          // IMPORTANT: close the connection
          db.detach();
          result.forEach(function(element, index, array){
             for (var index in element) {
               // Convert Buffer to string
                    if (Buffer.isBuffer( element[index]))
                      element[index] = element[index].toString('utf8');
                }
          })
          cb(result);
      });
  });
}



function LoadConfig() {
    var cfg = {};
    try {
        fs.statSync(__dirname + '/models/cfg/cfg.json');
        var sCfg = fs.readFileSync(__dirname + '/models/cfg/cfg.json', 'utf8');
        cfg = JSON.parse(sCfg);

    }
    catch (e) {
        console.log("Error loading config " + e.message)
    }
    return cfg;
};
