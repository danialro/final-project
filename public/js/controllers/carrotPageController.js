app.controller('CarrotPageCtrl', ['$scope', 'carrotService', '$location', '$routeParams', '$http', function($scope, carrotService, $location, $routeParams, $http){

  carrotService.getOneCarrot($routeParams.id);
  
  $scope.carrot = carrot;



}]);