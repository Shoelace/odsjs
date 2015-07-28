/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/


angular.module('odsjs').config( function($stateProvider, $urlRouterProvider) {
    console.debug('config b');
    
    // $urlRouterProvider.when("/job", "/job/list");
    /*
  $stateProvider
          .state('scheduler.job',{
        //abstract: true,
        url: '/job',
        // Note: abstract still needs a ui-view for its children to populate.
        // You can simply add it inline here.
        template: 'this is JOB..{{contacts}} ',
        controller: function($scope){
                $scope.contacts = ["Alice" ,"Bob" ];
            },
       views: {
        "viewA": { template: "index.viewA" },
        "viewB": { template: "index.viewB" }
      },
onEnter: function(){console.log("enter job");}
    })
    .state('scheduler.job.list', {
        // url will become '/contacts/list'
        url: '/list',
    controller: 'odsjsAppJobListCtrl',
    templateUrl: 'joblist.html'
    ,onEnter: function(){console.log("enter job list");}
  })
   .state('scheduler.job.details', {
    url:         '/{jowner}/{jname}/details',
    templateUrl: 'jobdetails.html',
    controller: 'odsjsAppJobListCtrl'
    ,onEnter: function(){console.log("enter job details");}
   }).state('scheduler.job.notifications', {
   url:         '/{jowner}/{jname}/notifications',
    controller: 'odsjsAppJobNtfnCtrl',
    templateUrl: 'jobnotifcations.html'
    ,onEnter: function(){console.log("enter job notification");}
  }).state('job.arguments', {
    url:         '/job/arguments',
    templateUrl: 'jobdetails.html'
  }).state('job.properties', {
    url:         '/job/properties',
    templateUrl: 'jobproperties.html'
  }).state('job.runlog', {
    url:         '/job/runlog',
    templateUrl: 'jobrunlog.html'
  }).state('job.runlog.log4', {
    url:         '/log4/{log4id}',
    //templateUrl: 'jobrunlog.html'
    template: 'welcome to log4'
  });
    */
});
        
angular.module('odsjs').controller('odsjsAppJobListCtrl',
    ['$scope','$stateParams','$state','$log','dbmsschedulerService',
    function($scope,$stateParams,$state,$log,dbmsschedulerService){
        
        $scope.currentJob = {};

   $log.debug("JobListCtrl state="+Object.keys($state));
   $log.debug("JobListCtrl state.params="+JSON.stringify($state.params));
   $log.debug("JobListCtrl state.current="+JSON.stringify($state.current));
   $log.debug("JobListCtrl state.href="+JSON.stringify($state.href));
   $log.debug("JobListCtrl state.transition="+JSON.stringify($state.transition));
   $log.debug("JobListCtrl state.transitionTo="+JSON.stringify($state.transitionTo));
   $log.debug("JobListCtrl stateparams="+JSON.stringify($stateParams));

       // $scope.jowner = $stateParams.jowner;
        //$scope.jname = $stateParams.jname;


        $scope.jobData=dbmsschedulerService.jobs;
        dbmsschedulerService.getJobList();

        

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


    }]);      

angular.module('odsjs').controller('odsjsAppJobNtfnCtrl',
    ['$scope','$http','$stateParams','$state','$log',
    function($scope,$http,$stateParams,$state,$log){
        
        console.log("odsjsAppJobNtfnCtrl");
        
   $log.debug("appctrl state="+Object.keys($state));
   $log.debug("appctrl state.params="+JSON.stringify($state.params));
   $log.debug("appctrl state.current="+JSON.stringify($state.current));
   $log.debug("appctrl state.href="+JSON.stringify($state.href));
   $log.debug("appctrl state.transition="+JSON.stringify($state.transition));
   $log.debug("appctrl state.transitionTo="+JSON.stringify($state.transitionTo));
   console.log("appctrl stateparams="+JSON.stringify($stateParams));


          $log.info("loading notifications")
          $scope.jobnotificationquery = "select recipient,sender, subject, body, filter_condition, LISTAGG(event, ', ') within group (order by EVENT_FLAG) events "
                 +" from ALL_SCHEDULER_NOTIFICATIONS " +
                  " where 1=1 " +
                  " and owner = '" + $stateParams.jowner  + "'" +
                  " and job_name = '" + $stateParams.jname  + "'" +
                  " group by owner,job_name, job_subname, recipient,sender, subject, body, filter_condition"
          ;
          
          $scope.jobnotificationData=[];
          $scope.jobnotificationReady = false;
		$http.get("get_oracle_data.php?sqlStr="
                + $scope.jobnotificationquery)
		.success(function(response){
                    $log.debug('response received')
			$scope.jobnotificationData=response;
                        $scope.jobnotificationReady = true;
			})
		.error(function(){
		});

        

    }]);      

