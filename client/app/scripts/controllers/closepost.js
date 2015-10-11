'use strict';

/**
 * @ngdoc function
 * @name alertsApp.controller:ClosepostCtrl
 * @description
 * # ClosepostCtrl
 * Controller of the alertsApp
 */
angular.module('clientApp')
  .controller('ClosepostCtrl', function ($scope, $http, alertService, userService, $location, $routeParams) {

    $scope.user = userService;
    $scope.params = $routeParams;
    $scope.postId = $scope.params.postId;

    $scope.closePost = function($data){

      console.log('in close Post inside');

      $http.get('/app/close_post/' + $scope.postId).error(function(data){
        console.log('Error '+data);
        alertService.add('danger', 'you cant close this post');
      })
        .success(function(data){
          console.log('Success!');

          debug.closeMessage = data;

          alertService.add('success','The Post is closed by '+userService.username);
          $location.path(
            '/viewpost/' + $scope.postId
          )
        })

    }
  });

