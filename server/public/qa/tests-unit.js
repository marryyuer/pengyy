var fortune = require('../../lib/fortune');
var expect = require('chai').expect;

suite('fortune cookie test', function() {
    test('getFotune() should return a fortune', function() {
        expect(typeof fortune.getFortune() === 'string');
    });
});