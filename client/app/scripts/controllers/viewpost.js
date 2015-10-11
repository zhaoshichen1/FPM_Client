'use strict';

/**
 * @ngdoc function
 * @name alertsApp.controller:ViewpostCtrl
 * @description
 * # ViewpostCtrl
 * Controller of the alertsApp
 */
angular.module('clientApp')
  .controller('ViewpostCtrl', function ($scope, $http, alertService, userService, $location, $routeParams) {

    $scope.user = userService;
    $scope.params = $routeParams;
    $scope.postId = $scope.params.postId;

    console.log("in View Post");

    debug.viewMessage = $scope;

    $scope.viewPost = function(){
      $http.get('/app/post/' + $scope.postId).error(function(data){
        alertService.add('danger', 'The post doesn\'t exist!');
      })
        .success(function(data){
          $scope.post = data;
        })
    }

    $scope.viewPost();

  });
