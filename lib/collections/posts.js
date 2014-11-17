Posts = new Mongo.Collection("posts");

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

validatePost = function(post){
    var errors = {};
    var urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    var postWithSameLink = Posts.findOne({url: post.url});

    if(!post.title){
        errors.title = "The title field is required.";
    }
    if(!post.url || !urlRegex.test(post.url)){
        errors.url = "The url is invalid.";
    }
    if(postWithSameLink){
        errors.url = "The url is excited.";
    }

    return errors;
};

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
        throw new Meteor.Error('invalid','The submit is invalid!Please check.');
    };

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
        _id: postId
    };
    }
});
