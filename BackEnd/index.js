// Requiring module like importing cors and express
const { v4: uuid } = require("uuid");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { connection } = require("./config/mySql");
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

  connection.query(
    `insert into category Values(?,?)`,
    [uuid(), name],
    function (err, results, fields) {
      res.sendStatus(201);
    }
  );

  // const categories = readCategories();
  // const newCategory = { id: uuid(), name: name };
  // categories.unshift(newCategory);
  // fs.writeFileSync("./Data/Categories.json", JSON.stringify(categories));
  // res.sendStatus(201);
});

app.get("/categories", (req, res) => {
  // const categories = readCategories();
  // res.json(categories);

  connection.query(`select * from category`, function (err, results, fields) {
    res.json(results);
  });
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `select * from category where id = ?`,
    [id],
    function (err, results, fields) {
      console.log(results[0]);
      res.json(results[0]);
    }
  );
  // const categories = readCategories();
  // const index = categories.findIndex((element) => element.id === id);
  // if (index > -1) {
  //   const editedName = categories[index];
  //   // console.log({ editedName });
  //   res.json(editedName);
  // } else {
  //   res.sendStatus(404);
  // }
});
app.put("/categories/:id", (req, res) => {
  const categories = readCategories();
  const { id } = req.params;
  const { name } = req.body;
  connection.query(
    `UPDATE category set name=? where id = ?`,
    [name, id],
    function (err, results, fields) {
      res.json({ Updatedid: id });
    }
  );

  // const index = categories.findIndex((element) => element.id === id);
  // if (index > -1) {
  //   categories[index].name = name;
  //   fs.writeFileSync("./Data/Categories.json", JSON.stringify(categories));
  //   res.json({ updatedId: id });
  // } else {
  //   res.sendStatus(404);
  // }
});
app.get("/categories", (req, res) => {
  connection.query("SELECT * FROM `category`", function (err, results, fields) {
    res.json({ results });
    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  });
});
app.get("/category/updateAllCategory", (req, res) => {
  connection.query("SELECT * FROM ")
})
app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE from category where id = ?`,
    [id],
    function (err, results, fields) {
      res.json({ DeletedID: id });
    }
  );
  // const content = readCategories();
  // const matchedOne = content.find((content) => content.id === id);
  // if (matchedOne) {
  //   const categories = content.filter((category) => category.id !== id);
  //   fs.writeFileSync("./Data/Categories.json", JSON.stringify(categories));
  //   res.json({ deletedID: id });
  // } else {
  //   res.sendStatus(404);
  // }
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

app.post("/articles", (req, res) => {
  const { title, categoryId, text } = req.body;
  console.log({ title, categoryId, text });
  connection.query(
    `insert into articles Values(?,?,?,?)`,
    [uuid(), title, text, categoryId],
    function (err, results, fields) {
      res.sendStatus(201);
    }
  );
});

app.listen(port, () => {
  console.log("App is listening at port", port);
});
