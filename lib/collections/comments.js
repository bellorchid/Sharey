Comments = new Mongo.Collection('comments');

Comments.allow({
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
      submitted: new Date()
    });

    Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    comment._id = Comments.insert(comment);

    var notification = {
        title: comment.author + ' comment on your post ' + post.title,
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
      var ancestors = [parentId];

      ancestors = ancestors.concat(Comments.findOne(parentId).ancestorsId);
      reply = _.extend(replyAttributes, {
          userId: user._id,
          author: user.username,
          submitted: new Date(),
          ancestorsId: ancestors
      });
      
      Posts.update(reply.postId, {$inc: {commentsCount: 1}});

      return Comments.insert(reply);
  }
});

