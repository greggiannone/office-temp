var express = require('express');
var db = require('./db');
var app = express();

app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var readingController = require('./readingController');
app.use('/readings', readingController);

var port = process.env.PORT || 3000;
var server = app.listen(port, function()
{
	console.log('Express server listening on port ' + port);
})

module.exports = app;