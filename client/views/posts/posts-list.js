Template.posts_list.helpers({
    posts: function(){
        return Posts.find({},{sort:{submitted: -1}});
    }
});

