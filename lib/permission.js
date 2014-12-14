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
    var userId = this.params._id;
    //console.log(userId);
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

