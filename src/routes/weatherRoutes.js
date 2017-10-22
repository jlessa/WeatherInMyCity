var express = require('express');

var weatherRouter = express.Router();

var router = function () {
    var weatherService = require('../services/weatherService')();
    var weatherController = require('../controllers/weatherController')(weatherService);

    weatherRouter.route('/')
        .get(function (req, res) {
            weatherController.getWeather(req, res);
        });

    weatherRouter.route('/')
        .post(function (req, res) {
            weatherController.postWeather(req, res);
        });

    return weatherRouter;
};

module.exports = router;