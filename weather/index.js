'use strict';
/* import YQL module to send query request and get data response from yahoo API */
const YQL = require('yql');
const _ = require('lodash');


module.exports = (opts, callback) => {
	opts = opts || [];

	let query;
	/* if there is no arguments (city & country), we use the default arguments (Dhaka, Bangladesh) */
	if (_.isEmpty(opts)) {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Dhaka, Bangladesh")');
	} else {
	/* else send query request with user arguments */ 
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + opts[0] + ', ' + opts[1] + '")');
	}

	query.exec((err, response) => {
		if (err) {
			return callback(err);
		}

		callback(null, response);
	});
};
