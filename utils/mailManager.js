require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const footerTemplate = `
    <div style="background-color: #f4f4f4; padding: 10px; text-align: center; color: #666;">
        <p>&copy; {{year}} <b>MetaChip Mailing Services</b>. All rights reserved.</p>
        <p>Visit us at <a href="https://meta-chimp.netlify.app/">MetaChimp</a></p>
    </div>
`;

module.exports ={transporter,footerTemplate}