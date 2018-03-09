var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var spawn = require('child_process').spawn, child;


// -NonInteractive -ExecutionPolicy Bypass -Command '& c:\\PowerShell\\ps-api\\extsharingguest.ps1 -GuestName '$guestName' -GuestEmail '$guestEmail''

	child = spawn('powershell.exe', ['-NonInteractive', '-ExecutionPolicy Bypass', '-Command "& c:\\node-api\\powershell\\extsharingguest.ps1 -GuestName \'$guestName\' -GuestEmail \'$guestEmail\'"']);
	child.stdout.on('data',function(data){
	    console.log('Powershell Data: ' + data);
	});
	child.stderr.on('data',function(data){
	    console.log('Powershell Errors: ' + data);
	});
	child.on('exit',function(){
	    console.log('Powershell Script finished');
	});
	child.stdin.end(); //end input
	res.send('test powershell api done');
});

module.exports = router;
