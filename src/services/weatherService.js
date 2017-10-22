var http = require('http');

var weatherService = function () {
    var getWeatherByCityName = function (cityName, callback) {

        var apiKey = '&APPID=28bd962568eb8ae70d0b72c55c30ff20';
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=';

        var apiCallback = function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                //parser.parseString(str, function (err, result) {
                    callback(null, JSON.parse(str));
                //});                
            });
            response.on('error', function (err) {
                callback(null, err);
            });
        };

        http.request(url + cityName + apiKey, apiCallback).end();

    };
    return {
        getWeatherByCityName: getWeatherByCityName
    };

};

module.exports = weatherService;