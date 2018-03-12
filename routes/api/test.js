var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var exec = require('child_process').exec;
	console.log('before callback, console screen clears once script begins');
	var script = 'powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command "& c:\\node-api\\powershell\\extsharingguest.ps1"';
	exec(script, function(error, stdout, stderr) {
		console.log('inside the default callback, writes to the server console');
		console.log('error:', error);
		console.log('stdout:', stdout);
		console.log('stderr:', stderr);
		res.send('sends this back to the browser');
	});
});

module.exports = router;
