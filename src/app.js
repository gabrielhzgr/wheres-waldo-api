import "dotenv/config";
import cors from "cors";
import express from "express";
import levels from "./routes/levels.js";

const app = express();
const port = process.env["PORT"];

// App Middleware
app.use(cors());

app.use("/levels", levels);

// === 404 ===
app.use((req, res) => {
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
