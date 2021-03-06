const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            // comment = comment.populate('user', 'name email').execPopulate();
            // commentsMailer.newComment(comment);
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post Created!"
                });
            }
            req.flash('success', 'Comment Published :)');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Deleted"
                });
            }
            req.flash('success', 'Comment Deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'Not Authorized');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}