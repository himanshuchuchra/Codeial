const User = require('../models/user');

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log(`Error in finding User during Sign-Up: ${err}`);
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log(`Error in Signing Up the User: ${err}`);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}