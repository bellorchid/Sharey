Router.configure({
    layoutTemplate: 'default',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [
            Meteor.subscribe('notifications')
        ]
    }
});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function(){
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function(){
        return {sort: this.sort, limit: this.postsLimit()};
    },
    subscriptions: function(){
        this.postsSub = this.subscribe('posts',this.findOptions());
    },
    posts: function(){
        return Posts.find({}, this.findOptions());
    },
    data: function(){
        var hasMore = this.posts().count() === this.postsLimit();
        return {
            posts: this.posts(),
            ready: this.postsSub.ready(),
            nextPath: hasMore?this.nextPath():null
        };
    }
});

NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function(){
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment});
    }
});


Router.route('/', {
    name: 'home',
    controller: NewPostsController
});

Router.route('/new/:postsLimit', {
    name: 'newPosts',
    controller: NewPostsController
});

Router.route('/post/submit',{
    name: 'post.create',
    //this subscribe is not nessary,we can validate at backend
    subscriptions: function() {
       this.subscribe('allPosts');
    }
});

Router.route('/posts/:_id', {
    name: 'post.page',
    subscriptions: function(){
        this.subscribe('singlePost', this.params._id);
        this.subscribe('comments', this.params._id);
    },
    data: function(){
        return {
            post: Posts.findOne(this.params._id),
            comments: Comments.find({postId: this.params._id, parentCommentId: { $exists: false }})
        }
    }
});

Router.route('/posts/:_id/edit', {
  name: 'post.edit',
  subscriptions: function() { 
     this.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/comments/:_id', {
    name: 'comment.page',
    waitOn: function() {
        return [
        Meteor.subscribe('singleComment', this.params._id),
        Meteor.subscribe('commentPost', this.params._id)
        ]
    },
    data: function() { 
        return {
            comment: Comments.findOne(this.params._id)
        }
    }
});

Router.route('/chatroom', {
    name: 'page.chatroom',
    template: 'chatroom'
});

Router.route('/page/contact', {
    name: 'page.contact'
});

var requireLogin = function() {
  if (!Meteor.user()) {
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
