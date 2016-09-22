app.controller('CarrotPageCtrl', ['$scope', 'carrotService', '$location', 'carrot', '$http', function($scope, carrotService, $location, carrot, $http){

  $scope.carrot = carrot; // defining that carrot is a specific carrotId from the carrot in resolve (app.js)

  $scope.joinCarrot = function(carrot){

    carrotService.joinCarrot(carrot).then(function(){
      $location.path('/');
    })
  };




}]);