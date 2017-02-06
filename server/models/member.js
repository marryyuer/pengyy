var mongoose = require('mongoose');

var memberSchema = mongoose.Schema({
    name: String,
    sex: String,
    description: String,
    age: Number,
    salary: Number,
    available: Boolean,
    experiences: Number
});

memberSchema.methods.getDisplayPrice = function() {
    return '$' + (this.priceInCents / 100).toFixed(2);
};
var Member = mongoose.model('Member', memberSchema);
module.exports = Member;