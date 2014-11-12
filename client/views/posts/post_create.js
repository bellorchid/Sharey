Template.post_create.events({
    'submit form': function(event, template){
        event.preventDefault();
        var title = event.target.title.value;
        var url = event.target.url.value;
        var data;
        data = {
            title: title,
            url: url
        };
        Meteor.call('postInsert', data, function(error, result){
            if(error)
                return alert(error.reason);
            Router.go('home');
        });
    }
});
