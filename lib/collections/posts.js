Posts = new Mongo.Collection("posts");

Posts.allow({
  update: function(userId, doc) {
      return  true; 
  },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
   update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title', 'commentsCount').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    if(modifier.$set){
    var errors = validateEdit(modifier.$set);
    return errors.title || errors.url;
    }
  }
});

validatePost = function(post){
    var errors = {};
    var urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    var postWithSameLink = Posts.findOne({url: post.url});

    if(!post.title){
        errors.title = "The title field is required.";
    }
    if(!post.url){
        errors.url = "The url field is required.";
    }
    if(!urlRegex.test(post.url)){
        errors.url = "Invalid url.";
    }
    if(postWithSameLink){
        errors.url = "This url is existed.";
    }
    return errors;
};

validateEdit = function(post){
    var errors = {};
    var urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    if (!post.title)
    errors.title = "Please fill in a headline";
    if (!post.url)
    errors.url =  "Please fill in a URL";
    if(!urlRegex.test(post.url))
    errors.url = "Invalid url";


  return errors;

}

Meteor.methods({
    postInsert: function(postAttributes){
        //check title and url
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });
        var errors = validatePost(postAttributes);
        if(errors.title || errors.url){
            throw new Meteor.Error('invalid', errors.title?errors.title:errors.url);
        };

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            commentsCount: 0,
            submitted: new Date(),
            upvoters: [],
            votes: 0
        });
        var postId = Posts.insert(post);
        Meteor.users.update({_id: user._id}, {$inc: {"profile.postCount": 1}});
        return {
            _id: postId
        };
    },

    upvote: function(postId) {
        check(this.userId, String);
        check(postId, String);
        var post = Posts.findOne(postId);
        if (!post)
          throw new Meteor.Error('invalid', 'Post not found');
        if (_.include(post.upvoters, this.userId))
          throw new Meteor.Error('invalid', 'Already upvoted this post');
        Posts.update(post._id, {
          $addToSet: {upvoters: this.userId},
          $inc: {votes: 1}
        });
      }
});
