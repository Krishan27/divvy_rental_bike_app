var express = require('express');
var router = express.Router();
var appPromise = require('../app');
var checkAuth = require('../middleware/checkAuth');
var sortJsonArray = require('sort-json-array');



router.get('/', checkAuth, async (req, res, next) => {
  var stations_ids = JSON.parse(await req.query.station_id);
  var day = new Date(await req.query.day);

  //console.log(day)
  appPromise.appPromise.then(function (data) {
    var trip_data = data.trip_data;

    if (stations_ids !== undefined) {
      try {
        var _now = new Date()
        var _response = trip_data
            .filter(station => stations_ids.indexOf(parseInt(station['02 - Rental End Station ID'])) >= 0 && new Date(station['01 - Rental Details Local End Time']).getUTCFullYear() === day.getUTCFullYear() && new Date(station['01 - Rental Details Local End Time']).getUTCMonth() === day.getUTCMonth() && new Date(station['01 - Rental Details Local End Time']).getUTCDate() === day.getUTCDate())
        var response = {};
        stations_ids.forEach(function (ele) {
          response[ele] = [];

        })

        _response.forEach(function (element) {
          response[element['02 - Rental End Station ID']].push(element)

        })
        stations_ids.forEach(function (ele) {
          response[ele] = response[ele].slice(0,20);

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

