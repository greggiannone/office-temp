var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('./verifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/login', function(req, res)
{
	var targetPassword = bcrypt.hashSync(process.env.LOGIN_PW, 8);
	if (!req.body.password) return res.status(500).send("Password was not sent");
	var passwordIsValid = bcrypt.compareSync(req.body.password, targetPassword);

	if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

	var token = jwt.sign({ id: req.body.id }, process.env.KEY,
	{
		expiresIn: 86400
	});

	res.status(200).send({ auth: true, token: token });
});

router.get('/pingLogin', verifyToken, function(req, res)
{
	res.status(200).send({ auth: true });
});

module.exports = router;