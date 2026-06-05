const {body} = require('expres-validator');

const createMovierules = () => [
    
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
    .isInt({
        min: 1888,
        max: new Date().getFullYear() + 5
    })
    .withMessage('El año de lanzamiento no es válido')
    .trim()
]

const updateMovieRules = () => [
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
    createMovierules,
    updateMovieRules
}