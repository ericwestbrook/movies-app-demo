// load in modules
var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path');

// set up express
var app = express();

// public directory
app.use(express.static(path.join(__dirname, 'public')));

// parse json requests
app.use(bodyParser.json());

// error handling.
// only handle `next(err)` calls
app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);
        res.send({success: false});
    }
});

//set the port
var app_port = process.env.PORT || 3000;
app.set('port', app_port);

// listen up.
http.createServer(app).listen(app.get('port'), function(){
    console.log('Running... (port: ' + app_port + ')');
});

module.exports = app;
