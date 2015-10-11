'use strict';

/**
 * @ngdoc function
 * @name alertsApp.controller:AddpostCtrl
 * @description
 * # AddpostCtrl
 * Controller of the alertsApp
 */
angular.module('clientApp')
  .controller('AddpostCtrl', function ($scope, $http, alertService, $location) {

    $scope.post = function (){
      var payload = {
        subject : $scope.subject,
        content : $scope.content
      }

      $http.post('/app/post',payload).error(function(data,status){

        // 400 means subject or content is invalid
        if ( status === 400 ){
          angular.forEach(data, function(value, key){
            if ( key === 'subject' || key === 'content'){
              alertService.add('danger',key + ' : ' + value);
            }
            else
              alertService.add('danger',value.message);
          })
        }

        // 401 means there isn't any user logged in
        else if ( status === 401 ){
          $location.path(
            '/login'
          )
          alertService.add('danger','You are not logged in yet');
        }

        // 500 means internal server error - can't connect to error
        else if ( status === 500 ){
          alertService.add('danger','Internal Server Error!');
        }

        else {
          alertService.add('danger',data);
        }

      })
        .success(function(data){

          // re-initialiate the subject and the content
          // resend the message of success
          $scope.subject = '';
          $scope.content = '';
          alertService.add('success',data.success.message);

          debug.addPostMessage = data;

          if(data.hasOwnProperty('success')){
            $location.path(
              '/dashboard'
            )
          }
        });

  }});
