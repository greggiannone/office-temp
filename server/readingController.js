var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('./auth/verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var reading = require('./reading');

router.post('/', verifyToken, function(req, res, next)
{
	reading.create(
	{
		temp: req.body.temp,
		time: req.body.time
	}, function(err, reading)
	{
		if (err) return res.status(500).send("There was a problem adding the information to the database.");
		res.status(200).send(reading);
	});
});

router.get('/', function(req, res)
{
	reading.find({}, function (err, readings)
	{
		if (err) return res.status(500).send("There was a problem finding the readings.");
        res.status(200).send(readings);
	});
});

router.get('/current', function(req, res)
{
	reading.find().sort({"time": -1}).limit(1).exec(function(err, result)
	{
		if (err) return res.status(500).send("There was a problem finding the reading.");
		res.status(200).send(result[0]);
	});
});

router.get('/today', function(req, res)
{
	var start = new Date();
	start.setHours(0, 0, 0, 0);
	var end = new Date();
	end.setHours(23, 59, 59, 999);

	console.log(start);
	
	reading.find({'time': { '$gte': start, '$lt': end }}, function (err, readings)
	{
		if (err) return res.status(500).send("There was a problem finding the readings.");
        res.status(200).send(readings);
	});
})

module.exports = router;