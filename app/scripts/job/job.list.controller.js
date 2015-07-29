/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    
    angular.module('odsjs').controller('odsjsAppJobNtfnCtrl',
    ['$scope','$stateParams','$state','$log','dbmsschedulerService',
    function($scope,$stateParams,$state,$log,dbmsschedulerService){
        
        console.log("odsjsAppJobNtfnCtrl");
        
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



angular.module('odsjs.job').controller('job.list.controller',
    ['$scope','$stateParams','$state','$log','dbmsschedulerService',
    function($scope,$stateParams,$state,$log,dbmsschedulerService){
        
        $scope.currentJob = {};
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


        $scope.jobData=dbmsschedulerService.jobs;
        dbmsschedulerService.getJobList();
        
        
        $scope.dochangeselection = function(){

            if ($scope.currentJob){
            if ($state.current.name=='job'){
                //$state.go('.details');
                 $state.go( '.details', {jowner: $scope.currentJob.OWNER, jname: $scope.currentJob.JOB_NAME} );
            }else{
                 $state.go( '.', {jowner: $scope.currentJob.OWNER, jname: $scope.currentJob.JOB_NAME} );
                
            }
            
            }else{
                $state.go('job',null,{reload:true});
            }
        }

        
                /*
        // fired when table rows are selected
$scope.$watch('displayJobData', function(row, oldrow) {
  // get selected row
   $scope.hasSelection = false;

   if ( row ) {
        row.filter(function(r) {
                        if (r.isSelected) {
                            $scope.currentJob = r;
                            $scope.hasSelection = true;
                          $log.debug('selected'+r);
                          $state.go( '.', {jowner: r.OWNER, jname: r.JOB_NAME} );
                        }
                    })
    }
  }, true);
*/

    }]);      

})();