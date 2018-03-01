var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var reading = require('./reading');

router.post('/', function(req, res)
{
	reading.create(
	{
		temp: req.body.reading,
		time: Date.now()
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
	})
})

module.exports = router;