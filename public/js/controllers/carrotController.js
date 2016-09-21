app.controller('CarrotCtrl', ['$scope', 'carrotService', '$location', '$http', function($scope, carrotService, $location, $http){



  $scope.submitCarrot = function () {

    var newCarrot = {
      carrotName: $scope.carrotName,
      weeklyGoal: $scope.weekly_goal,
      entrance_fee: $scope.entrance_fee,
      description: $scope.description
    }

    carrotService.postCarrot(newCarrot).then(function(){
      $location.path('/');
    });
  }

  $scope.carrot = carrot



}]);



