import express from "express";
const router = express.Router();
import * as authController from "../controllers/auth_controller.js";


import {registerRules, loginRules} from "../validators/auth_validator.js";
import validate from "../middlewares/validate.js";
import verifyToken from "../middlewares/verifyToken.js"

router.post("/register", registerRules, validate, authController.register);
router.post("/login", loginRules, validate, authController.login);
router.get("/profile", verifyToken, validate, authController.getProfile);
router.delete("/:userId", verifyToken, authController.deleteUser);
router.put("/favorites/:movieId", verifyToken, authController.addFavoriteMovie);
router.delete("/favorites/:movieId", verifyToken, authController.deleteFavoriteMovie);



export default router;