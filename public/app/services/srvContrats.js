appDaip.factory('srvContrats',['$q', '$http', function ($q, $http) {
  listPointages = [];
  function findById(id){
    return []
  }
  function find(q){
      var defer = $q.defer();
      $http.get("api/contrats?q="+q)
          .success(function(result) {
            defer.resolve(result);
      });
      return defer.promise;
  }
  return {
    findById : findById,
    find : find
  }
}]);
