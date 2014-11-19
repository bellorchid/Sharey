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
