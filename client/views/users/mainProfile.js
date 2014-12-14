Template.mainProfile.helpers({
    email: function() {
        return this.emails[0].address;
    },
    isSameUser: function() {
        return Meteor.userId() === this._id;
    },
    avatar: function() {
        var avatarUrl =  "https://avatars.githubusercontent.com/" + this.profile.github; 
        console.log(this);
        return avatarUrl;
    }
});

Template.mainProfile.events({
    'click .profile-edit': function(e, p) {
        Router.go('user.edit', {_id: this._id});
    }
});
