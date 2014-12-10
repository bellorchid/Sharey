Template.postItem.helpers({
    isAuthor: function(){
        return Meteor.userId() === this.userId;
    },
    submitted: function(){
        return this.submitted.toLocaleDateString();
    },
    domain: function(){
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    upvotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
          return 'fa-thumbs-o-up';
        } else {
          return 'fa-thumbs-up';
        }
    }
});

Template.postItem.events({
    'click #discuss': function(){
        Router.go('post.page', {_id: this._id});
    },
    'click .fa-thumbs-o-up': function(e, p) {
        e.preventDefault();
        Meteor.call('upvote', this._id);
    }
});
