var Gkn = require('gkn-js'),
	Express = require('express'),
	Q =require('q'),
	Router = Express.Router();

Router.get('/', function(req, res, next) {
	var deferred = Q.defer(),
		result;

	Gkn.Common.powershell('extsharingguest.ps1', '-guestName="name" -guestEmail="email"')
		.then(function(response) {
			result = { success: true, status: 200, caller: 'test.js>get', data: response.data }
			Gkn.Common.debuglog(result);
			res.status(200).send(result);
		})
		.fail(function(response) {
			result = { success: false, status: 400, caller: 'test.js>get', data: response.data };
			Gkn.Common.log(result);
			res.status(400).send(result);
		});

	return;
});

module.exports = Router;