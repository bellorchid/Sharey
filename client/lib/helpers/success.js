Success = new Mongo.Collection(null);

throwSuccess = function(message) {
    Success.insert({message: message});
}
