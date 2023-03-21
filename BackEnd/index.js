// Requiring module like importing cors and express
const { v4: uuid } = require("uuid");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { categoryRouter } = require("./routes/categoryController");
const mongoose = require("mongoose");
const { articleRouter } = require("./routes/articleController");
const multer = require("multer");

const port = 8000;
// creating express app
const app = express();
app.use(express.json());
app.use(cors());

app.use("/categories", categoryRouter);
app.use("/articles", articleRouter);
// importing mongoose

// connecting to a MongoDB database
mongoose
  .connect(
    "mongodb+srv://tealNamuun:FtawxCMWFxDgpPcL@cluster5.eqjts3y.mongodb.net/blog"
  )
  .then(() => console.log("Connected!"));

// defines the structure of the document, default values,
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  createdAt: Date,
});
//creating the model using schema, passing two arguments,the first is the name of the collection,
// the second is the schema.
const User = mongoose.model("User", userSchema);
//Creating and Saving a Model.
app.get("/", (req, res) => {
  User.create({
    name: " Naraa",
    email: "naraa@gmail.com",
    age: 18,
    createdAt: new Date(),
  });
  res.json({});
});

// app.post("/categories", (req, res) =>{
//   const {name} = req.body
// })
// encrypt the pass into shifr,, example
const hash = bcrypt.hashSync("phone");
console.log({ hash });
// Port Number

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

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop(); // get extension of file using pop(), which is separating the last part of filename splitted by dot.
    cb(null, `${uuid()}.${extension}`);
  },
});
const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads")); // making this folder possible to access files from this folder via HTTP
// filename: specifying file name
// destination: specifying the folder in which file should be stored
app.post("/upload-image", upload.single("image"), function (req, res, next) {
  res.json(["success"]);
});

app.listen(port, () => {
  console.log("App is listening at port", port);
});
