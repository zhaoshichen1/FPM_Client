'use strict';

/**
 * @ngdoc function
 * @name alertsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the alertsApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function($scope, userService, $location, $log, $http, alertService){

    // to be called while the form is submitted! Go directory for a check with Play-Java
    // not crossed by isAuthenticated
    $scope.lg = function(){

      var payload = {
        codename: this.codename,
        password: this.password
      };

      $http.post('/app/login', payload)
        .error(function(data, status){

          // something wrong with the form, such as incorrect codename/password
          if(status === 400){
            angular.forEach(data, function(value, key){
              if ( key === 'codename' || key === 'password' ){
                alertService.add('danger', key + ' : ' + value);
              }

              else{
                alertService.add('danger', value.message);
              }

            })
          }

          // the user don't have the right or the user is invalid
          else if ( status === 401 ){
            alertService.add('danger', 'Invalid login or password!');
          }

          else if ( status === 500 ){
            alertService.add('danger', 'Incorrect login or password');
          }

          else {
            alertService.add('danger', data);
          }
        })

        .success(function(data){
          $log.debug(data);
          if(data.hasOwnProperty(('success'))){
            userService.username = data.success.user;
            $location.path('/dashboard');
          }
        });

    }

    $scope.isAuthenticated = function(){


      // if already logged in, jump directly to dashboard
      if(userService.username){
        $log.debug(userService.username);
        $location.path('/dashboard');
      }

      // otherwise, ask Play-Java to check whether the guy is authenticated or not
      else{
        $http.get('/app/isauthenticated')
          .error(function(){

            // if the login process is failed --> re-go to the page of login
            $location.path('/login');

          })
          .success(function(data){

            if(data.hasOwnProperty('success')){

              // if he is successfully logged in
              userService.username = data.success.user;

              // go to dashboard !
              $location.path('/dashboard');

            }
          })

      }

    }



    console.log($scope.login);

    // run this method while on the login process
    $scope.isAuthenticated();

  });
