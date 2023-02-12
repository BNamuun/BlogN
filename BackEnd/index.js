// Requiring module like importing cors and express
const express = require("express");
const cors = require("cors");
// Port Number
const port = 8000;
// creating express app
const app = express();
app.use(cors());
// enabling CORS for any unknown origin(https://xyz.example.com)
// sample api routes for testing
app.get("/", (req, res) => {
  res.send("Hello");
});
// app.get("/users", (req, res) => {
//   res.json(users);
// });
app.listen(port, () => {
  console.log("App is listening at port", port);
});
