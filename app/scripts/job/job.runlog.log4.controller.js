/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    

angular.module('odsjs.job').controller('job.runlog.log4.controller',JobRunlogLog4Controller);



JobRunlogLog4Controller.$inject =    ['$stateParams','$state','$log','dbmsschedulerService'];

function JobRunlogLog4Controller ($stateParams,$state,$log,dbmsschedulerService){
  var vm = this;
  vm.jobLog4=dbmsschedulerService.jobLog4;
  
       activate();

    function activate() {
        $log.debug("activate.. state:"+JSON.stringify($stateParams)) ;
        return dbmsschedulerService.getJobLog4($stateParams).then(function(response){
        $log.debug("got getJobRunlog.. state:"+$stateParams) ;
     
         })
    };



    
}


})();