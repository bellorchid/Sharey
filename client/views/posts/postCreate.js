Template.postCreate.created = function() {
    Session.set('postCreateErrors', {});
}
Template.postCreate.helpers({
    errorMsg: function(field){
        return Session.get('postCreateErrors')[field];
    },
    errorClass: function(field){
        return !!Session.get('postCreateErrors')[field]?'has-error':'';
    }
});

Template.postCreate.events({
    'blur #title, blur #url': function(event, template){
        var post = {
            title : template.$('#title').val(),
            url   : template.$('#url').val()
        };
        var errors = validatePost(post);
        if(errors.title || errors.url){
            Session.set('postCreateErrors', errors);
        } else {
            Session.set('postCreateErrors', {});
        }
    },

    'submit form': function(event, template){
        event.preventDefault();
        var title = event.target.title.value;
        var url = event.target.url.value;
        var post = {
            title: title,
            url: url
        };
        Meteor.call('postInsert', post, function(errors, result){
            if(errors)
                return throwError(errors.reason);
            throwSuccess("Created successful!");
            Router.go('post.page', {_id: result._id});
        });
    }
});
