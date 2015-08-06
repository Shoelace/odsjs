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
    

       var model= {}
   model['name'] = 'odsjs';
   model['queries'] = {};
   model['queries']['selectJobs'] = {'sql': `select owner,job_name, job_style
        , program_owner,program_name
        , job_type, job_action,number_of_arguments
        , schedule_name, schedule_type
        , start_date, repeat_interval, enabled,state, run_count
        , last_start_date, last_run_duration
        , next_run_date, logging_level
        , EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME ,EVENT_QUEUE_AGENT,EVENT_CONDITION
        , FILE_WATCHER_OWNER, FILE_WATCHER_NAME
     from dba_scheduler_jobs
     order by owner desc` };

  model['queries']['selectNotifcations'] = 
        { 'sql': `select recipient,sender, subject, body, filter_condition, LISTAGG(event, ', ') within group (order by EVENT_FLAG) events 
                  from DBA_SCHEDULER_NOTIFICATIONS 
                   where 1=1 
                   and owner = ? 
                   and job_name = ? 
                   group by owner,job_name, job_subname, recipient,sender, subject, body, filter_condition`
       , 'in' : ['jowner', 'jname']
   };   
    model['queries']['selectArgs'] = 
            { 'sql': "select argument_position, argument_name, argument_type , value, out_argument"
                 +" from dba_SCHEDULER_JOB_ARGS " +
                  " where 1=1 " +
                  " and owner = ?" +
                  " and job_name = ?" +
                  " "
                 , 'in' : ['jowner', 'jname']
   };  

       
   
   $http.post("build-api-oracle-procedures.php",  model )
        .then(function(response){
            $log.debug("in then"+response);
    //$scope.hello = response.data;
    //$scope.header = response.data.header;
    //$scope.body = response.data.body;
            //angular.copy(, ); 
   
        });
        
  
    
      var _jobData=[];
      
      var _getJoblist = function(){
            $log.debug("_getJoblist");
            //function(successCallback, errorCallback, notifyCallback) {
        return $http.get("get_oracle_data2.php?qryname=odsjs_pkg.selectJobs")
        .then(function(response){
            $log.debug("_getJoblist:"+JSON.stringify(response));
            angular.copy(response.data, _jobData); 
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

          
       return $http.post("get_oracle_data2.php?qryname=odsjs_pkg.selectNotifcations",$params)
        .then(function(response){
            $log.debug("_jobNtfn:"+JSON.stringify(response));
            angular.copy(response.data, _jobNtfn); 
            
            return _jobNtfn;
        });
        /*
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
          */
        

      }
 
var _jobArgs=[];
      
      var _getJobArgs = function($params){

          
         return $http.post("get_oracle_data2.php?qryname=odsjs_pkg.selectArgs",$params)
        .then(function(response){
            $log.debug("_getJobArgs:"+JSON.stringify(response));
            
            //if (response.data )
                angular.copy(response.data, _jobArgs); 
                
                return _jobArgs;
        });
        /*var  jobargsquery = "select argument_position, argument_name, argument_type , value, out_argument"
                 +" from dba_SCHEDULER_JOB_ARGS " +
                  " where 1=1 " +
                  " and owner = '" + $params.jowner  + "'" +
                  " and job_name = '" + $params.jname  + "'" +
                  " "
          ;
		return $http.get("build-api-oracle-procedures.php")
                .success(function(response){
            angular.copy(response, _jobArgs); 
   
        })
           
          
        .error(function(){
        });
          */
        

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
