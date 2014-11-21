Template.success.helpers({
    success: function() {
        return Success.find();
    }
});

Template.successed.rendered = function() {
    var success = this.data;
    Meteor.setTimeout(function(){
        Success.remove(success._id);
    }, 3000);
};
