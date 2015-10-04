'use strict';

/**
 * @ngdoc function
 * @name alertsApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the alertsApp
 */
angular.module('clientApp')
  .controller('AlertsCtrl', function ($scope, alertService) {
    $scope.alerts = alertService.get();
  });
