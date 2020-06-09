var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var init_js = require('./init')

var indexRouter = require('./routes/index');
var stationRouter = require('./routes/station');
var tripRouter = require('./routes/trips');
var riderRouter = require('./routes/rider');
var app = express();


async function init() {
    console.log("init");
    var _trip_data = await  init_js.init_trips();
    var _stations_data =await  init_js.init_stations();
    return {_stations_data, _trip_data}

}

exports.appPromise = init().then(function (data) {
    var stations_data = data._stations_data;
    var trip_data = data._trip_data;
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    app.use('/', indexRouter);
    app.use('/stations', stationRouter);
    app.use('/trips', tripRouter);
    app.use('/riders', riderRouter);
    return {app,stations_data,trip_data};
});

