// TODO: for production use 
// gateway: gateway.push.apple.com
// production cert.pem and key.pem


var apn = require('apn');
var path = require('path');

// Create a connection to the service using mostly default parameters.

var service = new apn.connection({
	gateway: 'gateway.sandbox.push.apple.com',
	cert: path.join(process.cwd(), 'work/cert.pem'),
	key: path.join(process.cwd(), 'work/key.pem')
});
//var service = new apn.Connection({});

service.on('connected', function() {
	console.log("Connected");
});

service.on('transmitted', function(notification, device) {
	console.log("Notification transmitted to:" + device.token.toString());
});

service.on('transmissionError', function(errCode, notification, device) {
	console.error("Notification caused error: " + errCode + " for device ", device, notification);
});

service.on('timeout', function() {
	console.log("Connection Timeout");
});

service.on('disconnected', function() {
	console.log("Disconnected from APNS");
});

service.on('socketError', console.error);


exports.pushMessage = function(mes, tokens) {
	for (var i = 0; i < tokens.length; i++) {
		var note = new apn.Notification();
		note.alert = mes;
		note.badge = 1;
		service.pushNotification(note, tokens[i]);
	}
}