/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {
    'use strict';
    

angular.module('odsjs')
.config( appConfig );

appConfig.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider','$logProvider'];

function appConfig ($stateProvider, $urlRouterProvider,$locationProvider,$logProvider) {
    
    $logProvider.debugEnabled(true);
       console.debug('config a');
       
       $urlRouterProvider.otherwise("/");
        
//$locationProvider.html5Mode({enabled:true, requireBase:false});


    $stateProvider
    .state('app', {
    url:         '',
    controller: 'AppController',
    controllerAs: 'vm',
    templateUrl: 'app.html'
  })
                /*
        .state('index', {
            url: "",
            views: {
                "viewA": {
                    template: "index.viewA"
                },
                "viewB": {
                    template: "index.viewB"
                }
            }
        })
        
    */
        ;
        
    /*
  $stateProvider
          .state('scheduler', {  url: '', template: '<tabs data="tabData" type="pills"></tabs><div ui-view></div>'})
    .state('window', {
    url:         '/window',
    template: 'list of windows here'
  })/*.state('scheduler.joblist', {
    url:         '/job',
    controller: 'odsjsAppJobListCtrl',
    templateUrl: 'joblist.html'
  })
          /*.state('scheduler.jobdetails', {
    url:         '/job/{jowner}/{jname}/details',
    templateUrl: 'jobdetails.html',
    controller: 'odsjsAppJobListCtrl'
    
    
  }).state('scheduler.job.notifications', {
    url:         'notifications',
    templateUrl: 'jobnotifcations.html'
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
  })
  */
 ;
 
};


})();