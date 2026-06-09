const express = require("express");
const router =  express.Router();
const authController = require("../controllers/auth_controller");

const {registerRules, loginRules} = require("../validators/auth_validator");
const validate = require("../middlewares/validate");

router.post("/register", registerRules, validate, authController.register);
router.post("/login", loginRules, validate, authController.login);


module.exports = router;