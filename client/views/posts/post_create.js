Session.set("titleValidator","");
Session.set("titleInfo","");
Session.set("urlValidator","");
Session.set("urlInfo","");

Template.post_create.helpers({
    titleValidator: function(){
        return Session.get("titleValidator");
    },
    titleInfo: function(){
        return Session.get("titleInfo");
    },
    urlValidator: function(){
        return Session.get("urlValidator");
    },
    urlInfo: function(){
        return Session.get("urlInfo");
    }
});

Template.post_create.events({
    'blur #title, blur #url': function(event, template){
        var post = {
            title : template.$('#title').val(),
            url   : template.$('#url').val()
        };
        var errors = validatePost(post);

        if(!errors.title){
            Session.set("titleValidator", "has-success");
            Session.set("titleInfo", "");
        }
        else{
            Session.set("titleValidator", "has-error");
            Session.set("titleInfo", "(Title is required!)");
        }

        if(errors.url === "empty"){
            Session.set("urlValidator", "has-error");
            Session.set("urlInfo", "(Url is required!)");
        }
        else if(errors.url === "invalid"){
            Session.set("urlValidator", "has-error");
            Session.set("urlInfo", "(Url is not valid!)");
        }
        else if(errors.url === "existed"){
            Session.set("urlValidator", "has-error");
            Session.set("urlInfo", "(This submit is existed!)");
        }
        else {
            Session.set("urlValidator", "has-success"); 
            Session.set("urlInfo", "");
        }
    },

    'submit form': function(event, template){
        event.preventDefault();
        var title = event.target.title.value;
        var url = event.target.url.value;
        var data = {
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
