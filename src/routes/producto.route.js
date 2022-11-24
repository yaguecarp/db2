const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");

router.get("/", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

router.post("/", async (req, res) => {
  const { codProducto, nombreProducto, precioNeto, impuesto, descripcion, foto, video, comentarios } = req.body;
  const producto = new Producto({
    codProducto,
    nombreProducto,
    precioNeto,
    impuesto,
    descripcion,
    foto,
    video,
    comentarios
  });
  await producto.save();
  res.json({ status: "Producto grabado." });
});

module.exports = router;