require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');



// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // generated ethereal user
    pass: process.env.SMTP_PASS  // generated ethereal password
  }
});



// read list of email addresses from mail.txt file
fs.readFile('mail.txt', 'utf8', (err, data) => {
  if (err) throw err;


  // split email addresses by newline
  let emailList = data.split('\n');



  // loop through email addresses
  emailList.forEach(email => {

    // setup email data with unicode symbols
    let mailOptions = {
      from: ' "name" <example@mail.com>', // sender address
      to: email, // list of receivers
      subject: '', // Subject line
      html: '', // html body
      encoding: 'UTF-8'
    };


    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent to ' + email + ' successfully!');
    });
  });
});
