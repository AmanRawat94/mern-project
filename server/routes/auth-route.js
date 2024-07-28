const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
// const { signUpSchema, loginSchema } = require("../validators/auth-validator");
// const validate = require("../middlewares/validate-middleware");

// router.route("/").get(authController.home);
// router.route("/register").post(validate(signUpSchema), authController.register);
// router.route("/login").post(validate(loginSchema), authController.login);
// router.route("/google").post(authController.google);

// router.route("/").get(authController.home);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/google").post(authController.google);

module.exports = router;
