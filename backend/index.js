import express from "express";
const app = express();

let count = 0;

app.get("/api", (req, res) => {
  console.log(count);
  count++;
  res.json({
    message: "Hello World!",
  });
});

app.get("/api/data", (req, res) => {
  console.log(count);
  count++;
  res.json({
    message: "Hello World!",
    data: count,
  });
});

app.listen(5000, () => console.log("start"));
