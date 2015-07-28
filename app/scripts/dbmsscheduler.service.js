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
            
        $http.get("get_oracle_data.php?sqlStr="
        + "select owner,job_name, job_style, program_owner,program_name, job_type, job_action,number_of_arguments, schedule_name, schedule_type, start_date, repeat_interval, enabled,state, run_count, last_start_date, last_run_duration, next_run_date, logging_level, EVENT_QUEUE_OWNER, EVENT_QUEUE_NAME,EVENT_QUEUE_AGENT,EVENT_CONDITION,FILE_WATCHER_OWNER, FILE_WATCHER_NAME " +
          "from all_scheduler_jobs order by owner desc")
        .success(function(response){
            angular.copy(response, _jobData); 
   
        })
        .error(function(){
        });

      }

 
    var _addNewMovie = function(movie){
        _movies.splice(0, 0, movie);
    }
 
    return{
        jobs: _jobData,
        getJobList: _getJoblist
    };
    
    };
        
        
})();
