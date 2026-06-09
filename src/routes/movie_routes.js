import express from "express";
const router = express.Router();
import * as movieController from "../controllers/movie_controller.js";

import { createMovieRules, updateMovieRules } from "../validators/movies_validator.js";

import validate from "../middlewares/validate.js";

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", createMovieRules, validate, movieController.createMovie);
router.put("/:id", updateMovieRules, validate, movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);  

export default router;