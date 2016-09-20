(function() {
angular.module('MyApp')
    .factory('Carrot', Carrot);

Carrot.$inject = ['$http'];

function Carrot($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
}
})();