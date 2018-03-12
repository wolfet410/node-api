var Gkn = require('gkn-js'),
	Express = require('express'),
	Router = Express.Router();

Router.get('/', function(req, res, next) {
	var testResponse = Gkn.Common.powershell('extsharinggueset.ps1', '-guestName="name" -guestEmail="email"');
	if (!testResponse.success) {
		res.status(400).send(testResponse);
		return;
	}

	res.status(200).send(testResponse);
	return;

});

module.exports = Router;