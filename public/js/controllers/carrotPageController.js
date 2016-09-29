app.controller('CarrotPageCtrl', ['$scope', 'carrotService', '$location', 'carrot', '$http','$rootScope', '$window', '$auth', function($scope, carrotService, $location, carrot, $http, $rootScope, $window, $auth){

  $scope.carrot = carrot; // defining that carrot is a specific carrotId from the carrot in resolve (app.js)
  // $scope.authenticate = authenticate;
  $scope.currentUser = $rootScope.currentUser;


  $scope.joinCarrot = function(carrot){

    carrotService.joinCarrot(carrot).then(function(){
      alert("hiiiii your are in carrot")
      $location.path('/');
      });
    
  };

// connect to Runkeeper API
  $scope.connectRunkeeper = function(){

    var wnd = window.open("https://runkeeper.com/apps/authorize?client_id=499eec7e74084561ac8cd8018fd090f2&redirect_uri=http://localhost:3000/getcode/&response_type=code");
      setTimeout(function() {
        wnd.close();
      }, 10000);
      return false;
  };


  $scope.userInCarrot = function(currentUser) {
  if (currentUser === undefined) {
    $location.path('/login');    
  }
    else {
      if (carrotService.carrotsParticipants.indexOf(String(currentUser._id)) >= 0){
        return true;
      }
      else {
        return false;
      }
    };
  }


  // $scope.userHasToken = function(currentUser){

  //   if (carrotService.userToken.indexOf(String(currentUser._id)) >= 0){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // };

  
// connect to Fitbit API
  // $scope.connectFitbit = function() {
  //   carrotService.connectFitbit().then(function(result){
  //     // console.log("RESULT is", result.data.url)
  //     var wnd = window.open(result.data.url);
  //       setTimeout(function() {
  //         wnd.close();
  //       }, 10000);
  //       return false;
  //   })
  // };


}]);