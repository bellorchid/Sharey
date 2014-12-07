Messages = new Mongo.Collection('messages');

Meteor.methods({
    messageInsert: function(message){
        check(Meteor.userId(), String);
        check(message, {
            body: String,
            username: String
        });

        var submitted = new Date();
        message = _.extend(message, {submitted: submitted});
        return Messages.insert(message);
    }
});
