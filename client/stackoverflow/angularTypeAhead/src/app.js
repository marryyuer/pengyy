
var app = angular.module('app', ['ngAnimate', 'ui.bootstrap']);
app.controller('myCtrl', function ($scope, $http) {
    $scope.selected = '';

    $scope.contries = [{
        name: "China",
        value: 'Beijing,China'
    },{
        name: "America",
        value: "New York,America"
    },{
        name: "Japan",
        value: "Tokyo,Japan"
    }];

    $scope.getCountry = function (val) {
        // var urlStr = "https://google.co.jp/search?q="
        //     + val;
        
        var results = $scope.contries.filter(item => {
            return item.name.toLowerCase().indexOf(val.toLowerCase()) >= 0 ? item : null;
        });

        return results.length === 0 ? null : results; 
    }

    $scope.countryTypeAheadLabel = function (country) {
        if (country == null || country == undefined)
            return;

        if (country.name == '' || country.name == undefined) {
            return '';
        }

        var label = country.name + " - " + country.value;
        return label;
    }
});
