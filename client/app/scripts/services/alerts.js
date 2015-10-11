'use strict';

/**
 * @ngdoc service
 * @name clientApp.alerts
 * @description
 * # alerts
 * Service in the clientApp.
 */
angular.module('clientApp')
  .factory('alertService', function($timeout){

      var ALERT_TIMEOUT = 3000;
      var alerts = [];

      // add a new alert, when the timeout is given, use it otherwise, 5 seconds for the timeout
      function add(type, msg, timeout){
          if(timeout){
              $timeout(function(){
                  closeAlert(this);
              },timeout);
          }
          else{
              $timeout(function(){
                  closeAlert(this);
              }, ALERT_TIMEOUT)
          }

        return alerts.push({
            type: type,
            msg: msg,
            close: function(){return closeAlert(this);}
        })
      }

      // close an given object of alert
      function closeAlert(alert){
          return closeAlertIdx(alerts.indexOf(alert));
      }

      // close the indicated alert with its index
      function closeAlertIdx(index){
          return alerts.splice(index, 1);
      }

      function clear(){
          alerts = [];
      }

      function get(){
          return alerts;
      }

      var service = {
          add: add,
          closeAlert: closeAlert,
          closeAlertIdx: closeAlertIdx,
          clear: clear,
          get: get
      }

      alerts = [];

      return service;
  })
