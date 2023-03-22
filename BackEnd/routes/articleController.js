const express = require("express");
const { v4: uuid } = require("uuid");
const { connection } = require("../config/mySql");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuid() },
  title: String,
  content: String,
  categoryId: { type: String, ref: "Category" },
  image: {
    path: String,
    width: Number,
    height: Number,
  },
});
const Article = mongoose.model("Article", articleSchema);

router.get("/", async (req, res) => {
  const list = await Article.find({}).populate(categoryId);
  list: list,
  // count: 10,
});
router.post("/", (req, res) => {
  const { title, categoryId, text, image } = req.body;
  console.log({ title, categoryId, text, image });
  const newArticles = {
    id: uuid(),
    title: title,
    content: text,
    category_id: categoryId,
    image: image,
  };
  connection.query(
    `insert into articles Values(?)`,
    newArticles,
    function (err, results, fields) {
      console.log({ results });
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

// router.get("/populate", (req, res) => {
//   axios.get("https://dummyjson.com/posts?limit=150").then(function ({ data }) {
//     const { posts } = data;
//     posts.forEach((post) => {
//       const { title, body } = post;
//       const newArticle = {
//         id: uuid(),
//         title: title,
//         content: body,
//       };
//       connection.query(
//         `insert into articles set ?`,
//         newArticle,
//         function (err, results, fields) {
//           console.log(post.id);
//         }
//       );
//     });
//   });
//   res.json(["populate"]);
// });

// router.get("/", (req, res) => {
//   const { page, size, categoryId } = req.query;
//   let params = [];
//   let countParams = [];
//   let whereQuery = "";
//   if (categoryId) {
//     whereQuery = "where category_id=?";
//     params.push(categoryId);
//     countParams.push(categoryId);
//   }
//   params.push((page - 1) * size + 1); // 1-1, 2-11, 3-21
//   params.push(+size);
//   connection.query(
//     `Select articles.id, title, category.name as categoryName from articles left join category on articles.category_id = category.id ${whereQuery} limit ?,?`,
//     params,
//     //
//     function (err, articleResults, fields) {
//       console.log({ articleResults });
//       connection.query(
//         `Select count(*) as count from articles ${whereQuery}`,
//         countParams,
//         function (err, countResults, fields) {
//           res.json({
//             list: articleResults,
//             count: countResults[0].count,
//           });
//         }
//       );
//     }
//   );
// });

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
