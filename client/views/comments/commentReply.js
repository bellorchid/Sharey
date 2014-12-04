Template.commentReply.created = function() {
  Session.set('commentReplyErrors', {});
};

Template.commentReply.helpers({
  errorMessage: function(field) {
    return Session.get('commentReplyErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentReplyErrors')[field] ? 'has-error' : '';
  }
});

Template.commentReply.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var $body = $(e.target).find('[name=body]');
    var postId = template.data.postId;
    var reply = {
      body: $body.val(),
      postId: postId,
      parentCommentId: this._id,
    };

    var errors = {};
    if (! comment.body) {
      errors.body = "Please write some content";
      return Session.set('commentReplyErrors', errors);
    } else {
        errors.body = "";
        Session.set('commentReplyErrors', errors);
    }
    
    Meteor.call('commentReplyInsert', reply, function(error, result) {
      if (error){
        throwError(error.reason);
      } else {
          //TODO fix not fresh
          //bad fix now
          throwSuccess('reply successfully');
          Router.go('post.page', {_id: postId});
      }
    });
  }
});
