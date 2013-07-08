/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path');

// connect to database
var mongo = require('./work/mongo.js');

// connect to apns server
var apns = require('./work/apns.js');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.all('/create_token', require('./service/create_token'));
app.all('/push_message', require('./service/push_message'));
app.all('/remove_tokens', require('./service/remove_tokens'));


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});