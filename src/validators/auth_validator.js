const {body} = require("express-validator");

const registerRules = [
    body('email')
        .isEmail()
        .withMessage("El email no es válido")
        .normalizeEmail(),
    body('password')
        .isLength({min: 6})
        .withMessage("La constraseña debe tener minimo seis caracteres"),
];

const loginRules = [
    body("email")
        .isEmail()
        .withMessage("Email no válido")
        .normalizeEmail(),
    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria"),
];

module.exports = {registerRules, loginRules};