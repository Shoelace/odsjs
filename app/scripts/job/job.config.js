/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/


angular.module('odsjs.job').config( function($stateProvider, $urlRouterProvider) {
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
        
