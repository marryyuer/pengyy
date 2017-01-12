var nodemailer = require('nodemailer');

module.exports = function(credentials) {
    var mailTransport = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: '465',
        secure: true,
        auth: {
            user: credentials.mail.user,
            pass: credentials.mail.password
        }
    });

    var from = 'Pengyy: <marrypen@163.com>';
    var errorRecipient = 'Pengyy: <664150686@qq.com>';
    return {
        sendEmail: function(to, subject, text) {
            mailTransport.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text
            }, function(err) {
                if(err) console.error('Unable to send email. ¥n' + err);
            });
        },
        mailError: function(message, filename, exception) {
            mailTransport.sendMail({
                from: from,
                to: errorRecipient,
                subject: 'email send error happened!',
                text: message
            }, function(err) {
                if(err) console.error('Unable to send email to ErrorRecipient!');
            });
        }
    };
};