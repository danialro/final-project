app.controller('CarrotCtrl', ['$scope', 'carrotService', function($scope, carrotService){

console.log("inside the carrot controller");


  $scope.submitCarrot = submitCarrot;

  function submitCarrot() {

    var newCarrot = {
      carrotName: $scope.carrotName,
      weeklyGoal: $scope.weekly_goal,
      entrance_fee: $scope.entrance_fee,
      description: $scope.description
    }

    carrotService.postCarrot(newCarrot);
  }




}]);



