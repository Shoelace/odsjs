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

//var $orcl_host = 'http://localhost:8000/';
var $orcl_host = '';
var $orcl_get_url = $orcl_host + 'get_oracle_data2.php';
var $orcl_build_url = $orcl_host + 'build-api-oracle-procedures.php';

       var model= {}
   model['name'] = 'odsjs';
   model['queries'] = {};
   model['queries']['selectJobs'] = {'sql': `select owner,job_name
     from all_scheduler_jobs
     order by owner desc` };

   model['queries']['selectJobDetails'] = {'sql': `select owner,job_name, job_style
        , program_owner,program_name
        , job_type, job_action,number_of_arguments
        , schedule_name, schedule_type
        , start_date, repeat_interval, enabled,state, run_count
        , last_start_date, last_run_duration
        , next_run_date, logging_level
        , EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME ,EVENT_QUEUE_AGENT,EVENT_CONDITION
        , FILE_WATCHER_OWNER, FILE_WATCHER_NAME
     from all_scheduler_jobs
                   where 1=1
                   and owner = ?
                   and job_name = ?
     order by owner desc`
 , 'in' : ['jowner', 'jname']};

  model['queries']['selectNotifcations'] =
        { 'sql': `select recipient,sender, subject, body, filter_condition, LISTAGG(event, ', ') within group (order by EVENT_FLAG) events
                  from all_SCHEDULER_NOTIFICATIONS
                   where 1=1
                   and owner = ?
                   and job_name = ?
                   group by owner,job_name, job_subname, recipient,sender, subject, body, filter_condition`
       , 'in' : ['jowner', 'jname']
   };
    model['queries']['selectArgs'] =
            { 'sql': "select argument_position, argument_name, argument_type , value, out_argument"
                 +" from all_SCHEDULER_JOB_ARGS " +
                  " where 1=1 " +
                  " and owner = ?" +
                  " and job_name = ?" +
                  " "
                 , 'in' : ['jowner', 'jname']
   };
    model['queries']['selectRunlog'] =
            { 'sql': "select owner,job_name,job_subname, log_id, log_date, operation, status, additional_info "
                 +" from all_SCHEDULER_JOB_LOG " +
                  " where 1=1 " +
                  " and owner = ?" +
                  " and job_name = ?" +
                  " order by log_date desc"
                 , 'in' : ['jowner', 'jname']
   };

//    model['queries']['selectLog4'] =
//            { 'sql': "select logtimestamp, loggername, logmarker, logmessage "
//                 +" from log_table " +
//                  " where 1=1 " +
//                  " and logid = ?" +
//                  " order by logtimestamp asc"
//            , 'in' : ['log4id']
//   };

   $http.post($orcl_build_url,  model )
        .then(function(response){
            $log.debug("in then:"+response.data);
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

      var _jobDetail=[];

      var _getJobDetail = function($params){
       return $http.post($orcl_get_url +"?qryname=odsjs_pkg.selectJobDetails",$params)
        .then(function(response){
            $log.debug("_jobDetail:"+JSON.stringify(response));
            angular.copy(response.data[0], _jobDetail); //only 1 record expcted

            return _jobNtfn;
        });
    }


    var _jobNtfn=[];

      var _getJobNtfn = function($params){
       return $http.post($orcl_get_url +"?qryname=odsjs_pkg.selectNotifcations",$params)
        .then(function(response){
            $log.debug("_jobNtfn:"+JSON.stringify(response));
            angular.copy(response.data, _jobNtfn);

            return _jobNtfn;
        });


      }

var _jobArgs=[];

      var _getJobArgs = function($params){


         return $http.post($orcl_get_url + "?qryname=odsjs_pkg.selectArgs",$params)
        .then(function(response){
            $log.debug("_getJobArgs:"+JSON.stringify(response));

            //if (response.data )
                angular.copy(response.data, _jobArgs);

                return _jobArgs;
        });

      }

      var _jobRunlog=[];

      var _getJobRunlog = function($params){


         return $http.post($orcl_get_url + "?qryname=odsjs_pkg.selectRunlog",$params)
        .then(function(response){
            $log.debug("_getJobRunlog:"+JSON.stringify(response));

            //if (response.data )
                angular.copy(response.data, _jobRunlog);

                return _jobRunlog;
        });

      }
      var _jobLog4=[];

      //used to get only desired params from stateparams
      var cloneAndPluck = function(sourceObject, keys) {
    var newObject = {};
    keys.forEach(function(key) { newObject[key] = sourceObject[key]; });
    return newObject;
}


      var _getJobLog4 = function($params){


         return $http.post($orcl_get_url + "?qryname=odsjs_pkg.selectLog4",cloneAndPluck($params, model['queries']['selectLog4']['in'])) //{log4id: $params.log4id} )
        .then(function(response){
            $log.debug("_getJobLog4:"+JSON.stringify(response));

            //if (response.data )
                angular.copy(response.data, _jobLog4);

                return _jobLog4;
        });

      }

    return{
         jobs: _jobData,        getJobList: _getJoblist
        ,jobDetail: _jobDetail ,getJobDetail: _getJobDetail
        ,jobNtfn: _jobNtfn     ,getJobNtfn: _getJobNtfn
        ,jobArgs: _jobArgs     ,getJobArgs: _getJobArgs
        ,jobRunlog: _jobRunlog     ,getJobRunlog: _getJobRunlog
        ,jobLog4: _jobLog4     ,getJobLog4: _getJobLog4
    };

    };


})();
