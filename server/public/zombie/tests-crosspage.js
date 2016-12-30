var Browser = require('zombie');
var assert = require('chai').assert;

var browser;

suite('cross page test', function() {
    setup(function() {
        browser = new Browser();
    });

    test('requesting a group rate quote from the life page should populate the referrer field', function(done) {
        var referrer = 'http://localhost:3000/life';
        browser.visit(referrer, function() {
            browser.clickLink('.age28', function() {
                assert(browser.field('referrer').value === referrer);
                done();
            });
        });
    });

    // test('requesting a group rate quote from the life page should populate the referrer field', function(done) {
    //     var referrer = 'http://localhost:3000/life';
    //     browser.visit(referrer, function() {
    //         browser.clickLink('.27', function() {
    //             assert(browser.field('referrer').value === referrer);
    //             done();
    //         });
    //     });
    // });

    test('visiting the "28" page dirctly should result in an empty referrer field', function(done){
        browser.visit('http://localhost:3000/life/28', function(){
            assert(browser.field('referrer').value === '');
            done();
        });
    });
});
