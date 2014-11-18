Meteor.publish('posts', function(options){
    check(options, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, options);
});
