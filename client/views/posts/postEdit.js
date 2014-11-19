Template.PostEdit.helpers({
    
});

Template.PostEdit.events({
    'submit form': function(event, template){
        event.preventDefault();
        var currentPostId = this._id;

        var postProperties = {
            url: event.target.url.value,
            title: event.target.title.value
        };

        Posts.update(currentPostId, {$set: postProperties},function(error){
            if(error){
                throwError(error.reason);
            }
            else { Router.go('home'); }
        });
    },

    'click .delete': function(event, template){
        event.preventDefault();
        if (confirm("Delete this post?")) {
          var currentPostId = this._id;
          Posts.remove(currentPostId);
          Router.go('home');
        }
    }
});
