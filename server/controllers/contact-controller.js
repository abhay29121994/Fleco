const Contact = require("../models/contact-model");

const contactFormData = async (req, res) => {
  try {
    const response = await Contact.create(req.body);
    res.status(200).json({ message: "Message send successfully.", response });
  } catch (error) {
    res.status(500).json({ message: "Message not send. " });
  }
};

module.exports = contactFormData;
