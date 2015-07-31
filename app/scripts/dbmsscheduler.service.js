/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    
angular
    .module('odsjs')
    .factory('dbmsschedulerService', dbmsschedulerService);
    

dbmsschedulerService.$inject =     ['$http','$log'];
        
function dbmsschedulerService($http,$log){
  
    
      var _jobData=[];
      
      var _getJoblist = function(){
            
        return $http.get("get_oracle_data.php?sqlStr="
        + "select owner,job_name, job_style, program_owner,program_name, job_type, job_action,number_of_arguments, schedule_name, schedule_type, start_date, repeat_interval, enabled,state, run_count, last_start_date, last_run_duration, next_run_date, logging_level, EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME,EVENT_QUEUE_AGENT,EVENT_CONDITION,FILE_WATCHER_OWNER, FILE_WATCHER_NAME " +
          "from dba_scheduler_jobs order by owner desc")
        .success(function(response){
            angular.copy(response, _jobData); 
   
        })
        .error(function(){
        });

      }
/*
      var _jobDetail=[];
      
      var _getJobDetail = function($param){
            
        $http.get("get_oracle_data.php?sqlStr="
        + "select owner,job_name, job_style, program_owner,program_name, job_type, job_action,number_of_arguments, schedule_name, schedule_type, start_date, repeat_interval, enabled,state, run_count, last_start_date, last_run_duration, next_run_date, logging_level, EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME,EVENT_QUEUE_AGENT,EVENT_CONDITION,FILE_WATCHER_OWNER, FILE_WATCHER_NAME " +
          "from all_scheduler_jobs order by owner desc")
        .success(function(response){
            angular.copy(response, _jobDetail); 
   
        })
        .error(function(){
        });

      }
      */
var _jobNtfn=[];
      
      var _getJobNtfn = function($params){
            
        var  jobnotificationquery = "select recipient,sender, subject, body, filter_condition, LISTAGG(event, ', ') within group (order by EVENT_FLAG) events "
                 +" from DBA_SCHEDULER_NOTIFICATIONS " +
                  " where 1=1 " +
                  " and owner = '" + $params.jowner  + "'" +
                  " and job_name = '" + $params.jname  + "'" +
                  " group by owner,job_name, job_subname, recipient,sender, subject, body, filter_condition"
          ;
		return $http.get("get_oracle_data.php?sqlStr="
                + jobnotificationquery)
                .success(function(response){
            angular.copy(response, _jobNtfn); 
   
        })
        .error(function(){
        });
        

      }
 
var _jobArgs=[];
      
      var _getJobArgs = function($params){
            
        var  jobargsquery = "select argument_position, argument_name, argument_type , value, out_argument"
                 +" from dba_SCHEDULER_JOB_ARGS " +
                  " where 1=1 " +
                  " and owner = '" + $params.jowner  + "'" +
                  " and job_name = '" + $params.jname  + "'" +
                  " "
          ;
		return $http.get("get_oracle_data.php?sqlStr="
                + jobargsquery)
                .success(function(response){
            angular.copy(response, _jobArgs); 
   
        })
        .error(function(){
        });
        

      }
 
    return{
        jobs: _jobData,
        getJobList: _getJoblist
        /*,
        jobDetail: _jobDetail,
        getJobDetail: _getJobDetail*/
        ,jobNtfn: _jobNtfn,
        getJobNtfn: _getJobNtfn
        ,jobArgs: _jobArgs,
        getJobArgs: _getJobArgs
    };
    
    };
        
        
})();
