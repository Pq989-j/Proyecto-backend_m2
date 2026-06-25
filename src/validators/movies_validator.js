import { body, param } from 'express-validator'; // :white_check_mark: Corregido express y añadido param

// :white_check_mark: Corregido: Ahora es un Array directo y con la 'R' mayúscula
export const createMovieRules = [
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
        .withMessage('El año de lanzamiento debe ser un número entero válido'),

    body('poster')
        .notEmpty()
        .withMessage('El poster es obligatorio'),

    body('genre')
        .notEmpty()
        .withMessage('El o los generos son obligatorios')
        .isArray({ min: 1 })
        .withMessage('El campo debe ser un array con al menos un elemento.')


];

// :white_check_mark: Corregido: Ahora es un Array directo
export const updateMovieRules = [
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
        .withMessage("El año de lanzamiento debe ser válido"),

    body('poster')
        .optional()
        .notEmpty()
        .withMessage('El poster es obligatorio'),

    body('genre')
        .optional()
        .notEmpty()
        .withMessage('El o los generos son obligatorios')
        .isArray({ min: 1 })
        .withMessage('El campo debe ser un array con al menos un elemento.')

];
