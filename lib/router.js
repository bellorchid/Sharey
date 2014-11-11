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
