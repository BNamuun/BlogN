const express = require("express");
const { v4: uuid } = require("uuid");
const { connection } = require("../config/mySql");
const router = express.Router();
// const mongoose = require("mongoose");

router.post("/", (req, res) => {
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

router.post("/test", (req, res) => {
  const { posts } = req.body;
  console.log(posts);
  posts.map((post) =>
    connection.query(
      `insert into articles (id, title, content) Values(?,?,?)`,
      [
        uuid(),
        post.title,
        post.body,
        // post.id,
      ]
    )
  );
});

router.get("http://localhost:8000/articles/populate", (req, res) => {
  axios.get("https://dummyjson.com/posts?limit=150").then(function ({ data }) {
    const { posts } = data;
    posts.forEach((post) => {
      const { title, body } = post;
      const newArticle = {
        id: uuid(),
        title: title,
        content: body,
      };
      connection.query(
        `insert into article set ?`,
        newArticle,
        function (err, results, fields) {
          console.log(post.id);
        }
      );
    });
  });
  res.json(["populate"]);
});

router.get("/", (req, res) => {
  const { page, size, categoryId } = req.query;
  connection.query(`Select article.id, title, category.name`);
});
// router.get("/articles/updateAllCategory", (req, res) => {
//   connection.query("SELECT * from category", function (err, results, fields) {
//     const categories = results;

//     connection.query(
//       "SELECT * FROM `articles`",
//       function (err, results, fields) {
//         results.forEach((article, index) => {
//           const categoryIndex = index % categories.length;
//           connection.query(
//             `insert into articles Values(category_id)`,
//             [categories[categoryIndex].id],
//             function (err, results, fields) {
//               res.sendStatus(201);
//             }
//           );
//         });
//       }
//     );
//     res.json({ results });
//     // console.log(results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//   });
// });

module.exports = {
  articleRouter: router,
};
