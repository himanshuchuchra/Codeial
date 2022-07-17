const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log(`Inside New Comment Mailer :)`);
    nodemailer.transporter.sendMail({
        from: 'mail.codeial@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published :)',
        html: '<h1>Yup, Your Comment is Published :)</h1>'
    }, (err, info) => {
        if(err){
            console.log(`Error in sending mail: ${err}`);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}