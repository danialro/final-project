app.controller('CarrotPageCtrl', ['$scope', 'carrotService', '$location', 'carrot', '$http','$rootScope', '$window', '$auth', function($scope, carrotService, $location, carrot, $http, $rootScope, $window, $auth){

  $scope.carrot = carrot; // defining that carrot is a specific carrotId from the carrot in resolve (app.js)
  // $scope.authenticate = authenticate;


  $scope.joinCarrot = function(carrot){

    carrotService.joinCarrot(carrot).then(function(){
      $location.path('/');
    })
  };


  $scope.connectFitbit = function() {
    carrotService.connectFitbit().then(function(result){
      // console.log("RESULT is", result.data.url)
      var wnd = window.open(result.data.url);
        setTimeout(function() {
          wnd.close();
        }, 30000);
        return false;
    })
  };


  // $scope.authenticate = function(provider) {
  //   $auth.authenticate(provider)
  //     .then(function(response) {
  //       console.log(response);
  //       $rootScope.currentUserToken = response.data.satellizer_token;
  //       $window.localStorage.satellizer_token = response.data.satellizer_token;
  //       $location.path('/');
  //     })
  //     .catch(function(response) {
  //       if (response.error) {
  //         $scope.messages = {
  //           error: [{ msg: response.error }]
  //         };
  //       } else if (response.data) {
  //         $scope.messages = {
  //           error: [response.data]
  //         };
  //       }
  //     });
  // }


}]);