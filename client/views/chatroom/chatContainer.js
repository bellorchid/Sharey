Template.messageSubmit.events({
    'click .btn': function(e, p) {
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
        console.log(username);
    }
});
