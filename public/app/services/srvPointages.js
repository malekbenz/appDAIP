(function(){
angular.module('appDaip')
      .factory('srvPointages', ['$q', '$http', function ($q, $http) {

  var listPointages = [];
  var currentPointages = [];

  var thisDate  = new Date();
  var currentMonth = ((thisDate.getDate() > 20 ) ?  thisDate.getMonth() + 1  : thisDate.getMonth() );
  var lastMonths = [];
  for(var i =(currentMonth-6); i< currentMonth; i++){
    lastMonths.push((i+12)%12+1);
  }
  console.log(lastMonths);

  var getAll = function getAll(){
              var defer = $q.defer();
              $http.get("api/pointages")
                  .success(function(result) {
                    defer.resolve(result);
              });
              return defer.promise;
  }

  function addToCurrent(demande) {
            listPointages.unshift(demande) ;
  }
  var add =  function add(demande){
              var defer = $q.defer();
              demande.addedAt = new Date();
              $http.post('api/pointages', demande)
                    .success(function (data, status, headers, config) {
                        listPointages = data;
                        defer.resolve(data);
                    })
                    .error(function (data, status, header, config) {
                      console.log("Error");

                    });
                return defer.promise;
  }

  var remove =  function remove(index,demande){
      currentPointages.splice(index,1);
    }

  var addMonth =  function addMonth(mois,demande){
        if (demande.mois.indexOf(mois)<0){
          demande.mois.push(mois);
        }
        else
        {
            demande.mois.splice(demande.mois.indexOf(mois),1);
        }
    }
  return {
      getAll : getAll,
      add :add ,
      remove : remove,
      addMonth: addMonth,
      listPointages: listPointages,
      currentMonth: currentMonth,
      lastMonths :lastMonths

  }
}])}())
