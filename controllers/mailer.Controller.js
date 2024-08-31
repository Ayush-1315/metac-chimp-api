const {transporter,footerTemplate}=require("../utils/mailManager")

const mailService = async (req, res) => {
  const { emails, subject, content,sender } = req.body;

  const currentYear = new Date().getFullYear();
  const footer = footerTemplate.replace(/{{year}}/g, currentYear);
  const emailContent = content + footer;

  if (!Array.isArray(emails) || !subject || !content) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    for (const email of emails) {
      await transporter.sendMail({
        from: `${sender}<metachimp09@gmail.com>`, // Sender address
        to: email, // List of recipients
        subject: subject, // Subject line
        html: emailContent, // Plain text body
      });
    }
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Error sending emails" });
  }
};

module.exports = { mailService };
