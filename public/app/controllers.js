var appDaip = angular.module('appDaip');

appDaip.controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
});

appDaip.controller('contratListCtrl',['$scope', 'srvPointages', 'srvContrats', function ($scope, srvPointages, srvContrats) {
  $scope.results = [];
  $scope.pointages = [];
  $scope.lastPointages =[];
  $scope.lastMonths=  srvPointages.lastMonths;
  $scope.addMonth = function (mois,demande){
     console.log(demande);

        if (demande.mois.indexOf(mois)<0){
          demande.mois.push(mois);
        }
        else
        {
            demande.mois.splice(demande.mois.indexOf(mois),1);
        }
    }
  srvPointages.getAll()
                .then(function(response) {
                  $scope.lastPointages =      response;
                  console.log($scope.lastPointages);
                });

  $scope.removePointage =  function (index,demande){
      $scope.pointages.splice(index,1);
    }
  $scope.addPointage =  function (index,demande){
    var newDemande = $scope.pointages[index];
      srvPointages.add(newDemande)
      .then(function(response) {
        $scope.listPointage =  response;

      });

      $scope.pointages.splice(index,1);
    }

  $scope.add =  function(demande){
    demande.addedAt = new Date();
    demande.mois = [srvPointages.currentMonth];

    if ($scope.pointages.length>0)
    {
    var newDemande = $scope.pointages.pop();
    srvPointages.add(newDemande)
    .then(function(response) {
      $scope.listPointage =  response;
      $scope.lastPointages.unshift(newDemande);
  });
    }
    $scope.pointages.unshift(demande) ;
  }

  $scope.search = function(){
      srvContrats.find($scope.strSearch)
              .then(function(response) {
                $scope.results = response;
              });
  }
}]);

appDaip.controller('contratListPointage',['$scope', 'srvPointages', function ($scope, srvPointages) {
  $scope.listContrats = [];
  srvPointages.getAll()
              .then(function(response) {
                $scope.listContrats =      response;
              });

  $scope.remove = srvPointages.remove;
}]);
