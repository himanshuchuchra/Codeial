const { request } = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "475119914833-ecgaqgd3n71p1q3k58o9566lv9l8iafh.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log(`Error --> Passport Google Strategy: ${err}`);
            return;
        }
        if(user){
            return done(null, user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                mobile_number: 000000000,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log(`Error in Creating User :: Passport Google Strategy: ${err}`);
                    return;
                }
                return done(null, user);
            });
        }
    });
}));

module.exports = passport;