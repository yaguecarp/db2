const mongoose = require("mongoose");
const { Schema } = mongoose;

const clienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cuil: { type: String, required: true },
  localidad: { type: String, required: true },
});

const detalleSchema = new Schema({
  producto: { type: String, required: true },
  cantidad: { type: String, required: true },
  // precio: { type: String, required: true },
});

const facturaSchema = new Schema({
  nroFactura: { type: String, required: true },
  fecha: { type: String, required: true },
  cae: { type: String, required: true },
  puntoVenta: { type: String, required: true },
  cliente: { type: clienteSchema, required: true },
  totalNeto: { type: String, required: true },
  impuestos: { type: String, required: true },
  detalle: [{ type: detalleSchema, required: true }],
  descuento: { type: String, required: true },
});

module.exports = mongoose.model("Factura", facturaSchema);
