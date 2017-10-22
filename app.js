var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var port = process.env.PORT || 5000;


app.listen(port, function (err) {
    if (!err) {
        console.log('running server on port: ' + port);
    }
});

var weatherRouter = require('./src/routes/weatherRoutes')();

app.use('/', weatherRouter);

module.exports = app;