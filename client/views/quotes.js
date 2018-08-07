'use strict';

Template.quotes.created = function () {

}

Template.quotes.helpers({
	quotes() {
		return Template.currentData().quoteArray;
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
