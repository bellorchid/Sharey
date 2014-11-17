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
    'blur #title': function(event, template){
        var title = event.target.value;
        if(title){
            Session.set("titleValidator", "has-success");
            Session.set("titleInfo", "");
        }
        else{
            Session.set("titleValidator", "has-error");
            Session.set("titleInfo", "(Title is required!)");
        }
    },

    'blur #url': function(event, template){
        var url = event.target.value;
        var urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

        if(!url){
            Session.set("urlValidator", "has-error");
            Session.set("urlInfo", "(Url is required!)");
        }
        else if(!urlRegex.test(url)){
            Session.set("urlValidator", "has-error");
            Session.set("urlInfo", "(Url is not valid!)");
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
