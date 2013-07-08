/*
 * GET home page.
 */

var Device = require('../work/device');


function getDevices(fn) {
	Device.find(function(err, devices) {
		if (err) throw err;
		fn(devices);
	});
}

function getTokens(fn) {
	getDevices(function(devices) {
		var tokens = devices.map(function(o) {
			return o['token'];
		});
		fn(tokens);
	});
}

exports.index = function(req, res) {

	getTokens(function(tokens) {
		res.render('index', {
			title: 'Asean push center',
			tokens: tokens
		});
	});
};