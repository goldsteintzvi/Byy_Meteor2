'use strict';

Template.yeshivot.created = function () {
	this.autorun(() => {
		this.subscribe('schools');
		});
}

Template.yeshivot.helpers({
	schools() {
		const
			schools = Schools.find().fetch();
		return schools;
	}
	});