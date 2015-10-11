'use strict';

/**
 * @ngdoc function
 * @name alertsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the alertsApp
 */
angular.module('clientApp')
  .controller('MenuCtrl', function ($scope, $http, $location, userService) {

    debug = $scope;

    // attribute the user information inside
    $scope.user = userService;

    // add the functionality of logout inside
    $scope.logout = function(){
      $http.get('app/logout').success(function(data){
        if(data.hasOwnProperty("success")){

          // redirect to login page and clean the user information
          userService.username = '';
          $location.path('/login')
        }
      })
    }

    $scope.$watch('user.username', function(newVal){

      console.log('here, newVal is '+newVal);
      console.log('so isLoggedIn is '+$scope.isLoggedIn);

      if (newVal === ''){
        $scope.isLoggedIn = false;
      }
      else{
        $scope.isLoggedIn = true;
        $scope.username = newVal;
      }
    })
  });
