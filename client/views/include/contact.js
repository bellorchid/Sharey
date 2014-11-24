Template.pageContact.events({
    'click #mailme': function(event, template){
        event.preventDefault();
        var from = template.$('#email').val();
        var subject = template.$('#subject').val() || 'nosubject';
        var message = template.$('#message').val();
        if(from && message){
        Meteor.call('sendEmail',
          'birdeggegg@gmail.com',
           from,
           subject,
           message);
        throwSuccess('Send successful!Thank you for contacting!');
        } else {
            throwError('You must enter email and content!');
        }
    }
});
