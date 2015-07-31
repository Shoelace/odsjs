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
    .controller('AppController', AppController);
    

AppController.$inject =     [];
        
function AppController(){
  var vm = this;
  
   vm.tabData   = [
      {
        heading: 'Jobs',
        route:   '.job'
      },
      {
        heading: 'Programs',
        route:   '.program'
        ,disabled: true
      },
      {
        heading: 'windows',
        route:   '.window'
        ,disabled: true
      }
    ];
    
};
        
        
})();
