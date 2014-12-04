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
      //console.log(this);
      return Comments.find({parentCommentId: this._id});
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
    }
});
