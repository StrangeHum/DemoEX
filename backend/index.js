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

app.get("/api/data", (req, res) => {
  res.json({
    id: 1,
    firstName: "jong",
  });
});
// export type User = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   surname: string;
//   email: string;
//   phone: string;
// };
app.listen(5000, () => console.log("start"));
