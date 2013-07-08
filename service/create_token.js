var Device = require('../work/device');

function on_error(res, err) {
    res.send(500, {
        error: err
    });
}

function on_device(res, device, token_id) {
    if (device) {
        res.send('token exists');
    } else {
        device = new Device({
            token: token_id
        });
        device.save(function(err, d) {
            if (err)
                on_error(res, err);
            else
                res.send('ok');
        });
    }
}

module.exports = function(req, res) {
    var token_id = req.body.id || req.query.id;

    Device.findOne({
        token: token_id
    }, function(err, device) {
        if (err)
            on_error(res, err);
        else
            on_device(res, device, token_id);
    });
};