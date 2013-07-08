var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
	token: String
});

module.exports = mongoose.model('Device', deviceSchema);