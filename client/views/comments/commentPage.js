Template.commentPage.helpers({
    post: function() {
        return Posts.findOne(this.comment.postId);
    }
});
