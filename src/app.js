const express = require("express");
const movieRouter = require("./routes/movie_routes");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth_routes");

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

module.exports = app;