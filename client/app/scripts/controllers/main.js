'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http) {

    debug = $scope;

    $scope.getAllPosts = function(){
      $http.get('/app/view_all_posts').success(function(data){
        $scope.posts = data;
      })
    }

    // list all the posts in the Database
    $scope.getAllPosts();
  });
