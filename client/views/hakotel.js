Template.hakotel.created = function () {
  this.activeSection = new ReactiveVar('what_to_pack');

  this.limit  = new ReactiveVar(25);

  this.autorun(() => {
    const
      routerParams      = {};
      // Your router can have variables so the same template 'quotes' will load on quotes/hakotel or quotes/otherSchool
      // You can get the school name from router and pass it to the pub. The pub will then use that to filter the quotes it publishes
      routerParams.school_id  = FlowRouter.getParam('school_id') || null;

    // I subscribe to the publication 'quotes' (check pubs.js) and pass it two params: school and limit
    this.subscribe('quotes', routerParams.school_id, this.activeSection.get(), this.limit.get());
  });
};

Template.hakotel.rendered = function () {

};

Template.hakotel.helpers({
  quotesArrHelper() {
    const
      quotes = Quotes.find().fetch();

    return quotes;
  },
});

Template.hakotel.events({
  'click a.nav-link'(e, t) {
    const
      section = $(e.target).attr('section');

    t.activeSection.set(section);
  }
});
