// Ionic dokkermedia App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'dokkermedia' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dokkermedia', ['ionic', 'ngCordova', 'dokkermedia.controllers', 'dokkermedia.services', 'dokkermedia.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.video', {
      url: '/video',
      views: {
        'tab-video': {
          templateUrl: 'templates/video.html',
          controller: 'VideoCtrl'
        }
      }
    })
    

  .state('tab.arkiv', {
    url: '/arkiv',
    views: {
      'tab-arkiv': {
        templateUrl: 'templates/arkiv.html',
        controller: 'ArkivCtrl'
      }
    }
  })


  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
