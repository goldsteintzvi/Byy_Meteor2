'use strict';

Meteor.startup(() => {
	if (!Schools.findOne()) {
		const schoolsArr = [
			{
				'name': 'Hakotel',
				'website': 'http://hakotel.org.il',
				'mission statement': 'Finish Shas'
			},
			{
				'name': 'MMY',
				'website': 'http://mmy.org.il',
				'mission statement': 'Learn to love to live'
			}
		];

		schoolsArr.forEach(function (schoolObj) {
			Schools.insert(schoolObj);
		});
	};
	const categoryArr = ['What To Expect', 'Things Near You', 'Take Advantage'];
	if (!Quotes.findOne()) {
	  	const
	  		quotesSeed = [];

	  	for (var i = 0; i < 100; i++) {
	  		const 
	  			insObj 				= {};
	  			insObj.text 		= `Text: ${i}`;
	  			insObj.tag 			= `Tag: ${i}`;
	  			insObj.category     = categoryArr[i%3];
	  			insObj.checked 		= Math.random() > .5 ? true : false;
	  			insObj.school_id 	= Schools.find().fetch()[Math.random() > .5 ? 0 : 1]._id;

	  		quotesSeed.push(insObj);
	  	}

	  	quotesSeed.forEach(quote => Quotes.insert(quote));
	}
})