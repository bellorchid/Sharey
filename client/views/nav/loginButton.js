Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        Router.go('user.profile', {_name: Meteor.user().username});
    }
});
