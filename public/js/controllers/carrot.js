(function() {
angular.module('MyApp')
    .controller('CarrotCtrl', CarrotCtrl);

CarrotCtrl.$inject = ['$scope', 'Carrot'];

function CarrotCtrl($scope, Carrot) {
    // var ctrl = this;
    $scope.sendContactForm = sendContactForm;

    function sendContactForm() {
        Carrot.send($scope.contact)
            .then(function(response) {
                $scope.messages = {
                    success: [response.data]
                };
            })
            .catch(function(response) {
                $scope.messages = {
                    error: Array.isArray(response.data) ? response.data : [response.data]
                };
            });
    }
}
})();