const nodeMailer = require('../config/nodemailer');
require('dotenv').config();

exports.newPassword = (user) => {

    let htmlString = nodeMailer.renderTemplate({user: user}, '/user/new_password.ejs');
    // using transporter of nodemail to send mail
    nodeMailer.transporter.sendMail({
       from: process.env.user_id,
       to: user.email,
       subject: "New Password Generated!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}