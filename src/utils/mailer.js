'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, htmlBody) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.email_smtp,
    port: process.env.email_port,
    secure: false,
    auth: {
      user: process.env.email_username,
      pass: process.env.email_password,
    },
    tls: {
      rejectUnauthorized: false,
      ignoreTLS: false,
      requireTLS: true,
      minVersion: 'TLSv1',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.email_username, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: textBody, // plain text body
    html: htmlBody, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  sendMail
};