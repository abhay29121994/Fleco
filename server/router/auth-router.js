const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");
const { signUpSchema, loginSchema } = require("../validators/auth-validator");
const validateMiddleware = require("../middlewares/validate-middleware");
const AuthMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(AuthController.home);

router
  .route("/register")
  .post(validateMiddleware(signUpSchema), AuthController.register);

router
  .route("/login")
  .post(validateMiddleware(loginSchema), AuthController.login);

router.route("/user").get(AuthMiddleware, AuthController.user);

module.exports = router;
