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
			callback(formatErrorResponse('INTERNAL_SERVER_ERROR0', [err]));
		};

		console.log("Connected!");
		var sql = "INSERT INTO attachmenttypes (attachmenttypeid, name, extension) VALUES (?, ?, ?)";

        conn.query(sql, [event.attachmenttypeid, event.name, event.extension], function (err, result) {
			
            
            if (err) {
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR1', [err]));
			} else {
				
				callback(null,"successful new attachment type");
			}
		});//end of conn.query
	});//end of conn.connect
}//end of exports.handler