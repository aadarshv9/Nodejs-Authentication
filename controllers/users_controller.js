const User = require('../models/user');
const Bcrypt = require("bcryptjs");
const request = require("request");
require('dotenv').config();

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    User.findById(req.user.id, function(err, user){
        return res.redirect(`/users/profile/${req.user.id}`);
    });
}

// get the sign up data
module.exports.create = function(req, res){

    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        req.flash('error', 'Failed Captcha Verification');
        return res.redirect('back');
    }
    // Put your secret key here.
    var secretKey = process.env.recaptcha_secret_key;
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            req.flash('error', 'Failed Captcha Verification');
            console.log("Failed Captcha Verification");
            return res.redirect('back');
        };
    });    
        
    // matching passwords
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    // finding if user already exists or not
    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}
                req.flash('success', 'You have signed up, login to continue!');
                return res.redirect('back');
            })
        }else{
            req.flash('success', 'Already Registered, login to continue!');
            return res.redirect('back');
        }

    });
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}

module.exports.home = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_home', {
            title: 'User Home',
            profile_user: user
        });
    });

}

module.exports.reset = function(req, res){
    if(req.user.id == req.params.id){
        res.render('reset_password', {
            title: 'reset_password',
            profile_user: req.user
        });
    }
}

module.exports.resetPassword = async function(req, res){
   

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            
            if(user && Bcrypt.compareSync(req.body.current_password, user.password)){
                if (req.body.new_password != req.body.confirm_password){
                    req.flash('error', 'Passwords do not match');
                    return res.redirect('back');
                }

                user.password = Bcrypt.hashSync(req.body.new_password, 10);
                req.flash('success', 'Password changed Successfully');
                user.save();
                return res.redirect(`/users/home/${req.user.id}`);
            }else{
                req.flash('error', 'Wrong Current Password');
                return res.redirect('back');
            }

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}