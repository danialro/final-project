app.controller('MainCtrl', ['$scope', 'carrotService', function($scope, carrotService){

  $scope.carrots = carrotService.carrots;

  
  // $scope.addPost = function() {
  //   if ($scope.title === '') { return; }

  //   posts.create({ 
  //     title: $scope.title, 
  //     link: $scope.link
  //   });

  //   $scope.title = '';
  //   $scope.link = '';
  // }

  // $scope.incrementUpvotes = function(item) {
  //   posts.upvote(item);
  // }
}]);