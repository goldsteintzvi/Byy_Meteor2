'use strict';

let 
	Future  = Npm.require( 'fibers/future' );

Meteor.methods({
	toggleQuoteCheck(quote_id) {
		// Check is a helpful lib that allows you to validate the typeof parameter sent to make sure you're not messing anything up
		// In this case I expect quote_id to exist, and I expect it to be a string. If it isn't there or if it isn't a string, this function will return and pass
		// the error 'Match failed. Expected String, received null or Number, etc'
		// This gets passed to the first param in your callback - err. 
		// check(quote_id, String);

		const
			check = Quotes.findOne(quote_id).checked;

		Quotes.update(quote_id, {
	      $set: { checked: !check }
	    });

	    console.log('toggleQuoteCheck finished');

	    return;
	},

	removeQuote(quote_id) {
		// check(quote_id, String);

		//Will explain another time
		const
			future = new Future();

		Quotes.remove(quote_id, (err, res) => {
			if (err) {
				throw new Meteor.Error(err);
				future.return();
			}
			
			future.return(res); 
		});

		if (future.wait()) console.log('removeQuote finished');

		return future.wait();
	},

	insertQuote(quote) {
		Quotes.insert(quote);
	}
})