var app = angular.module('MyApp', ['ngRoute', 'satellizer']);
  app.config(function($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'MainCtrl',
        resolve: {
          carrotPromise: ['carrotService', function(carrotService){
            return carrotService.getAll();
          }]
        }
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/create_carrot', {
        templateUrl: 'partials/create_carrot.html',
        controller: 'CarrotCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/carrots/:id', {
        templateUrl: 'partials/carrot_page.html',
        controller: 'CarrotPageCtrl',
        resolve: {

          carrot: ['carrotService', '$route', function(carrotService, $route){
            return carrotService.getOneCarrot($route.current.params.id);
          }],

          // currentUser: ['carrotService', '$route', function(carrotService, $route){
          //   return carrotService.getOneUser($route.current.params.id);
          // }],

          carrotParticipants: ['carrotService', '$route', function(carrotService, $route){
            return carrotService.getCarrotParticipants($route.current.params.id);
          }]
        }
      })
      .when('/getcode', {
        template: '<div>YO YO THIS IS THE CODE HANDLER</div>',
        controller:  ['$scope','$routeParams','carrotService', function($scope, $routeParams,carrotService) {
          var param1 = $routeParams.code;
          carrotService.convertCodeToRunkeeperToken(param1)
        }]
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '336919469976326',
      redirectUri: 'http://2c0d2f5e.ngrok.io/auth/facebook/callback'
    });

    // $authProvider.loginUrl = '/carrots/:id';
    // $authProvider.fitbit({
    //   url: '/auth/fitbit',
    //   clientId: '227ZM6',
    //   redirectUri: '/auth/fitbit/callback'
    // });

    function skipIfAuthenticated($location, $auth) { // if user is logged in, will take him to the page
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) { // if user isn't logged in, will take him to signup/login page
      if (!$auth.isAuthenticated()) {
        $location.path('/signup');
      }
    }
  })

  app.run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
    // else if ($window.localStorage.satellizer_token) {
    //   $rootScope.currentUserToken = $window.localStorage.satellizer_token;
    // }
  });






