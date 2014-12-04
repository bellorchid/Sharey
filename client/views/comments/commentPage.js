Template.commentPage.helpers({
    post: function() {
        console.log(this.comment);
        return Posts.findOne(this.comment.postId);
    }
});
