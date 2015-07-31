/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    

angular.module('odsjs.job').controller('job.list.controller',JobListController);



JobListController.$inject =    ['$stateParams','$state','$log','dbmsschedulerService'];

function JobListController ($stateParams,$state,$log,dbmsschedulerService){
  var vm = this;
  vm.jobData=dbmsschedulerService.jobs;
  
  vm.dochangeselection = dochangeselection;
   
       activate();
   
    //$scope.currentJob = {};
/*
$log.debug("JobListCtrl state="+Object.keys($state));
$log.debug("JobListCtrl state.params="+JSON.stringify($state.params));
$log.debug("JobListCtrl state.current="+JSON.stringify($state.current));
$log.debug("JobListCtrl state.href="+JSON.stringify($state.href));
$log.debug("JobListCtrl state.transition="+JSON.stringify($state.transition));
$log.debug("JobListCtrl state.transitionTo="+JSON.stringify($state.transitionTo));
$log.debug("JobListCtrl stateparams="+JSON.stringify($stateParams));
*/
   // $scope.jowner = $stateParams.jowner;
    //$scope.jname = $stateParams.jname;



    function activate() {
        return dbmsschedulerService.getJobList().then(function(response){
        $log.debug("got joblist") ;

        if( $stateParams.jowner !== '' && $stateParams.jname !== ''){
        $log.debug("do selection:"+$stateParams.jname ) ;
               vm.jobData.filter(function(r) {
                     // $log.debug('checking:'+JSON.stringify(r));
                     // $log.debug('r.owner:'+r.OWNER);
                    if (r.OWNER === $state.params.jowner && r.JOB_NAME === $state.params.jname  ) {
                       vm.currentJob = r;
                      $log.debug('selected'+r);
//                          $state.go( '.', {jowner: r.OWNER, jname: r.JOB_NAME} );
                    }
                })
        }
    })
    };


   function dochangeselection(){

        if (vm.currentJob){
        if ($state.current.name=='job'){
            //$state.go('.details');
             $state.go( '.details', {jowner: vm.currentJob.OWNER, jname: vm.currentJob.JOB_NAME} );
        }else{
             $state.go( '.', {jowner: vm.currentJob.OWNER, jname: vm.currentJob.JOB_NAME} );

        }

        }else{
            $state.go('job',null,{reload:true});
        }
    }

    
}


})();