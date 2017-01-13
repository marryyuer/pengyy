var loadtest = require('loadtest');
var expect = require('chai').expect;

suite('Stress Test', function() {
    test('HomePage should handle 100 request in a second.', function(done) {
        var options = {
            url: 'http://localhost:3000',
            concurrency: '4',
            maxRequesta: 100
        };

        loadtest.loadTest(options, function(err, result) {
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
        });
    });
});