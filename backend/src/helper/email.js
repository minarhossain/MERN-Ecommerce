const nodemailer = require('nodemailer');
const { smtpUser, smtpPassword } = require('../secret');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: smtpUser,
        pass: smtpPassword,
    },
});


const emailWithNodemailer = async (emailData) => {
    try {
        const mailOptions = {
            from: smtpUser,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html, // html body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message Sent : ', info.response)

    } catch (error) {
        console.error('Error occured while sending email: ', error)
        throw error;
    }

}


module.exports = emailWithNodemailer;