Posts = new Mongo.Collection("posts");

Posts.allow({
    insert: function(userId,post){
        return !! userId;
    }
});
