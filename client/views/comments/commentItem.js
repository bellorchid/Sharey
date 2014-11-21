Template.commentItem.helpers({
  'submittedText': function() {
    return this.submitted.toLocaleDateString();
  },
  'isAuthor': function(){
      return Meteor.userId() === this.userId;
  }
});
