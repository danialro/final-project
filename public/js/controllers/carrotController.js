app.controller('CarrotCtrl', ['$scope', 'carrotService', '$location', '$http', function($scope, carrotService, $location, $http){


  var image;
    //Ties our uploader to our cloud name
  cloudinary.setCloudName('dari0wgwe');

  //creates widget frame on button click, sends selected images to Cloudinary storage and back
  cloudinary.applyUploadWidget(document.getElementById('image_uploader'), 
  { upload_preset: 'StickyCarrot'}, 
  function(error, result) {
  image = result[0].secure_url;

    //the 'result' perameter is the returned image back from Cloudinary that you uploaded.
    //Send this 'result' anywhere in your project you would like to send it!
    
  });
  // submitting a new carrot
  $scope.submitCarrot = function () {

    var newCarrot = {
      carrotName: $scope.carrotName,
      weeklyGoal: $scope.weekly_goal,
      entrance_fee: $scope.entrance_fee,
      description: $scope.description,
      image_upload: image
    }

    carrotService.postCarrot(newCarrot).then(function(){
      $location.path('/'); // after creating a new carrot, will take you to home page
    });
  };

}]);



