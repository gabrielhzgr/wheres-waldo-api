import "dotenv/config";
import cors from "cors";
import express from "express";
import levels from "./routes/levels.js";

const app = express();
const port = process.env["PORT"];

// App Middleware
app.use(cors());

app.use("/levels", levels);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Express App. Running on port ${port}`);
});
