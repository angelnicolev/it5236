var mysql = require('./node_modules/mysql');
var config = require('./config.json');
var validator = require('./validation.js');

//errors
function formatErrorResponse(code, errs) {
	return JSON.stringify({
		error  : code,
		errors : errs
	});
}

exports.handler = (event, context, callback) => {
	//instruct the function to return as soon as the callback is invoked
	context.callbackWaitsForEmptyEventLoop = false;

	var conn = mysql.createConnection({
		host 	: config.dbhost,
		user 	: config.dbuser,
		password : config.dbpassword,
		database : config.dbname
	});
    
    	//prevent timeout from waiting event loop
	context.callbackWaitsForEmptyEventLoop = false;

	//attempts to connect to the database
	conn.connect(function(err) {
		if (err)  {
			// This should be a "Internal Server Error" error
			callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
		};

		console.log("Connected!");
		var sql = "SELECT usersessionid, usersessions.userid, email, username, usersessions.registrationcode, isadmin FROM usersessions LEFT JOIN users on usersessions.userid = users.userid WHERE usersessionid = ? AND expires > now()";

        conn.query(sql, [event.usersessionid], function (err, result) {
			if (err) {
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
			} else {
				 if(result.length > 0){
				 	console.log("Session retireved");
				 
				// Build an object for the JSON response with the userid and reg codes
						var session = { 
							userid : result[0]['userid'],
							usersessionid: result[0]['usersessionid'],
							username : result[0]['username'],
							email : result[0]['email'],
							registrationcode : result[0]['registrationcode']};
					
				callback(null, session);
				
				 } else {
				 console.log("hey");
				 //	callback(formatErrorResponse('*.NOT_FOUND', errors));
				 }
			}//session recieved
		});//end of conn.query
	});//end of conn.connect
}//end of exports.handler