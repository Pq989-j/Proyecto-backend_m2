const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie_controller");

const { createMovieRules, updateMovieRules } = require ("../validators/movies_validator");

const validate = require ("../middlewares/validate");

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", createMovieRules, validate, movieController.createMovie);
router.put("/:id", updateMovieRules, validate, movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);  

module.exports = router;