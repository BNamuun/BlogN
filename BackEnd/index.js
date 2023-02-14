// Requiring module like importing cors and express
const {v4: uuid} = require("uuid")
const express = require("express");
const cors = require("cors");
const fs = require("fs")
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
function readCategories(){
  const content = fs.readFileSync("./Data/Categories.js");
  const categories = JSON.parse(content)
  return categories
}
// app.get("/users", (req, res) => {
//   res.json(users);
// });
app.post("/categories", (req,res) =>{
  const categories = readCategories();
  const {name} = req.body;
  const newCategories = {id: uuid(), name: name}
  categories.unshift(newCategories)
  fs.writeFileSync("./Data/Categories.js", JSON.stringify(categories))
  res.sendStatus(201)

})
app.listen(port, () => {
  console.log("App is listening at port", port);
});
