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
          }]
        }
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });

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
  });






