const verifyToken = require("../middlewares/authJwt");
const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const jwt = require('jsonwebtoken')

router.get("/", verifyToken, async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

router.post("/", verifyToken, async (req, res) => {
  const {
    cuil,
    nombre,
    apellido,
    email,
    password,
    direccion,
    condicionIVA,
    carrito,
    pedidos,
  } = req.body;
  const usuario = new Usuario({
    cuil,
    nombre,
    apellido,
    email,
    password,
    direccion,
    condicionIVA,
    carrito,
    pedidos,
  });
  await usuario.save();
  res.json({ status: "Usuario grabado." });
});

router.get("/checkToken", async (req, res) => {
  const token = req.headers.authorization;
  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  res.json(tokenDecoded);
});

module.exports = router;
