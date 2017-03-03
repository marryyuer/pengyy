// Code goes here

var app = angular.module('app', ['ui.router'])
      .controller('parentCtrl', function($scope) {
        $scope.parent = 'AAAAAAA';
      })
      .controller('subCtrl', function($scope) {
        $scope.sub = 'BBBBBBB';
      });
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('parent', {
    url: '/parent',
    templateUrl: './src/parentTemplate.html',
    controller: 'parentCtrl'
  }).state('parent.sub', {
     url: '/parent/sub', 
     templateUrl: './src/subTemplate.html',
     controller: 'subCtrl'
  });
  $urlRouterProvider.when('', '/parent');
});