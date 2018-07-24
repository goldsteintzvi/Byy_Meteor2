FlowRouter.notFound = {
	action: function() {
		FlowRouter.go('/');
	}
}

// Use the simple BlazeLayout.render('templateName') if you don't need to load a template within a layout
//FlowRouter.route('/', {
//	action() {
//		BlazeLayout.render('home');
//	}
//});

FlowRouter.route('/', {
	action() {
		FlowRouter.go('/home');
	}
})

FlowRouter.route('/home', {
	action() {
		// Here I am telling FlowRouter to use mainLayout as the layout and then I can pass a specific template 
		// which will be used as the dynamic template in the layout
		// This goes to Template.dynamic in mainLayout. Notice how I pass the template 'home'
		// within an object as the value to the key 'content'.
		// Content is also the param we used in Template.dynamic in mainLayout.
		BlazeLayout.render("mainLayout", {content: 'home'});
	}
});

//Example of another route, using the same layout but passing a different dynamic template
FlowRouter.route('/hakotel', {
	action() {
		// Here I am telling FlowRouter to use mainLayout as the layout and then I can pass a specific template 
		// which will be used as the dynamic template in the layout
		// This goes to Template.dynamic in mainLayout. Notice how I pass the template 'home'
		// within an object as the value to the key 'content'.
		// Content is also the param we used in Template.dynamic in mainLayout.
		BlazeLayout.render("mainLayout", {content: 'hakotel'});
	}
});

FlowRouter.route('/quotes/:school_id', {
	action() {
		BlazeLayout.render('mainLayout', {content: 'quotes'});
	}
});

FlowRouter.route('/yeshivot', {
	action() {
		BlazeLayout.render('mainLayout', {content: 'yeshivot'});
	}
});