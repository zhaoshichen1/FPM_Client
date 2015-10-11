'use strict';

/**
 * @ngdoc service
 * @name alertsApp.user
 * @description
 * # user
 * Service in the alertsApp.
 */
angular.module('clientApp')
  .factory('userService', function() {
    var username = '';

    return {
      username : username
    };
  });
