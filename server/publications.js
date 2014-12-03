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
    var childCommentIds = _.pluck(Comments.find({parentCommentId: commentId}, {fields:{_id:1}}).fetch(), '_id'); //get the array of childCommentIds
    commentIds = commentIds.concat(childCommentIds); //join id
    return Comments.find({_id: {$in: commentIds}}); //find comments which _id is in commentId
});
