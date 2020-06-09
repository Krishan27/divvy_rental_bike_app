var express = require('express');
var router = express.Router();
var appPromise = require('../app');
var checkAuth = require('../middleware/checkAuth');
var ageCalculator = require('age-calculator');
var moment = require('moment-timezone');

moment.tz.add('America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5');

router.get('/', checkAuth, async (req, res, next) => {
    var stations_ids = JSON.parse(await req.query.station_id);
    var day = new Date(await req.query.day);

    //console.log(day)
    appPromise.appPromise.then(function (data) {
        var trip_data = data.trip_data;
        // moment(trip_data).tz('America/CT').format("YYYY:MM:DD");
        if (stations_ids !== undefined) {
            try {
                var _now = new Date()
                var _response = trip_data
                    .filter(station => stations_ids.indexOf(parseInt(station['02 - Rental End Station ID'])) >= 0 && new Date(station['01 - Rental Details Local End Time']).getUTCFullYear() === day.getUTCFullYear() && new Date(station['01 - Rental Details Local End Time']).getUTCMonth() === day.getUTCMonth() && new Date(station['01 - Rental Details Local End Time']).getUTCDate() === day.getUTCDate())
                var response = {
                    '0-20':0,
                    '21-30':0,
                    '31-40':0,
                    '41-50':0,
                    '51+':0,
                    'unknown':0
                };
                _response.forEach(function (element) {
                    var val = _now.getUTCFullYear() - parseInt(element['05 - Member Details Member Birthday Year']);
                    if (val >= 0 && val <= 20) {
                        response['0-20'] += 1
                    } else if (val > 20 && val <= 30) {
                        response['21-30'] += 1
                    } else if (val > 30 && val <= 40) {
                        response['31-40']+= 1
                    } else if (val > 40 && val <= 50) {
                        response['41-50']+=1
                    } else if (val > 50) {
                        response['51+']+=1
                    } else {
                        response['unknown']+=1
                    }

                })
                return res.status(200).json({
                    stations_id: stations_ids,
                    day: day,
                    status: 'success',
                    data: response
                });
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    stations_id: stations_id,
                    day: day,
                    status: 'failed',
                    data: []
                })
            }
        } else {
            return res.status(400).json({
                stations_id: stations_id,
                day: day,
                status: 'no station_id provided',
                data: []
            })
        }
    })
        .catch(function (error) {
            console.log(error)
            return res.status(500).json({
                stations_id: stations_id,
                day: day,
                status: 'failed',
                data: []
            })
        });

});


module.exports = router;
