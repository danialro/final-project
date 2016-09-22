app.controller('MainCtrl', ['$scope', 'carrotService', function($scope, carrotService){

  $scope.carrots = carrotService.carrots; // definition for carrot in carrots from service

  

}]);