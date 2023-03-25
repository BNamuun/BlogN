const express = require("express");
const { v4: uuid } = require("uuid");
// const { connection } = require("../config/mySql");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("userInfo", {
  _id: { type: String, default: () => uuid() },
  userName: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрээ оруулна уу!"],
    unique: [true, "Ийм нэртэй хэрэглэгч бүртгэгдсэн байна"],
  },
  password: {
    type: String,
    required: [true, "Нууц үгээ оруулна уу"],
  },
  role: String,
});

router.post("/Registration", async (req, res) => {
  const { userName, password } = req.body;
  console.log({ userName, password });
  const hashedPassword = await bcrypt.hash(password, 8);
  if (!userName) {
    res.status(400).json({ message: "Нууц үгээ оруулна уу" });
  }
  const newUser = new User({
    userName,
    password: hashedPassword,
  });

  try {
    const result = await newUser.save();
    res.sendStatus(201);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const one = await User.findOne({
    userName,
  });
  if (one) {
    const auth = bcrypt.compareSync(password, one.password);
    // console.log({ auth });
    if (auth) {
      // res.json({ token: uuid() });
      const token = jwt.sign({ userId: one._id }, process.env.JWT_SECRET);
      res.json({ token: token });
    } else {
      res.status(400).json({ message: "Буруу байна" });
    }
  } else {
    res.status(400).json({ message: "Буруу байна" });
  }
});
module.exports = {
  userRouter: router,
};
