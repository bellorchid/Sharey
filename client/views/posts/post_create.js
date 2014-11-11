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
        Posts.insert(data);
        Router.go('home');
    }
});
