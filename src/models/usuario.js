const mongoose = require('mongoose');
const { Schema } = mongoose;


const direccionSchema = new Schema({
    calle: {type: String, required: true},
    altura: {type: String, required: true},
    piso: {type: String},
    departamento: {type: String},
    codigoPostal: {type: String, required: true},
    localidad: {type: String, required: true},
    provincia: {type: String, required: true},
});

const usuarioSchema = new Schema({
    cuil: { type: String, required: true},
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    direccion: { type: direccionSchema, required:true },
    condicionIVA: {type: String, required:true},
    carrito: {type: String},
    pedidos: {type: String}

})

module.exports = mongoose.model('Usuario', usuarioSchema);