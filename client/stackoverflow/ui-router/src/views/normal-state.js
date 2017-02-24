app.controller('normal', function($scope, $state) {
    $scope.test = 'Normal State';

    $scope.gotoAbstract = function() {
        $state.go('abstract.sub');
    }
});