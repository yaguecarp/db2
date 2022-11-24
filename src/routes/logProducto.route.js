const express = require("express");
const router = express.Router();
const cassandra = require("cassandra-driver");

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  "nyague",
  "taekwondo2326"
);
const contactPoints = ["127.0.0.1:9042"];
const localDataCenter = "datacenter1";
const keyspace = "logs";

const client = new cassandra.Client({
  contactPoints: contactPoints,
  authProvider: authProvider,
  localDataCenter: localDataCenter,
  keyspace: keyspace,
});

router.get("/", (req, res) => {
  const query = "SELECT * FROM logProducto";
  client.execute(query).then((result) => {
    console.log(result.rows);
    res.send(result.rows);
  });
});

router.post("/", (req, res) => {
  const { idproducto, fecha, idoperador, precioanterior, precionuevo } =
    req.body;
  const query = `INSERT INTO logProducto(idOperacion, idProducto, fecha, idOperador, precioAnterior, precioNuevo) VALUES(uuid(), ?, ?, ?, ?, ?);`;
  client.execute(query, [idproducto, fecha, idoperador, precioanterior, precionuevo], {prepare : true}).then((result) => {
    console.log(result);
    res.send({"status": "log de Producto creado."});
  })
  .catch((error) => console.log(error));
});

module.exports = router;
