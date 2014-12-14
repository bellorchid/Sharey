Session.set('newMessage', false);

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
        if(!body.val()) {
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

Template.chatContainer.rendered = function(){
    Tracker.autorun(function() {
        var messageNum = Messages.find().count();
        $('.chat-wrap').animate({ scrollTop: 9999 }, 50);
    });
};
