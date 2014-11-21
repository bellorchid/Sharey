Template.postItem.helpers({
    'isAuthor': function(){
        if(Meteor.user().username == this.author){
            return true;
        }
    },
    'submitted': function(){
        return this.submitted.toLocaleDateString();
    },
    'commentCount': function(){
        return Comments.find({postId: this._id}).count();
    }
});

Template.postItem.events({
    'click #discuss': function(){
        Router.go('post.page', {_id: this._id});
    }
});
