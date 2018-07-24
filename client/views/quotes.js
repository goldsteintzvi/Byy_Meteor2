'use strict';

Template.quotes.created = function () {
	this.limit 	= new ReactiveVar(25);

	this.autorun(() => {
		const 
			routerParams 			= {};
			// Your router can have variables so the same template 'quotes' will load on quotes/hakotel or quotes/otherSchool
			// You can get the school name from router and pass it to the pub. The pub will then use that to filter the quotes it publishes
			routerParams.school_id 	= FlowRouter.getParam('school_id') || null;

		// I subscribe to the publication 'quotes' (check pubs.js) and pass it two params: school and limit
		this.subscribe('quotes', routerParams.school_id, this.limit.get());
	});
}

Template.quotes.helpers({
	quotes() {
		const
			quotes = Quotes.find().fetch();
		return quotes;
	},

	quoteCount() {
		return Quotes.find().count();
	},

	school() {
		return FlowRouter.getParam('school');
	}
});

Template.quotes.events({
	'click .toggle-checked'() {
	    // Set the checked property to the opposite of its current value
	    // Clients should not be able to modify collections (the db)
	    // Always send a request to a Meteor method (server side function) to modify the DB
	    // Meteor.call invokes a Meteor method. First param is name of method as defined on server side (this one is in methods_quotes.js)
	    // Then you can pass as many params as you want separated by commas. Here I'm just passing this._id. This will become the first parameter in the function on the server. 
	    // The last param you include is a callback that receives either an error as first param if err, and if not, that's null and just sends back res (either blank or whatever you return from the server method);
	    //NOTE I REMOVED AUTOPUBLISH SO YOU MUST DO IT THIS WAY. NO MORE HACKY EDITING OF DB FROM CLIENT
	    //ALSO MEANS YOU NEED TO PUBLISH DOCS AND SUBSCRIBE TO THEM ON CLIENT. CANT JUST CALL COLLECTION ANYMORE WITHOUT VALID PUBLICATION. CHECK PUBS.JS AND HOW I SUBSCRIBED TO IT IN QUOTES.JS (I.E. THIS FILE ON TOP IN .CREATED)
	    Meteor.call('toggleQuoteCheck', this._id, (err, res) => {
	    	if (err) {
	    		console.log(err);
	    		alertify.error(err.reason);

	    		return;
	    	}
	    	
	    	alertify.success('Updated');

	    	return;
	    });
	},

	'click .delete'() {
	  	Meteor.call('removeQuote', this._id, (err, res) => {
	    	if (err) {
	    		console.log(err);
	    		alertify.error(err.reason);
	    		return;
	    	}
	    	
	    	alertify.success(`Deleted ${res} quotes`);

	    	return;
	    });
	},

	'click a#load-more'(e, t) {
		e.preventDefault();

		t.limit.set(t.limit.get() + 25);
		return;
	}
})