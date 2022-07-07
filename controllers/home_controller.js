const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log(`Error in finding Posts --> Home Controller: ${err}`);
            return;
        }
        User.find({}, function(err, users){
            if(err){
                console.log(`Error in finding Users --> Home Controller: ${err}`);
                return;
            }
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        });
    });
}