/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    
    

angular.module('odsjs').controller('job.detail.controller',
    ['$scope','$stateParams','$state','$log','dbmsschedulerService',
    function($scope,$stateParams,$state,$log,dbmsschedulerService){
        
   $log.debug("odsjsAppJobDtlCtrl stateparams="+JSON.stringify($stateParams));

/*
         $scope.go = function(state) {
   $log.debug('odsjsAppJobDtlCtrl go');
      $state.go(state);
    };    
    */
   //dont need to load stuff.. included in currentJob
   //$scope.jobDetails=dbmsschedulerService.jobDetail;
    //    dbmsschedulerService.getJobDetail($stateParams);
        
     
    }]);      

})();