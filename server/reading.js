var mongoose = require('mongoose');
var readingSchema = new mongoose.Schema(
	{
		temp: Number,
		time: Date
	}
);
mongoose.model('reading', readingSchema);

module.exports = mongoose.model('reading');