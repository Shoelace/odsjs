/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
*/
(function() {
    'use strict';
    

angular.module('odsjs.job').config( jobConfig);

jobConfig.$inject = ['$stateProvider','$urlRouterProvider'];


function jobConfig($stateProvider, $urlRouterProvider) {
    console.debug('config b.job');
    
    // $urlRouterProvider.when("/job", "/job/list");
      $stateProvider
            .state('app.job', {
            url: "/job",
            views: {
                "viewA": {
                    controller: 'job.list.controller',
                    controllerAs: 'vm',
                    templateUrl: 'job.list.html'
                },
                "viewB": {
                    template: "route1.viewB"
                }
            }
        })
        .state('app.job.details', {
            url: "/:jowner/:jname/details",
            views: {
                "viewc": {
                    controller: 'job.detail.controller',
                    templateUrl: 'job.details.html'
                },
                "viewB@": {
                    template: 'selcted view b'
                    //controller: 'odsjsAppJobListCtrl'
                }
            }
        })        
        .state('app.job.notifications', {
            url: "/:jowner/:jname/notifications",
            views: {
                "viewc": {
                     controller: 'job.notification.controller',
                     templateUrl: 'job.notification.html'
                },
                "viewB@": {
                    template: 'selcted notifications view '
                    //controller: 'odsjsAppJobListCtrl'
                }
            }
        })        
        .state('app.job.arguments', {
            url: "/:jowner/:jname/arguments",
            views: {
                "viewc": {
                     controller: 'job.arguments.controller',
                     templateUrl: 'job.arguments.html'
                },
                "viewB@": {
                    template: 'selcted arguments view '
                    //controller: 'odsjsAppJobListCtrl'
                }
            }
        })       
         .state('app.job.properties', {
            url: "/:jowner/:jname/properties",
            views: {
                "viewc": {
                    // controller: 'job.arguments.controller',
                     templateUrl: 'job.properties.html'
                },
                "viewB@": {
                    template: 'selcted properties view '
                }
            }
        })   
        .state('app.job.runlog', {
            url: "/:jowner/:jname/runlog",
            views: {
                "viewc": {
                     controller: 'job.runlog.controller',
                     controllerAs: 'vm',
                     templateUrl: 'job.runlog.html'
                },
                "viewB@": {
                    template: 'selcted runlog view '
                }
            }
        })
        .state('app.job.runlog.log4', {
                url:         '/log4/{log4id}',
                templateUrl: 'job.runlog.log4.html',
                controller: 'job.runlog.log4.controller',
                controllerAs: 'vm'
        })
        ;
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
};
        
})();