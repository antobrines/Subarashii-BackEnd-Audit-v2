'use strict';
const nodemailer = require('nodemailer');
const config = require('../config');

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (to, subject, htmlBody) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: config.email.smtp,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.username,
      pass: config.email.password,
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

  return !!info.messageId;
};

module.exports = {
  sendMail
};