Template.messageItem.helpers({
    sendat: function() {
        return this.submitted.toLocaleTimeString();
    }
});

Template.messageSubmit.events({
    'submit .chatForm': function(e, p) {
        e.preventDefault();
        var body = p.$('#message');
        var username = Meteor.user().username;
        if(!body) {
            throwError('Can\'t be empty');
        }
        var message = {
            body: body.val(),
            username: username
        }
        Meteor.call('messageInsert', message, function(error) {
            if(error) {
                throwError(error.reason);
            } else {
                body.val('');
            }
        });
    }
});
