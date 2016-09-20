(function() {
angular.module('MyApp')
    .controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$location', '$window', '$auth'];

function HeaderCtrl($scope, $location, $window, $auth) {
    // var ctrl = this;
    $scope.isActive = isActive;
    $scope.isAuthenticated = isAuthenticated;
    $scope.logout = logout;

    function isActive(viewLocation) {
        return viewLocation === $location.path();
    }

    function isAuthenticated() {
        return $auth.isAuthenticated();
    }

    function logout() {
        $auth.logout();
        delete $window.localStorage.user;
        $location.path('/');
    }

}
})();
