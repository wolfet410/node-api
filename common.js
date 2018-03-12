module.exports.debuglog = function(msg) {
	/**
	* Logs output to the console, if DEBUGLOGGING is enabled
	**/

    if (DEBUGLOGGING) {
		console.log(Date() + ',' + 'DEBUG,' + msg);
	}
}

module.exports.log = function(msg) {
	/**
	* Logs output to the console
	**/

	console.warn(Date() + ',' + 'WARN,' + msg);
}

module.exports.powershell = function(script, paramsAsString) {
	/**
	* Runs a PowerShell script and returns output as standard output object { success, status: 204, caller, data }
	*
	* script = Name of PowerShell script in node-api/powershell/ directory with .ps1 file extension
	* paramsAsString = Script parameters as a single string
	*
	* Returns standard output object { success, status: 204, caller, data }
	*
	**/
	var exec = require('child_process').exec;
	debuglog('powershell script: ' + script + ', parameters: ' + paramsAsString);
	var command = 'powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command "& c:\\node-api\\powershell\\' + script + '" ' 
		+ paramsAsString;
	debuglog(command);
	
	exec(command, function(error, stdout, stderr) {
		debuglog(error, stdout, stderr);
		if (error) {
			log('exec returned error: ', { success: false, status: 400, caller: 'function.js>powershell', data: stderr });
			return { success: false, status: 400, caller: 'function.js>powershell', data: stderr }
		}

		debuglog({ success: true, status: 200, caller: 'function.js>powershell', data: stdout });
		return { success: true, status: 200, caller: 'function.js>powershell', data: stdout }
	});
}