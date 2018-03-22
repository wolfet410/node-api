var Gkn = require('gkn-js'),
	Express = require('express'),
	Q =require('q'),
	Router = Express.Router();

Router.get('/', function(req, res, next) {
	var deferred = Q.defer(),
		apikey = req.query.apikey,
		guestName = "Todd 2222", // req.query.guestname,
		guestEmail = req.query.guestemail,
		result;

	var checkApiKeyResult = Gkn.Common.checkapikey(apikey);
	if (checkApiKeyResult.status !== 200) {
		if (typeof checkApiKeyResult.status !== 'number') { 
			checkApiKeyResult.status = 503;
		}
		res.status(checkApiKeyResult.status).send(checkApiKeyResult)
		return;
	}

	if (typeof guestName === 'undefined' || typeof guestEmail === 'undefined') {
		var r = { success: true, status: 400, caller: 'createadguest.js>get', data: 'Missing guestname or guestemail' };
		Gkn.Common.debuglog(r);
		res.status(r.status).send(r);
		return;
	}

	Gkn.Common.powershell('createaadguest.ps1', '-GuestName \\"' + guestName + '\\" -GuestEmail \\"' + guestEmail + '\\"')
		.then(function(response) {
			result = { success: true, status: 200, caller: 'createaadguest.js>get', data: response.data }
			Gkn.Common.debuglog(result);
			res.status(200).send(result);
		})
		.fail(function(response) {
			result = { success: false, status: 400, caller: 'createaadguest.js>get', data: response.data };
			Gkn.Common.log(result);
			res.status(400).send(result);
		});

	return;
});

module.exports = Router;