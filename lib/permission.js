ownsDocument = function(userId, doc){
    return doc && doc.userId === userId;
};

requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

isUserSelf = function() {
    var routeName = Router.current().route.getName();
    var userId;
    switch(routeName) {
        case 'user.edit': 
            userId = this.params._id;
            break;
        case 'post.edit':
            userId = Posts.findOne(this.params._id).userId;
            break;
        case 'comment.edit': 
            userId = Comments.findOne(this.params._id).userId;
            break;
        default:
            console.log('no match');
    };
    if(!Meteor.user()) {
        if(Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else if (userId !== Meteor.userId()) {
        this.render('permissionDenied');
    } else {
        this.next();
    }
};

