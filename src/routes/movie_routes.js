import express from "express";
const router = express.Router();
import * as movieController from "../controllers/movie_controller.js";

import { createMovieRules, updateMovieRules } from "../validators/movies_validator.js";

import verifyToken from "../middlewares/verifyToken.js";
import validate from "../middlewares/validate.js";

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", verifyToken, createMovieRules, validate, movieController.createMovie);
router.put("/:id", verifyToken, updateMovieRules, validate, movieController.updateMovie);
router.delete("/:id", verifyToken, movieController.deleteMovie);  

export default router;