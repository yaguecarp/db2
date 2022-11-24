const express = require("express");
const router = express.Router();
const Factura = require("../models/factura");
const jwt = require('jsonwebtoken')

router.get("/", async (req, res) => {
  const facturas = await Factura.find();
  res.json(facturas);
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization;

  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  const usuario = tokenDecoded.user;
  console.log(usuario)
  const cliente = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    cuil: usuario.cuil,
    localidad: usuario.direccion.localidad

  }
  const {
    nroFactura,
    fecha,
    cae,
    puntoVenta,
    totalNeto,
    impuestos,
    detalle,
    descuento,
  } = req.body;

  const facturaExiste = await Factura.findOne({nroFactura: nroFactura})
  if (!facturaExiste) {
  const factura = new Factura({
    nroFactura,
    fecha,
    cae,
    puntoVenta,
    cliente,
    totalNeto,
    impuestos,
    detalle,
    descuento,
  });
  await factura.save();
  res.json({ status: "Factura grabada." });
}
});

module.exports = router;
