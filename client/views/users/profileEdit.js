Template.userEdit.helpers({
});

Template.userEdit.events({
    'submit form': function(e, p) {
        e.preventDefault();
        var username = e.target.username.value;
        var bio = e.target.bio.value;
        var website = e.target.website.value;
        var github = e.target.githubName.value;

        if(!username) {
            throwError('用户名不能为空');
        }
        var user = {
            username: username,
            profile: {
                bio: bio,
                website: website,
                github: github
            }
        };
        Users.update(this.user._id, {$set: user}, function(error){
            if(error) {
                throwError("出问题了～");
            } else {
                throwSuccess("更新成功！");
            }
        });
    }
});
