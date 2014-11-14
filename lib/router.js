Router.configure({
    layoutTemplate: 'default',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){return Meteor.subscribe('posts');}
});

Router.route('/',{
    name: 'home',
    template: 'posts_list',
    action: function(){
        this.render();
    }
});

Router.route('/post',{
    name: 'post.create',
    template: 'post_create'
});

Router.route('/posts/:_id/edit', {
    name: 'post.edit',
    data: function() { return Posts.findOne(this.params._id); }
});

var requireLogin = function(){
    if(! Meteor.user()){
        this.render('accessDenied');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: ['post.create']});
