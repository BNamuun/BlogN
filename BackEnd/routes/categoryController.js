const express = require("express");
const { v4: uuid } = require("uuid");
const { connection } = require("../config/mySql");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const categorySchema = new mongoose.Schema({
  _id: String,
  name: String,
});

const Category = mongoose.model("Category", categorySchema);
router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "MxIo001Mp1", async function (err, decoded) {
    if (err) {
      res.sendStatus(401);
    } else {
      var decoded = jwt.verify(token, "MxIo001Mp1");
      console.log(decoded);
      const list = await Category.find({});
      res.json(list);
    }
  });
  //using MySql
  // connection.query("SELECT * FROM `category`", function (err, results, fields) {
  //   res.json(results);
  // console.log({ results });
  // });
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  //Mongooose
  await Category.create({
    _id: uuid(),
    name: name,
  });
  res.sendStatus(201);

  // when using MySQL database
  // connection.query(
  //   `insert into category Values(?,?)`,
  //   [uuid(), name],
  //   function (err, results, fields) {
  //     res.sendStatus(201);
  //   }
  // );

  // When using local folder without database
  // const categories = readCategories();
  // const newCategory = { id: uuid(), name: name };
  // categories.unshift(newCategory);
  // fs.writeFileSync("./Data/Categories.json", JSON.stringify(categories));
  // res.sendStatus(201);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log({ id });
  const one = await Category.findById(id);
  res.json(one);
});

// MySql
// connection.query(
//   `select * from category where id = ?`,
//   [id],
//   function (err, results, fields) {
//     console.log(results[0]);
//     res.json(results[0]);
//   }
// );
// const categories = readCategories();
// const index = categories.findIndex((element) => element.id === id);
// if (index > -1) {
//   const editedName = categories[index];
//   // console.log({ editedName });
//   res.json(editedName);
// } else {
//   res.sendStatus(404);
// }
// });
router.put("/:id", (req, res) => {
  // const categories = readCategories();
  const { id } = req.params;
  const { name } = req.body;
  // MongoDb

  Category.updateOne({ _id: id }, { name }).then(() => {
    res.json({ updatedId: id });
  });
  //MySql
  // connection.query(
  //   `UPDATE category set name=? where id = ?`,
  //   [name, id],
  //   function (err, results, fields) {
  //     res.json({ Updatedid: id });
  //   }
  // );

  // const index = categories.findIndex((element) => element.id === id);
  // if (index > -1) {
  //   categories[index].name = name;
  //   fs.writeFileSync("./Data/Categories.json", JSON.stringify(categories));
  //   res.json({ updatedId: id });
  // } else {
  //   res.sendStatus(404);
  // }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // MongoDb
  Category.deleteOne({ _id: id }).then(() => {
    res.json({ DeletedID: id });
    //MySql
    // connection.query(
    //   `DELETE from category where id = ?`,
    //   [id],
    //   function (err, results, fields) {
    //     res.json({ DeletedID: id });
  });
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

module.exports = {
  categoryRouter: router,
};
