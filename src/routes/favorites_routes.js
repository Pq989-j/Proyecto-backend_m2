import express from "express";
import { addFavoriteMovie } from "../controllers/auth_controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.put("/:movieId", verifyToken, addFavoriteMovie);

export default router;