const express = require("express");
const movieRouter = require("./routes/movie_routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]${req.method}${req.url}`);
    next();
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/movies", movieRouter);

module.exports = app;