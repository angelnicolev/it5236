var mysql = require('./node_modules/mysql');
var config = require('./config.json');
var validator = require('./validation.js');
function formatErrorResponse(code, errs) {
	return JSON.stringify({ 
		error  : code,
		errors : errs
	});
}
exports.handler = (event, context, callback) => {
	//instruct the function to return as soon as the callback is invoked
	context.callbackWaitsForEmptyEventLoop = false;

	
	var errors = new Array();
	
	 // Validate the user input
	
	if(errors.length > 0) {
		// This should be a "Bad Request" error
		callback(formatErrorResponse('BAD_REQUEST', errors));
	} else {
	//getConnection equivalent
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
		} else {
			console.log("Connected!");
			var sql = "SELECT things.thingid, things.thingname, convert_tz(things.thingcreated,@@session.time_zone,'America/New_York') as thingcreated, things.thinguserid, things.thingattachmentid, things.thingregistrationcode, username, filename " + "FROM things LEFT JOIN users ON things.thinguserid = users.userid " +
                "LEFT JOIN attachments ON things.thingattachmentid = attachments.attachmentid " +
                "WHERE thingid = ?";
						//START TO DIFFER
						//GET						
						conn.query(sql, [event.thingid, event.thingname, event.thingcreated, event.thinguserid, event.thingattachmentid, event.thingregistrationcode], function (err, result) {
										if (err) {
											// This should be a "Internal Server Error" error
											callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
										} else {
											// Pull out just the codes from the "result" array (index '1')
											// Build an object for the JSON response with the userid and reg codes
											var json = [];
		  									for(var i=0; i<1; i++) { 
		  									json.push({	
                                                thingid: result[i]['thingid'],
												thingname: result[i]['thingname'],
												thingcreated: result[i]['thingcreated'],
												thinguserid: result[i]['thinguserid'],
												thingattachmentid: result[i]['thingattachmentid'],
												thingregistrationcode: result[i]['thingregistrationcode']
		  									});	
											};
											// Return the json object
											callback(null, json);
											setTimeout(function(){conn.end();},3000);
										}
			      				}); //query userregistrations
				      		} //error users
			    		}); //query users
		} //connect database
	} // no connection errors