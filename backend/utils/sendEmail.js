const nodemailer = require("nodemailer");
require("dotenv").config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
});

//
const sendEmail = async ({ toemail, subject, message }) => {
  
  const mailOptions = {
    from: `"Hostel pvt ltd" <${email}>`, // sender address
    to: toemail, // list of receivers
    subject: subject, // Subject line
    html: message, // plain text body
  };

  try {
    // send mail with defined transport object
    const result = await transporter.sendMail(mailOptions)
    console.log(result);
    return result
  } catch (error) {
    //  Handle errors here

    throw error;
  }
}

module.exports = sendEmail;


