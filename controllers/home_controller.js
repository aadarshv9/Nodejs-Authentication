const passwordMailer = require('../mailers/password_mailer');
const generator = require('generate-password');
const User = require('../models/user');
const Bcrypt = require("bcryptjs");


module.exports.home = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect(`users/home/${req.user.id}`);
    }

    return res.render('home', {
        title: "Nodejs Authentication | Home",
    });

}

module.exports.forgotPassword = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect(`users/home/${req.user.id}`);
    }

    return res.render('forgot_password', {
        title: "Nodejs Authentication | Forgot Password",
    });

}

module.exports.generatePassword = async function(req, res){

    if (req.isAuthenticated()){
        return res.redirect(`users/home/${req.user.id}`);
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            req.flash('error', 'Not Registered!'); 
            return res.redirect('back')
        }else{
            
            let password = generator.generate({
                length: 10,
                numbers: true
            });

            let user_info = {name: user.name, password: password, email: user.email};
            passwordMailer.newPassword(user_info);
            user.password = Bcrypt.hashSync(password, 10);
            user.save();
            console.log(user.password);
           

            req.flash('success', 'Password sent to your email-id!');
            return res.redirect('/');
        }

    });
    
}