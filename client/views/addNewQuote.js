import {Meteor} from 'meteor/meteor'

Template.addNewQuote.created = function () {
  this.quoteCategories = ['what_to_pack', 'stuff_near_you', 'take_advantage'];
};

Template.addNewQuote.helpers({
  categories() {
    const
      categories = Template.instance().quoteCategories;

    return categories.map(cat => {
      return {
        key: cat,
        full: cat.split('_').join(' ')
      }
    });
  }
});

Template.addNewQuote.events({
  'submit .new-quote'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    console.log(event.target.category);

    // Get value from form element
    const
        newQuoteObj = {};
    target = event.target;
    newQuoteObj.title= target.title.value;
    newQuoteObj.quote = target.quote.value;
    newQuoteObj.category = $('#category').val();
    newQuoteObj.tag= target.tag.value;
    newQuoteObj.owner=Meteor.userId();
    newQuoteObj.emails=Meteor.user().emails;
    // Insert a task into the collection
    Meteor.call('insertQuote', newQuoteObj);
   // Quotes.insert({
   //   quote,
   //   title,
   //   category,
   //   tag,
   //   createdAt: new Date(), // current time
   //   owner,
   //   emails,
   // });
// console.log(title, quote, category, tag, owner, emails);
    // Clear form
    target.quote.value = '';
    target.title.value = '';
    target.category.value = '';
    target.tag.value = '';
  },
});
