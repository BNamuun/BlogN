// Requiring module like importing cors and express
const { v4: uuid } = require("uuid");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
// encrypt the pass into shifr,, example
const hash = bcrypt.hashSync("phone");
console.log({ hash });
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
app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  const content = readCategories();
  const matchedone = content.find(content.id === id);
});
const userInfo = {
  username: "Namuun",
  // pass: "phone",
  pass: "$2a$10$CAmsk4m9CJjup6CN0m4pYuzM.ho2SKEzukejWe5GD.VgsWT.9AIai",
};
let userTokens = [];

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  console.log({ username, password });
  if (
    userInfo.username === username &&
    bcrypt.compareSync(password, userInfo.pass)
  ) {
    const token = uuid();
    userTokens.push(token);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log("App is listening at port", port);
});