angular.module('odsjs').controller('odsjsAppJobPropCtrl',
    ['$scope','$http','$stateParams','$state',
    function($scope,$http,$stateParams,$state){
        
        console.log("odsjsAppJobPropCtrl");
        
   console.log("PropCtrl state="+Object.keys($state));
   console.log("PropCtrl state.params="+JSON.stringify($state.params));
   console.log("PropCtrl state.current="+JSON.stringify($state.current));
   console.log("PropCtrl state.href="+JSON.stringify($state.href));
   console.log("PropCtrl state.transition="+JSON.stringify($state.transition));
   console.log("PropCtrl state.transitionTo="+JSON.stringify($state.transitionTo));
   console.log("PropCtrl stateparams="+JSON.stringify($stateParams));


         /* console.log("loading notifications")
          $scope.jobnotificationquery = "select recipient,sender, subject, body, filter_condition, LISTAGG(event, ', ') within group (order by EVENT_FLAG) events "
                 +" from ALL_SCHEDULER_NOTIFICATIONS " +
                  " where 1=1 " +
                  " and owner = '" + $stateParams.jowner  + "'" +
                  " and job_name = '" + $stateParams.jname  + "'" +
                  " group by owner,job_name, job_subname, recipient,sender, subject, body, filter_condition"
          ;
          
          $scope.jobnotificationData=[];
          $scope.jobnotificationReady = false;
		$http.get("get_oracle_data.php?sqlStr="
                + $scope.jobnotificationquery)
		.success(function(response){
                    console.log('response received')
			$scope.jobnotificationData=response;
                        $scope.jobnotificationReady = true;
			})
		.error(function(){
		});
        */

        

    }]);      



angular.module('odsjs').controller('odsjsAppJobDtlCtrl',
    ['$scope','$http','$stateParams','$log',
    function($scope,$http,$stateParams,$log){
        
   $log.debug("odsjsAppJobDtlCtrl stateparams="+JSON.stringify($stateParams));

         $scope.go = function(state) {
   $log.debug('odsjsAppJobDtlCtrl go');
      $state.go(state);
    };       
        
		$http.get("get_oracle_data.php?sqlStr="
                + "select owner,job_name, job_style, program_owner,program_name, job_type, job_action,number_of_arguments, schedule_name, schedule_type, start_date, repeat_interval, enabled,state, run_count, last_start_date, last_run_duration, next_run_date, logging_level, EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME,EVENT_QUEUE_AGENT,EVENT_CONDITION,FILE_WATCHER_OWNER, FILE_WATCHER_NAME " +
                  "from all_scheduler_jobs order by owner desc")
		.success(function(response){
		    $scope.jobData=response;
		})
		.error(function(){
		});
     
    }]);      

