const Post = require('../models/post');

module.exports.home = function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(`Error in finding Posts --> Home Controller: ${err}`);
            return;
        }
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });
}