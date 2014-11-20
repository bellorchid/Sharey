Accounts.onCreateUser(function(options, user){
    user.profile = { postCount: 0 };
    return user;
});
