Template.navbar.created = function () {
  this.loading = new ReactiveVar(false);

  this.autorun(() => {
  	this.subscribe('schools');
  });
};

Template.navbar.rendered = function () {

};

Template.navbar.helpers({
  schools() {
  	return Schools.find().fetch();
  },

  loading() {
    return Template.instance().loading.get();
  }
});

Template.navbar.events({
  'click'(e, t) {
  	
  }
});
