Users = Meteor.users;
Users.allow({
    update: function(userId, doc, fieldNames){
        return userId;
    }
});

Meteor.methods({
    usersUpsert: function(user){
        return Users.update(user._id, { $set: {away:false} }, { upsert: true });
    }
});
