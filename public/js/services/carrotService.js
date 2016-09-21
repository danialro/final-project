app.factory('carrotService', ['$http', function($http) {

console.log("inside the carrot service");

  var carrotService = {
    carrots: [],

    getAll: function() {
      return $http.get('/carrots').then(function(data) {
  
        angular.copy(data.data, carrotService.carrots);
      });
    },


    postCarrot: function(data) {
      return $http.post('/carrots', data);
    }

  
}

  return carrotService;

}]);