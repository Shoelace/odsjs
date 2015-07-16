/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/

odsjsApp.controller('odsjsAppCtrl',
    ['$scope','$http',
    function($scope,$http){
        
        $scope.jobData=[];
        $scope.programData=[];
        $scope.joblogData=[];
        
        
		$http.get("get_oracle_data.php?sqlStr="
                + "select owner,job_name, job_style, program_owner,program_name, job_type, job_action,number_of_arguments, schedule_name, schedule_type, start_date, repeat_interval, enabled,state, run_count, last_start_date, last_run_duration, next_run_date, logging_level, EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME,EVENT_QUEUE_AGENT,EVENT_CONDITION,FILE_WATCHER_OWNER, FILE_WATCHER_NAME " +
                  "from all_scheduler_jobs order by owner desc")
		.success(function(response){
		    $scope.jobData=response;
                    if ($scope.jobData.length == 1)
                        $scope.currentJob = $scope.jobData[0] 
		})
		.error(function(){
		});

      $scope.loadprogram = function(jobdetails) {
          

          $scope.loadjoblog(jobdetails);

          
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
    
    
    }]);        