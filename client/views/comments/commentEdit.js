Template.commentEdit.events({
    'submit #commentEdit-form': function(e, p) {
        e.preventDefault();
        var body = p.$('#body').val();
        var postId = this.postId;
        //console.log(body);
        if(!body) {
            throwError('不能为空！');
        }
        
        Comments.update(this._id, {$set: {body: body}}, function(error,result) {
            if(error) {
                throwError('出错啦！');
            } else {
                Router.go('post.page', {_id: postId});
                throwSuccess('更新成功');
            }
        });
    }
});
