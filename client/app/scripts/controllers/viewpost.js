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

    $scope.addComment = function(){
      var payload = {
        postId : $scope.postId,
        comment: $scope.comment
      }

      $http.post('/app/comment', payload).error(function(data, status){
        if ( status === 400 ){
          angular.forEach(data, function(value, key){
            if ( key === 'comment' ){
              alertService.add('danger', key + ' : '+ value);
            }
            else
              alertService.add('danger', value.message);
          })
        }

        // not logged in
        else if(status === 401){
          $location.path('/login');
        }

        else if(status === 500){
          alertService.add('danger', 'Internal Server Error!!');
        }

        else
          alertService.add('danger', data);

      }).success(function(data){
        alertService.add('success', data.success.message);
        $scope.comment = '';
        $scope.viewPost();
      })
    }

  });
