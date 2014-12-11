Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toLocaleDateString();
  },
  isAuthor: function(){
      return Meteor.userId() === this.userId;
  },
  hasChildComment: function(){
      return true;
   },
  childComments: function() {
      return Comments.find({parentCommentId: this._id});
  },
  votes: function() {
      if(this.votes) {
          return this.votes;
      } else {
          return 0;
      }
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'fa-thumbs-o-up';
    } else {
      return 'fa-thumbs-up';
    }

  }
});

Template.commentItem.events({
    'click #comment-delete': function(e, template){
        e.preventDefault();
        if(confirm('delete this comment?')){
            var currentCommentId = this._id;
            Comments.remove(currentCommentId);
            Posts.update(this.postId, {$inc: {commentsCount: -1}});
        }
    },
    'click .fa-thumbs-o-up': function(e, p) {
        e.preventDefault();
        Meteor.call('commentUpvote', this._id);
    }

});
