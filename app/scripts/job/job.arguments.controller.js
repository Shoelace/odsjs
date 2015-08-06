/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    
    angular.module('odsjs.job').controller('job.arguments.controller',
    ['$scope','$stateParams','$state','$log','dbmsschedulerService',
    function($scope,$stateParams,$state,$log,dbmsschedulerService){
        
        console.log("job.arguments.controller");
        
   $log.debug("arguments state="+Object.keys($state));
   $log.debug("arguments state.params="+JSON.stringify($state.params));
   $log.debug("arguments state.current="+JSON.stringify($state.current));
   $log.debug("arguments state.href="+JSON.stringify($state.href));
   $log.debug("arguments state.transition="+JSON.stringify($state.transition));
   $log.debug("arguments state.transitionTo="+JSON.stringify($state.transitionTo));
   console.log("arguments stateparams="+JSON.stringify($stateParams));

      $scope.jobArgs=dbmsschedulerService.jobArgs;
      dbmsschedulerService.getJobArgs($stateParams);
          
        

    }]);      


})();