var appDaip = angular.module('appDaip');

appDaip.controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
});

appDaip.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.animationsEnabled = true;
  $scope.open = function (size) {
                  var modalInstance = $uibModal.open({
                                animation: $scope.animationsEnabled,
                                templateUrl: 'app/partials/modalDetailContrat.html',
                                controller: 'ModalInstanceCtrl',
                                size: size,
                                resolve: {
                                  items: function () {
                                    return $scope.items;
                                  }
                                }
                              });

                  modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                  }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                  });
                };

  $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

appDaip.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

              $scope.items = items;
              $scope.selected = {
                item: $scope.items[0]
              };
              $scope.ok = function () {
                $uibModalInstance.close($scope.selected.item);
              };
              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
});

appDaip.controller('contratListCtrl',['$scope', 'srvPointages', 'srvContrats','$uibModal', '$log',
                    function ($scope, srvPointages, srvContrats, $uibModal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.animationsEnabled = true;

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

  $scope.add =  function(demande, $event){
    $event.stopPropagation();
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

  $scope.open = function (demande,size) {
                  var modalInstance = $uibModal.open({
                                animation: $scope.animationsEnabled,
                                templateUrl: 'app/partials/modalDetailContrat.html',
                                controller: 'ModalInstanceCtrl',
                                size: size,
                                resolve: {
                                  items: function () {
                                    return demande;
                                  }
                                }
                              });

                  modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                  }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                  });
                };

  $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                  };


}]);

appDaip.controller('contratListPointage',['$scope', 'srvPointages', function ($scope, srvPointages) {
  $scope.listContrats = [];
  srvPointages.getAll()
              .then(function(response) {
                $scope.listContrats =      response;
              });

  $scope.remove = srvPointages.remove;
}]);
