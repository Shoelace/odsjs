/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    

angular.module('odsjs.job').controller('job.runlog.controller',JobRunlogController);



JobRunlogController.$inject =    ['$stateParams','$state','$log','dbmsschedulerService'];

function JobRunlogController ($stateParams,$state,$log,dbmsschedulerService){
  var vm = this;
  vm.jobRunlog=dbmsschedulerService.jobRunlog;
  
       activate();

    function activate() {
        return dbmsschedulerService.getJobRunlog($stateParams).then(function(response){
        $log.debug("got getJobRunlog") ;
     
         })
    };



    
}


})();