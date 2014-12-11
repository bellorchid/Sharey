Accounts.onCreateUser(function(options, user){
    user.profile = {
        postCount: 0,
        bio: '',
        website: '',
        github: ''
    };
    return user;
});
