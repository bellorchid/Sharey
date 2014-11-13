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

var requireLogin = function(){
    if(! Meteor.user()){
        this.render('accessDenied');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: 'post.create'});
