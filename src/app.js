import express from "express";
import movieRouter from "./routes/movie_routes.js";
import cors from "cors";
const app = express();
import authRoutes from "./routes/auth_routes.js";

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]${req.method}${req.url}`);
    next();
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/movies", movieRouter);
app.use("/api/auth", authRoutes);

export default app;