import "dotenv/config";
import express from "express";

const app = express();
const port = process.env["PORT"];

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Express App. Running on port ${port}`);
});
