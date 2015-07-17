/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var odsjsApp = angular.module('odsjs',
['smart-table','ui.bootstrap','shoelace.themeSwitcher','ui.router','ui.router.tabs']);


odsjsApp.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('job', {
    url:         '',
    controller: 'ExampleCtrl',
    templateUrl: 'example.html'
  }).state('job.details', {
    url:         '/job/{jowner}/{jname}/details',
    controller: 'odsjsAppCtrl',

    templateUrl: 'jobdetails.html'
  }).state('job.notifications', {
    url:         '/job/notifications',
    //controller: 'SettingsCtrl',
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
    url:         '/log4',
    templateUrl: 'jobdetails.html'
  });
}]);
/*
odsjsApp.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);
*/