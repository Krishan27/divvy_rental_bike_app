var express = require('express');
var router = express.Router();
var appPromise = require('../app');
var checkAuth = require('../middleware/checkAuth');

router.get('/:station_id', checkAuth, async (req, res, next) => {
    var stations_id = await req.params.station_id;
    appPromise.appPromise.then(function (data) {
        var stations_data = data.stations_data;
        if (stations_id !== undefined) {
            try {
                var response = stations_data.filter(station => station.station_id === stations_id);

                return res.status(200).json({
                    stations_id: stations_id,
                    status: 'success',
                    data: response
                });
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    stations_id: stations_id,
                    status: 'failed',
                    data: []
                })
            }
        } else {
            return res.status(400).json({
                stations_id: stations_id,
                status: 'no station_id provided',
                data: []
            })
        }
    })
        .catch(function (err) {
            console.log(error)
            return res.status(500).json({
                stations_id: stations_id,
                status: 'failed',
                data: []
            })
        });

});


module.exports = router;


//end