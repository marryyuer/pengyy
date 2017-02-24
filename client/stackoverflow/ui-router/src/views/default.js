app.controller('default', function($state) {
    this.test = 'default';

    this.gotoNormal = function() {
        $state.go('normal');
    }
})