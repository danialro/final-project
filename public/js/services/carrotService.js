app.factory('carrotService', ['$http', function($http) {

  var carrotService = {
    carrots: [],
    carrotsParticipants: [],

    // get all carrots for home page
    getAll: function() {
      return $http.get('/carrots').then(function(data) {
  
        angular.copy(data.data, carrotService.carrots);
      });
    },

    // posting a new carrot
    postCarrot: function(data) {
      return $http.post('/carrots', data);
    },

    // get into one carrot page
    getOneCarrot: function(id) {
      return $http.get('/carrots/' + id).then(function(res){
        return res.data;
      });
    },

    // joining a carrot
    joinCarrot: function(carrot) {
      return $http.put('/carrots/' + carrot._id + '/join').success(function(data){
        // return data;
      });
    },

    getOneUser: function(user) {
      return $http.get('/users/' + user).then(function(res){
        return res.data;
      });
    },

    getUserToken: function(user) {
      return $http.get('/users/' + user + '/token').then(function(res){
        return carrotService.userToken = res.data;
      });
    },

    getCarrotParticipants: function(carrot) {
      return $http.get('/carrots/' + carrot + '/participants').then(function(res){
        return carrotService.carrotsParticipants = res.data;
      });
    },

    convertCodeToRunkeeperToken: function(code){
      return $http.post('/runkeepercodetotoken/', JSON.stringify({myCode: code}))
    }
    

}

  return carrotService;

}]);