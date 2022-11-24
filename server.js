const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const path = require("path");
const mongoClient = require("./src/dbs/mongoDB");
const redisClient = require("./src/dbs/redisDB");
const cassandraClient = require("./src/dbs/cassandraDB");
const mysqlClient = require("./src/dbs/mysqlDB");

// EXPRESS
const app = express();

// LOGS DBS
mongoClient();
redisClient();
cassandraClient();
mysqlClient();

//SETTINGS
app.set("appName", "/* TPO - B.D 2 */");
app.set("port", 3001);

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

/**** ROUTES ****/

//AUTH
app.use("/api/auth", require("./src/routes/auth.route"));
// mongoDB
app.use("/api/usuarios", require("./src/routes/usuario.route"));
app.use("/api/facturas", require("./src/routes/factura.route")); 
app.use("/api/pedidos", require("./src/routes/pedido.route"));
app.use("/api/productos", require("./src/routes/producto.route"));

//mySQL
app.use("/api/pagos", require("./src/routes/pago.route"));

//redis
app.use("/api/redis", require("./src/routes/usuarioRedis.route"));

//Cassandra
app.use("/api/logProductos", require("./src/routes/logProducto.route"));
app.use("/api/logFacturas", require("./src/routes/logFactura.route"));
/**** ROUTES ****/

// // STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
app.use("/staticFiles", express.static(path.join(__dirname, "staticFiles"))); //localhost:3000/staticFiles/archivo.txxt

app.listen(app.get("port"), () => {
  console.log(`Server ${app.get("appName")} on port ${app.get("port")}`);
});
