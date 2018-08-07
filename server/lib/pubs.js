'use strict';

Meteor.publish('schools', function() {
	return Schools.find();
})

Meteor.publish('quotes', function(school_id, category, limit) {
	//I always do this to make sure you don't overpublish. If a client failed to send a limit, you don't want to accidentally publish 1000000 documents
	if (!limit) limit = 25;

	const
		reqBase 	= {
			category,
		},
		reqCustom	= {
			limit,
			sort    	: {'date': -1}
		};

	// By not defining .school in reqBase unless school exists, you're saying that on quotes page with no school passed to publication
	// That you want all quotes to be published. Change this if this is not behavior you want.
	if (school_id) reqBase.school_id = school_id;

	console.log(reqBase);

	return Quotes.find(reqBase, reqCustom);
});
