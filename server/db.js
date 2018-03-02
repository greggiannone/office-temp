var mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds253918.mlab.com:53918/office-temp-test`);