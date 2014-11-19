Router.configure({
    layoutTemplate: 'default',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function(){
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function(){
        return {sort: {submitted: -1}, limit: this.postsLimit()};
    },
    subscriptions: function(){
        this.postsSub = Meteor.subscribe('posts',this.findOptions());
    },
    posts: function(){
        return Posts.find({}, this.findOptions());
    },
    data: function(){
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore?nextPath:null
        };
    }
});

Router.route('/:postsLimit?', {
    name: 'home',
    controller: PostsListController
});

Router.route('/new/:postsLimit?', {
    name: 'postsList',
});

Router.route('/post/submit',{
    name: 'post.create',
    subscriptions: function() {
        return Meteor.subscribe('allPosts');
    }
});

Router.route('/posts/:_id/edit', {
  name: 'post.edit',
  waitOn: function() { 
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: ['post.create']});
