/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var odsjsApp = angular.module('odsjs',
['smart-table','ui.bootstrap','shoelace.themeSwitcher','ui.router','ui.router.tabs']);


odsjsApp.config(['$stateProvider', function($stateProvider) {
  $stateProvider
          .state('scheduler', { url: '', template: '<tabs data="tabData" type="pills"></tabs><div ui-view></div>'})
    .state('window', {
    url:         '/window',
    template: 'list of windows here'
  }).state('scheduler.joblist', {
    url:         '/job/list',
    controller: 'odsjsAppJobCtrl',
    templateUrl: 'joblist.html'
  }).state('scheduler.jobdetails', {
    url:         '/job/{jowner}/{jname}/details',
    templateUrl: 'jobdetails.html',
    controller: 'odsjsAppJobCtrl'
    
    
  }).state('job.notifications', {
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
  });
}]);
/*
odsjsApp.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);
*/