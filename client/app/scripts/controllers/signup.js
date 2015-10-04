'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the clientApp
 */
angular.module('clientApp').
  controller('SignupCtrl', function ($scope, $http, $log, alertService, $location, userService) {

      $scope.whileSubmit = function() {

        var payload = {
            codename: $scope.codename,
            org: $scope.org,
            password: $scope.password
        };

        $http.post('app/signup', payload).error(function(data, status){
                // bad request casued by "maybe" existing user with the same codename
                if(status === 400){


                    angular.forEach(data,
                        function(value, key)
                        {

                            if(key === "codename" || key === "password" || key === "org" )
                                alertService.add('danger', key + ' : ' + value);
                            else
                                alertService.add('danger', value.message);
                        }
                    )
                }

                if(status === 500){
                    alertService.add('danger', 'Internal Server Error!!');
                }
              }).success(

          function(data){

            console.log('IN');
            console.log(data);
            debug = data;

            if(data.hasOwnProperty('success')){
              $location.path(
                '/dashboard'
              )
            }
          });



      }
  });
