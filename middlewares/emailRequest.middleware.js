// Middleware to verify request body for sending emails
const verifyEmailRequestBody = (req, res, next) => {
    const { emails, subject, content, sender } = req.body;
  
    // Check if emails, subject, content, and sender are present
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ message: 'Invalid or missing "emails". It should be a non-empty array of email addresses.' });
    }
  
    if (!subject || typeof subject !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing "subject". It should be a non-empty string.' });
    }
  
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing "content". It should be a non-empty string.' });
    }
  
    if (!sender || typeof sender !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing "sender". It should be a non-empty string.' });
    }
  
    // Verify if each email in the array is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const email of emails) {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: `Invalid email format: ${email}` });
      }
    }
  
    // If all checks pass, proceed to the next middleware or route handler
    next();
  };
  
  module.exports = verifyEmailRequestBody;
  