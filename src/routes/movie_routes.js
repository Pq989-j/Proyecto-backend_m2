const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie_controller");

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);  

module.exports = router;