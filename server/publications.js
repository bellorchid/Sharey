Meteor.publish('posts', function(options){
    check(options, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, options);
});

Meteor.publish('allPosts',function(){
    return Posts.find();
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find(id);
});

Meteor.publish('comments', function(postId){
    check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('singleComment', function(commentId){ 
    check(commentId, String);
    var commentIds = [commentId];
    var childCommentIds = _.pluck(Comments.find({ancestorsId: commentId}, {field: {_id: 1}}).fetch(), '_id');
    commentIds = commentIds.concat(childCommentIds);
    return Comments.find({_id: {$in: commentIds}});
});

Meteor.publish('commentPost', function(commentId) {
    check(commentId, String);
    var postId = Comments.findOne(commentId).postId;
    return Posts.find(postId);
});

Meteor.publish('notifications', function() {
    return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('messages', function() {
    return Messages.find();
});

Meteor.publish('roomUsers', function(){
    return RoomUsers.find();
});
