const User = require('../models/user');

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'Codeial | Profile Section',
            profile_user: user
        });
    });
}

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

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });
}