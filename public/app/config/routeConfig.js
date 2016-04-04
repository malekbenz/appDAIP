(function(){
     'use strict';
    angular.module('appDaip')
    .config(['$routeProvider', function($routeProvider) {
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
  ])

}())
