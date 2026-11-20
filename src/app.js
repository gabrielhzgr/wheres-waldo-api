import "dotenv/config";
import cors from "cors";
import express from "express";
import levels from "./routes/levels.js";
import cookieParser from "cookie-parser";
import errors from "./errors/index.js";

const app = express();
const port = process.env["PORT"];

// === App Middleware ===
const whitelist = [
  "http:localhost:5173",
  "https://wheres-waldo-api-0g9p.onrender.com",
];
app.use(express.json());

app.use((req, res, next) => {
  if (process.env["ENV"] == "prod") {
    res.header(
      "Access-Control-Allow-Origin",
      "https://whereis-waldo.netlify.app",
    );
  } else {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Request-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});
app.use(cookieParser(process.env["SECRET"]));

// === Routes ===
app.use("/levels", levels);

// === 404 ===
app.use((req, res) => {
  console.log("Not found URL: ", req.originalUrl);
  throw new errors.NotFoundError("Not found");
});

// === err middleware ===
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal server error";
  const name = err.statusCode ? err.name : "Internal Server error";
  console.log(err);
  res.status(statusCode).json({ error: message, name });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Express App. Running on port ${port}`);
});
