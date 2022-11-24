const express = require("express");
const router = express.Router();
const Pedido = require("../models/pedido");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const pedidos = await Pedido.find();
  res.json(pedidos);
});

router.get("/byCuil", async (req, res) => {
  const token = req.headers.authorization;
  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  const usr = tokenDecoded.user;
  console.log(usr.cuil);
  const pedidos = await Pedido.find({ "cliente.cuil": usr.cuil });
  res.json(pedidos);
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization;

  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  const usuario = tokenDecoded.user;
  console.log(usuario);
  const cliente = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    cuil: usuario.cuil,
    condicionIVA: usuario.condicionIVA,
    direccion: {
      calle: usuario.direccion.calle,
      altura: usuario.direccion.altura,
      piso: usuario.direccion.piso,
      departamento: usuario.direccion.departamento,
      codigoPostal: usuario.direccion.codigoPostal,
      localidad: usuario.direccion.localidad,
      provincia: usuario.direccion.provincia,
      pais: "Argentina",
    },
  };
  const { nroPedido, fecha, totalNeto, estado, items } = req.body;
  const pedidoExiste = await Pedido.findOne({ nroPedido: nroPedido });
  if (!pedidoExiste) {
    
    const pedido = new Pedido({
      nroPedido,
      fecha,
      totalNeto,
      estado,
      cliente,
      items,
    });
    await pedido.save();
    res.json({ status: "Pedido grabado." });
  }
});

module.exports = router;
