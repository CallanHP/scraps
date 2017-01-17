/**
 * The ExpressJS namespace.
 * @external ExpressApplicationObject
 * @see {@link http://expressjs.com/3x/api.html#app}
 */ 

/**
 * Mobile Cloud custom code service entry point.
 * @param {external:ExpressApplicationObject}
 * service 
 */
module.exports = function(service) {


	/**
	 *  The file samples.txt in the archive that this file was packaged with contains some example code.
	 */


	service.post('/mobile/custom/promotional_events/events/:eventid/attendees', function(req,res) {
		var result = {};
		var statusCode = 201;
		res.send(statusCode, result);
	});

	service.delete('/mobile/custom/promotional_events/events/:eventid/attendees', function(req,res) {
		var result = {};
		var statusCode = 200;
		res.send(statusCode, result);
	});

	service.get('/mobile/custom/promotional_events/events/:eventid/attendees', function(req,res) {
		var result = {};
		var statusCode = 200;
		if (statusCode == 200){
			var acceptType = req.accepts(['application/json']);
			if (acceptType == 'application/json'){
				result = { "attendees":[
					  	{ "name":"Jane Smith",
					      "organisation":"Acme inc.",
					      "title":"API Super-Specialist",
					      "email":"jsmith1@acme.com"
					    },
					  	{ "name":"John Smith",
					      "organisation":"Acme inc.",
					      "title":"API Specialist",
					      "email":"jsmith2@acme.com"
					    }  	
					  ]
					};
			}
		}
		res.send(statusCode, result);
	});

	service.post('/mobile/custom/promotional_events/events', function(req,res) {
		var result = {};
		var statusCode = 201;
		if (statusCode == 201){
			var acceptType = req.accepts(['application/json']);
			if (acceptType == 'application/json'){
				result = {
					  "eventid": 635
					};
			}
		}
		res.send(statusCode, result);
	});

	service.get('/mobile/custom/promotional_events/events', function(req,res) {
		var result = {};
		var statusCode = 200;
		if (statusCode == 200){
			var acceptType = req.accepts(['application/json']);
			if (acceptType == 'application/json'){
				result = { "events":[
					    {
					      "eventid":635,
					      "title":"API Platform and RAML",
					      "location":"Oracle Cloud",
					      "date":"2017-03-03",
					      "shortdesc":"Learn about using API Platform with RAML.",
					      "presenter":"Callan Howell-Pavia"
					    },
					  	{
					      "eventid":636,
					      "title":"Mobile Cloud for API Development",
					      "location":"Sydney",
					      "date":"2017-03-04",
					      "shortdesc":"How to use Mobile Cloud to build API-first Apps",
					      "presenter":"Callan Howell-Pavia"
					    }
					  ]
					};
			}
		}
		res.send(statusCode, result);
	});

	service.put('/mobile/custom/promotional_events/events/:eventid', function(req,res) {
		var result = {};
		var statusCode = 200;
		res.send(statusCode, result);
	});

	service.delete('/mobile/custom/promotional_events/events/:eventid', function(req,res) {
		var result = {};
		var statusCode = 200;
		res.send(statusCode, result);
	});

	service.get('/mobile/custom/promotional_events/events/:eventid', function(req,res) {
		var result = {};
		var statusCode = 200;
		if (statusCode == 200){
			var acceptType = req.accepts(['application/json']);
			if (acceptType == 'application/json'){
				result = {
					  "eventid":635,
					  "title":"API Platform and RAML",
					  "location":"Oracle Cloud",
					  "date":"2017-03-03",
					  "shortdesc":"Learn about using API Platform with RAML.",
					  "description":"A discussion about using RAML and Swagger as API descriptors in API Platform.",
					  "presenter":"Callan Howell-Pavia"
					};
			}
		}
		res.send(statusCode, result);
	});

};
