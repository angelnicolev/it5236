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
		var sql = "SELECT thingid, thingname, convert_tz(things.thingcreated,@@session.time_zone,'America/New_York') as thingcreated, thinguserid, thingattachmentid, thingregistrationcode FROM things LEFT JOIN users ON things.thinguserid = users.userid WHERE thingregistrationcode = ? ORDER BY things.thingcreated ASC";
		conn.query(sql,[event.thingregistrationcode], function (err, result) {
			if (err) {
				callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
			} else {
				var registrationcodethings = [];
					for(var i=0; i<result.length; i++) {
						registrationcodethings[i] = {thingid:result[i]['thingid'],thingname:result[i]['thingname'],thingcreated:result[i]['thingcreated'],thinguserid:result[i]['thinguserid'],thingregistrationcode:result[i]['thingregistrationcode'],thingattachmentid:result[i]['thingattachmentid']};
				}
				callback(null,registrationcodethings);
			}
		});
	});//end of connection function

}// end of exports.handler