var weatherController = function (weatherService) {

    var getWeather = function (req, res) {
        res.render('weatherView', {
            show: false
        });
    };

    var postWeather = function (req, res) {
        if (req.query.city) {
            weatherService.getWeatherByCityName(req.query.city, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (result.cod === 200) {                        
                        res.render('weatherView', {
                            show: true,
                            result: result,
                            icon: 'images/icons/' + result.weather[0].icon.substring(0, 2) + '.svg'
                        });
                    } else if (result.cod === 404) {
                        res.render('weatherView404', {
                            show: true,                            
                        });

                    }

                }
            });
        }

    };



    return {
        getWeather: getWeather,
        postWeather: postWeather
    };
};

module.exports = weatherController;