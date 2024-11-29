const express = require("express");
const router = express.Router();
const contactFormData = require("../controllers/contact-controller");
const validateMiddleware = require("../middlewares/validate-middleware");
const contactSchema = require("../validators/contact-validator");

router
  .route("/contact")
  .post(validateMiddleware(contactSchema), contactFormData);

module.exports = router;
