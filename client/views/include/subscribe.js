Template.mailSubscribe.events({
    'click #subscribe': function(e, template){
        e.preventDefault();
        var email = template.$('#email').val();
        var apikey = Meteor.settings.public.mailchimp_apikey;
        var listid = Meteor.settings.public.mailchimp_list;
        var mailchimp = new MailChimp(apikey, {version: '2.0'});
        mailchimp.call(
            'lists',
            'subscribe',
            {
                apikey: apikey,
                id: listid,
                email: 
                {
                    email: email
                },
            },
            function(error, result) {
                if(error){
                    throwError(error.message);
                } else {
                    throwSuccess('Subscribe successfully!');
                }
            }
        );
    }
});
