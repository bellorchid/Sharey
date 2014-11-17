Template.post_item.helpers({
    'isAuthor': function(){
        if(Meteor.user().username == this.author){
            return true;
        }
    }
});
