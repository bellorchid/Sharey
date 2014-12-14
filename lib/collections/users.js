Users = Meteor.users;

Users.allow({
    update: function(userId, doc, fieldNames){
        //TODO permission specify
        return true;
    }
});

/*Meteor.methods({*/
    //usersUpsert: function(user){
        //return Users.update(user._id, { $set: {away:false} }, { upsert: true });
    //}
/*});*/
