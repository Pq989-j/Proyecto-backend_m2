const { body, param } = require('express-validator'); // :white_check_mark: Corregido express y añadido param

// :white_check_mark: Corregido: Ahora es un Array directo y con la 'R' mayúscula
const createMovieRules = [
    body('title')
        .notEmpty()
        .withMessage('El título es obligatorio')
        .trim(),

    body('director')
        .notEmpty()
        .withMessage('El director es obligatorio')
        .trim(),

    body('release')
        .notEmpty()
        .withMessage('El año de lanzamiento es obligatorio')
        .isInt({ min: 1888 })
        .withMessage('El año de lanzamiento debe ser un número entero válido')
];

// :white_check_mark: Corregido: Ahora es un Array directo
const updateMovieRules = [
    param("id")
        .isMongoId()
        .withMessage("El id no es válido"),

    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio"),

    body('director')
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El director es obligatorio"),

    body('release')
        .optional()
        .notEmpty()
        .withMessage("El año de lanzamiento es obligatorio")
        .isInt({ min: 1888 })
        .withMessage("El año de lanzamiento debe ser válido")
];

module.exports = {
    createMovieRules,
    updateMovieRules
};