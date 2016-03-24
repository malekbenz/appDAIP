var appDaip = angular.module('appDaip', ['ngRoute']);


appDaip.config(['$routeProvider',
    function($routeProvider) {

        // Système de routage
        $routeProvider
        .when('/home', {
            templateUrl: 'partials/search.html',
            controller: 'contratListCtrl'
        })
        .when('/pointages', {
            templateUrl: 'partials/pointages.html',
            controller: 'contratListPointage'
        })
        .otherwise({
        redirectTo: '/home'
      });
    }
]);

appDaip.factory('srvPointage', function () {
  listPointages = [];
  return listPointages;
});


appDaip.controller('contratListCtrl',['$scope', '$http','srvPointage', function ($scope, $http,srvPointage) {
  $scope.listContrats = [];
  $scope.listPointage = srvPointage;

  $scope.add = function(demande){
    demande.addedAt = new Date();
    srvPointage.unshift(demande) ;
    console.log(srvPointage);

  };

  $scope.removePointage=  function(index,demande){
      srvPointage.splice(index,1);
      // srvPointage.unshift(demande) ;
      console.log(index,1);

    };

  function getUrlTerms(strTerms)  {
    var terms = strTerms.split(" ");;
    var searchCCP = '' ;
    var searchNom ='';
    var searchPrenom ='';
    terms.forEach(function(el){
        if (parseInt(el, 10))
        {
          searchCCP = el;
        }
        else
        {
          if(!searchNom)
            searchNom = el;
          else
            searchPrenom = el;
        }
      });

    var result = '?ccp=' + searchCCP
      result += '&nom=' + searchNom;
      result += '&prenom=' + searchPrenom;

    return result;
  }

  $scope.search = function(){
    var terms = $scope.strSearch.split(" ");
    searchTerm = getUrlTerms($scope.strSearch);
    console.log('URL '+ searchTerm);
    $http.get("api/contrat/"+searchTerm)
    .then(function(response) {
      $scope.listContrats =      response.data;
      // $scope.ccp ="";
    });
  }
}]);

appDaip.controller('contratListPointage',['$scope', '$http','srvPointage', function ($scope, $http,srvPointage) {
  $scope.listContrats = srvPointage;

  $scope.remove = function(index,demande){
    srvPointage.splice(index,1);
    // srvPointage.unshift(demande) ;
    console.log(index,1);

  };

}]);
