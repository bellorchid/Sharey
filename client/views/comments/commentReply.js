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
    var comment = {
      body: $body.val(),
      postId: template.data.postId,
      parentCommentId: this._id,
    };
    console.log(comment.parentCommentId);

    var errors = {};
    if (! comment.body) {
      errors.body = "Please write some content";
      return Session.set('commentReplyErrors', errors);
    } else {
        errors.body = "";
        Session.set('commentReplyErrors', errors);
    }

    Meteor.call('commentReplyInsert', comment, function(error, result) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
