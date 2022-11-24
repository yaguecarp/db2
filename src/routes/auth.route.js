const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

router.post("/", async (req, res) => {
  const userReq = req.body;

  const user = await Usuario.findOne({
    email: userReq.email,
    password: userReq.password,
  });

  if (!user) return res.status(404).json({ status: "User not found" });

  const token = jwt.sign({user}, "palabraSecreta", { expiresIn: "240m" });
//   console.log(user);
  res.status(200).json({ token });
});

module.exports = router;
