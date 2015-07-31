/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    
    angular.module('odsjs.job').controller('job.notification.controller',
    ['$scope','$stateParams','$state','$log','dbmsschedulerService',
    function($scope,$stateParams,$state,$log,dbmsschedulerService){
        
        console.log("job.notification.controller");
        
   $log.debug("appctrl state="+Object.keys($state));
   $log.debug("appctrl state.params="+JSON.stringify($state.params));
   $log.debug("appctrl state.current="+JSON.stringify($state.current));
   $log.debug("appctrl state.href="+JSON.stringify($state.href));
   $log.debug("appctrl state.transition="+JSON.stringify($state.transition));
   $log.debug("appctrl state.transitionTo="+JSON.stringify($state.transitionTo));
   console.log("appctrl stateparams="+JSON.stringify($stateParams));

      $scope.jobNtfn=dbmsschedulerService.jobNtfn;
        dbmsschedulerService.getJobNtfn($stateParams);
          
        

    }]);      



})();