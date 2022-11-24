const mongoose = require("mongoose");
const { Schema } = mongoose;

const comentarioSchema = new Schema({
  usuario: { type: String, required: true },
  comentario: { type: String, required: true },
  rating: { type: String, required: true },
  fecha: { type: String, required: true },
});

const productoSchema = new Schema({
  codProducto: { type: String, required: true },
  nombreProducto: { type: String, required: true },
  precioNeto: { type: String, required: true },
  impuesto: { type: String, required: true },
  descripcion: { type: String, required: true },
  foto: { type: String, required: true },
  video: { type: String, required: true },
  comentarios: [{ type: comentarioSchema, required: true }],
});

module.exports = mongoose.model("Producto", productoSchema);
