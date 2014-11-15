Session.set("titleValidator","");
Session.set("titleInfo","");
Session.set("urlValidator","");
Session.set("urlInfo","");
Session.set("buttonStatus","");

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
    },
    buttonStatus: function(){
        return Session.get("buttonStatus");
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
            Session.set("titleInfo", "(title is required)");
            Session.set("buttonStatus", "disabled");
        }
    },

    'blur #url': function(event, template){
        var url = event.target.value;
        if(url){
            Session.set("urlValidator", "has-success");
            Session.set("urlInfo", "");
        }
        else {
            Session.set("urlValidator", "has-error");
            Session.set("urlInfo", "(url is required)");
            Session.set("buttonStatus", "disabled");
        }
    },

    'blur fieldset': function(event,template){
        var title = event.target.title.value;
        var url = event.target.title.value;
        alert(title);
        if(title && url){
            Session.set("buttonStatus", "");
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
