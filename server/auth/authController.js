var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/login', function(req, res)
{
	var targetPassword = bcrypt.hashSync(process.env.LOGIN_PW, 8);
	var passwordIsValid = bcrypt.compareSync(req.body.password, targetPassword);

	if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

	var token = jwt.sign({ id: req.body.id }, process.env.KEY,
	{
		expiresIn: 86400
	});

	res.status(200).send({ auth: true, token: token });
});

module.exports = router;