/*
odsjsApp.controller('odsjsAppJobDtlCtrl',
    ['$scope','$http','$stateParams',
    function($scope,$http,$stateParams){
        
   console.log("appctrl stateparams="+JSON.stringify($stateParams));

    

        $scope.jobData=[];
        $scope.programData=[];
        $scope.joblogData=[];
        
        
		$http.get("get_oracle_data.php?sqlStr="
                + "select owner,job_name, job_style, program_owner,program_name, job_type, job_action,number_of_arguments, schedule_name, schedule_type, start_date, repeat_interval, enabled,state, run_count, last_start_date, last_run_duration, next_run_date, logging_level, EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME,EVENT_QUEUE_AGENT,EVENT_CONDITION,FILE_WATCHER_OWNER, FILE_WATCHER_NAME " +
                  "from all_scheduler_jobs order by owner desc")
		.success(function(response){
		    $scope.jobData=response;
                    if ($scope.jobData.length == 1)
                        $scope.currentJob = $scope.jobData[0] ;
                        $scope.loaddata();
		})
		.error(function(){
		});
        
        $scope.loaddata = function(){
            if($scope.currentJob){
             $scope.loadprogram($scope.currentJob);
             $scope.loadjoblog($scope.currentJob);
             $scope.loadlog4($scope.currentJob);
             $scope.loadnotifications($scope.currentJob);
         }
        }

      $scope.loadprogram = function(jobdetails) {
          
          if( ! jobdetails || !jobdetails.PROGRAM_OWNER )
              return;
          
          $scope.progquery = "select owner, program_name, enabled, program_type, program_action, number_of_arguments "
                + " from dba_SCHEDULER_PROGRAMS " +
                  " where 1=1 " +
                  " and owner = '" + jobdetails.PROGRAM_OWNER  +"'" +
                  " and program_name = '" + jobdetails.PROGRAM_NAME  +"'" +
                  ""
          ;
          
          
          $scope.programReady = false;
		$http.get("get_oracle_data.php?sqlStr="
                + $scope.progquery)
		.success(function(response){
                    console.log('response received')
			$scope.programData=response;
                        $scope.programReady = true;
			})
		.error(function(){
		});
	}
        
        $scope.loadjoblog = function(jobdetails) {

           if( ! jobdetails || !jobdetails.OWNER )
              return;
          $scope.joblogquery = "select log_id,log_date, operation,status, user_name "
                 +" from ALL_SCHEDULER_JOB_LOG " +
                  " where 1=1 " +
                  " and owner = '" + jobdetails.OWNER  +"'" +
                  " and job_name = '" + jobdetails.JOB_NAME  +"'" +
                  " order by log_date"
          ;
          
          $scope.joblogReady = false;
		$http.get("get_oracle_data.php?sqlStr="
                + $scope.joblogquery)
		.success(function(response){
                    console.log('response received')
			$scope.joblogData=response;
                        $scope.joblogReady = true;
			})
		.error(function(){
		});
$scope.jobrundetailquery = "select * "
                 +" from ALL_SCHEDULER_JOB_RUN_DETAILS " +
                  " where 1=1 " +
                  " and owner = '" + jobdetails.OWNER  +"'" +
                  " and job_name = '" + jobdetails.JOB_NAME  +"'" +
                  " order by log_date"
          ;
          
		$http.get("get_oracle_data.php?sqlStr="
                + $scope.jobrundetailquery)
		.success(function(response){
                    console.log('response received')
			$scope.jobrundetailData=response;
			})
		.error(function(){
		});        
	}
        
         $scope.loadlog4 = function(jobdetails) {
          
          $scope.joblog4query = "select logtimestamp,loggername, loglevel,logmarker, loglocation,logmessage "
                 +" from log_table " +
                  " where 1=1 " +
                  " and logid = " + jobdetails.LOG_ID  +
                  " order by logtimestamp"
          ;
          
          $scope.joblog4Data=[];
          $scope.joblog4Ready = false;
		$http.get("get_oracle_data.php?sqlStr="
                + $scope.joblog4query)
		.success(function(response){
                    console.log('response received')
			$scope.joblog4Data=response;
                        $scope.joblog4Ready = true;
			})
		.error(function(){
		});
	}
    
    $scope.loadnotifications = function(jobdetails) {
          console.log("loading notifications")
          $scope.jobnotificationquery = "select recipient,sender, subject, body, filter_condition, LISTAGG(event, ', ') within group (order by EVENT_FLAG) events "
                 +" from ALL_SCHEDULER_NOTIFICATIONS " +
                  " where 1=1 " +
                  " and owner = '" + jobdetails.OWNER  + "'" +
                  " and job_name = '" + jobdetails.JOB_NAME  + "'" +
                  " group by owner,job_name, job_subname, recipient,sender, subject, body, filter_condition"
          ;
          
          $scope.jobnotificationData=[];
          $scope.jobnotificationReady = false;
		$http.get("get_oracle_data.php?sqlStr="
                + $scope.jobnotificationquery)
		.success(function(response){
                    console.log('response received')
			$scope.jobnotificationData=response;
                        $scope.jobnotificationReady = true;
			})
		.error(function(){
		});
	}
    }]);      

 */

