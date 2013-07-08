/*
 * GET users listing.
 */
var apns = require('../work/apns');
var Device = require('../work/device');

function getDevices(fn) {
    Device.find(function(err, devices) {
        fn(err, devices);
    });
}

function getTokens(fn) {
    getDevices(function(err, devices) {
        var tokens;
        if (!err) {
            tokens = devices.map(function(o) {
                return o['token'];
            });
        }
        fn(err, tokens);
    });
}

module.exports = function(req, res) {
    var mes = req.body.message || req.query.message;
    
    getTokens(function(err, tokens) {
        if (err) {
            res.send(500, {
                error: err
            });
        } else {
            apns.pushMessage(mes, tokens);
            res.send('ok');
        }
    });
};