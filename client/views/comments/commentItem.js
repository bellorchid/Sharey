Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toLocaleDateString();
  },
  isAuthor: function(){
      return Meteor.userId() === this.userId;
  },
  authorLink: function() {
      return 'http://sharey.birdgg.me/users/' + this.author;
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
    if(!userId) {
        return 'fa-thumbs-o-up';
    } else if (userId && !_.include(this.upvoters, userId)) {
      return 'fa-thumbs-o-up votable';
    } else {
      return 'fa-thumbs-up';
    }
  },
  avatar: function() {
    var github = Users.findOne({username: this.author}).profile.github;
    var avatarUrl = "https://avatars.githubusercontent.com/" + github;
    //console.log(github);
    return avatarUrl;
  }
});

Template.commentItem.events({
    //TODO delete permision
    /*'click #comment-delete': function(e, template){*/
        //e.preventDefault();
        //if(confirm('delete this comment?')){
            //var currentCommentId = this._id;
            //Comments.remove(currentCommentId);
            //Posts.update(this.postId, {$inc: {commentsCount: -1}});
        //}
    /*},*/
    'click #comment-edit': function() {
        Router.go('comment.edit', {_id: this._id});
    },
    'click .votable': function(e, p) {
        e.preventDefault();
        Meteor.call('commentUpvote', this._id);
    }

});
