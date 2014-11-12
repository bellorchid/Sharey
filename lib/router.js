Router.route('/', function(){
    this.layout('default');
    this.render('posts_list');
    },{
    name: 'home'
});

Router.route('/post', function(){
    this.layout('default');
    this.render('post_create');
    },{
    name: 'post.create'
});

var requireLogin = function(){
    if(! Meteor.user()){
        this.render('accessDenied');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: 'post.create'});
