const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const client = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tpo",
});

router.get("/", (req, res) => {
  client.query("SELECT * FROM `pago`", (err, qres, fields) => {
    console.log(qres);
    res.json(qres);
  });
});

router.post("/",  (req, res) => {
  const token = req.headers.authorization;

  const tokenDecoded = jwt.verify(token, "palabraSecreta");
  const usuario = tokenDecoded.user;
  const cuilUsuario = usuario.cuil;
  const { nroPago, formaPago, fecha, factura, total } = req.body;


  try {
    client.query(`insert into pago values (?, ?, ?, ? , ?, ?);`, [
      nroPago,
      cuilUsuario,
      formaPago,
      fecha,
      factura,
      total,
    ]);
    res.json({ status: "Pago grabado." });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
