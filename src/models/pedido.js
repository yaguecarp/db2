const mongoose = require("mongoose");
const { Schema } = mongoose;

const direccionSchema = new Schema({
  calle: { type: String, required: true },
  altura: { type: String, required: true },
  piso: { type: String, },
  departamento: { type: String, required: true },
  codigoPostal: { type: String, required: true },
  localidad: { type: String, required: true },
  provincia: { type: String, required: true },
  pais: { type: String},
});

const clienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cuil: { type: String, required: true },
  condicionIVA: { type: String, required: true },
  direccion: { type: direccionSchema, required: true },
});

const itemSchema = new Schema({
  producto: { type: String, required: true },
  cantidad: { type: String, required: true },
});

const pedidoSchema = new Schema({
  nroPedido: { type: String, required: true },
  fecha: { type: String, required: true },
  totalNeto: { type: String, required: true },
  estado: { type: String, required: true },
  cliente: { type: clienteSchema, required: true },
  items: [{ type: itemSchema, required: true }],
});

module.exports = mongoose.model("Pedido", pedidoSchema);
