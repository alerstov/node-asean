var Device = require('../work/device');

module.exports = function(req, res) {
    Device.remove(function(err) {
        if (err) {
            res.send(500, {
                error: err
            });
        } else {
            res.send('ok');
        }
    });
}