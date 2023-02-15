// Requiring module like importing cors and express
const { v4: uuid } = require("uuid");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { CategList } = require("../FrontBlog/src/Admin/CategList");

// Port Number
const port = 8000;
// creating express app
const app = express();
app.use(express.json());
app.use(cors());
// enabling CORS for any unknown origin(https://xyz.example.com)
// sample api routes for testing
app.get("/", (req, res) => {
  res.send("Hello");
});
function readCategories() {
  const content = fs.readFileSync("./Data/Categories.json");
  const categories = JSON.parse(content);
  return categories;
}
// app.get("/users", (req, res) => {
//   res.json(users);
// });
app.post("/categories", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  const categories = readCategories();
  const newCategory = { id: uuid(), name: name };
  categories.unshift(newCategory);
  fs.writeFileSync("./Data/Categories.json", JSON.stringify(categories));
  res.sendStatus(201);
});
app.get("/categories", (req, res) => {
  const categories = readCategories();
  res.json(categories);
});
app.put("/categories", (req, res) => {
  const categories = readCategories();
  const { id } = req.body;
  const deletedItem = categories.find((element) => element.id === id);
  if (deletedItem) {
    const UpdatedList = categories.filter((category) => category.id !== id);
    fs.writeFileSync("./Data/Categories.json", JSON.stringify(UpdatedList));
    res.json({ deleted: id });
  } else {
    res.sendStatus(404);
  }
});
app.listen(port, () => {
  console.log("App is listening at port", port);
});
