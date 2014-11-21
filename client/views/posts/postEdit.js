Template.postEdit.created = function() {
    Session.set('postEditErrors', {});
}

Template.postEdit.helpers({
    errorMsg: function(field){
        return Session.get('postEditErrors')[field];
    },
    errorClass: function(field){
        return !!Session.get('postEditErrors')[field]?'has-error':'';
    }
});

Template.postEdit.events({
    'submit form': function(event, template){
        event.preventDefault();
        var currentPostId = this._id;

        var post = {
            url: event.target.url.value,
            title: event.target.title.value
        };

        Posts.update(currentPostId, {$set: post},function(error){
            if(error){
                throwError("Something is wrong!");
            }
            else { Router.go('post.page', {_id: currentPostId}); }
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
