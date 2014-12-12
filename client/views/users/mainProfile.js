Template.mainProfile.helpers({
    email: function() {
        return this.emails[0].address;
    }
});

Template.mainProfile.events({
    'click .profile-edit': function(e, p) {
        Router.go('user.edit', {_id: this._id});
    }
});
