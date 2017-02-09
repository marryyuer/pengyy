var mongoose = require('mongoose');

var inWorkListenerSchema = mongoose.Schema({
    email: String,
    date: [Date]
});

var InworkListener = mongoose.model('InworkListener', inWorkListenerSchema);
module.exports = InworkListener;