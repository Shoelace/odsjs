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
    url:         '/job/details',
    templateUrl: 'jobdetails.html'
  }).state('job.notifications', {
    url:         '/job/notifications',
    controller: 'SettingsCtrl',
    templateUrl: 'user/settings/settings.html'
  }).state('job.arguments', {
    url:         '/job/arguments',
    template: '<div>Settings nested route 1</div>'
  }).state('job.properties', {
    url:         '/job/properties',
    template: '<div>Settings nested route 2</div>'
  }).state('job.runlog', {
    url:         '/job/runlog',
    template: '<div>Settings nested route 2</div>'
  }).state('job.runlog.log4', {
    url:         '/log4',
    template: '<div>Settings nested route 2</div>'
  });
}]);
/*
odsjsApp.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);
*/