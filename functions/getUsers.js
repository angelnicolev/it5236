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
		var sql = "SELECT userid, username, email, isadmin FROM users ORDER BY username";
		conn.query(sql, function (err, result) {
			if (err) {
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
			} else {
				var users = [];
					for(var i=0; i<result.length; i++) {
						users[i] = {userid:result[i]['userid'],username:result[i]['username'], email:result[i]['email'], isadmin:result[i]['isadmin']};
					
					
				}
				callback(null,users);
			}
		});
	});//end of connection function

}// end of exports.handler