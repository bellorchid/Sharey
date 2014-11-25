Template.mailSubscribe.events({
    'click #subscribe': function(e, template){
        e.preventDefault();
        var email = template.$('#email').val();
        var apikey = "7a3d641c36ca6486904679eac0c6fc0e-us9";
        var listid = "6fa4e67eab";
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
