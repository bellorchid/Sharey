Comments = new Mongo.Collection('comments');

Comments.allow({
    //TODO permission specify
    update: function() {
        return true;
    },
    remove: function(userId, comment) {
        return comment.userId === userId;
    }
});

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      body: String,
      postId: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
  
    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      upvoters: [],
      votes: 0
    });

    Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    comment._id = Comments.insert(comment);

    var notification = {
        title: comment.author + ' 评论了你的 ' + post.title,
        link: '/posts/' + post._id,
        receiveUser: post.userId,
        sendUser: user._id
    };

    createNotification(notification);
    
    return comment._id;
  },

  commentReplyInsert: function(replyAttributes){
      check(this.userId, String);
      check(replyAttributes, {
          body: String,
          postId: String,
          parentCommentId: String
      });

      var user = Meteor.user();
      var parentId = replyAttributes.parentCommentId;
      var parentComment = Comments.findOne(parentId);
      var ancestors = [parentId];

      ancestors = ancestors.concat(Comments.findOne(parentId).ancestorsId);

      reply = _.extend(replyAttributes, {
          userId: user._id,
          author: user.username,
          submitted: new Date(),
          ancestorsId: ancestors
      });
      
      reply._id = Comments.insert(reply);

      Posts.update(reply.postId, {$inc: {commentsCount: 1}});

      var notification = {
        title: reply.author + ' 回复了你的评论 ' + parentComment.body,
        link: '/comments/' + parentComment._id,
        receiveUser: parentComment.userId,
        sendUser: user._id
      };

      createNotification(notification);

      return reply._id;
  },

  commentUpvote: function(commentId){
        check(this.userId, String);
        check(commentId, String);

        var affected = Comments.update({
          _id: commentId, 
          upvoters: {$ne: this.userId}
        }, {
          $addToSet: {upvoters: this.userId},
          $inc: {votes: 1}
        });
        if (! affected)
          throw new Meteor.Error('invalid', "You weren't able to upvote that comment");     
  }
});

