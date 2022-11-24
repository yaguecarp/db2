const express = require("express");
const router = express.Router();
const redisClient = require("../dbs/redisDB");
const redis = require("redis");
const jwt = require("jsonwebtoken");

const client = redis.createClient();
client.connect();

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const tokenDecoded = jwt.verify(token, "palabraSecreta");
    const userCuil = tokenDecoded.user.cuil;
    const { nombreProducto, cantidad } = req.body;

    const resultado = await client.hGet(`usuario:${userCuil}`, nombreProducto);
    if (resultado > 0) {
      await client.hIncrBy(`usuario:${userCuil}`, nombreProducto, 1);
      return res.json({ status: "Cantidad incrementada" });
    } else {
      await client.HSET(`usuario:${userCuil}`, nombreProducto, cantidad);
      return res.json({ status: "Grabado" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/decrementarCantidad", async (req, res) => {
  const token = req.headers.authorization;
  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  const userCuil = tokenDecoded.user.cuil;
  const { nombreProducto, cantidad } = req.body;

  const resultado = await client.hGet(`usuario:${userCuil}`, nombreProducto);
  if (resultado > 0) {
    await client.hIncrBy(`usuario:${userCuil}`, nombreProducto, -1);
    const resultado = await client.hGet(`usuario:${userCuil}`, nombreProducto);
    if (resultado == 0) {
      await client.hDel(`usuario:${userCuil}`, nombreProducto);
      return res.json({ status: "Item totalmente eliminado del carrito" });
    }
    return res.json({ status: "Cantidad decrementada" });
  }
});

router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  const userCuil = tokenDecoded.user.cuil;
  const resultado = await client.hGetAll(`usuario:${userCuil}`, (err, res) => {
    console.log(res);
  });
  res.json(resultado);
});

router.delete("/", async (req, res) => {
  const token = req.headers.authorization;
  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  const userCuil = tokenDecoded.user.cuil;
  const { nombreProducto } = req.body;
  await client.hDel(`usuario:${userCuil}`, nombreProducto);
  res.json({ status: "Producto eliminado del carrito" });
});

module.exports = router;
