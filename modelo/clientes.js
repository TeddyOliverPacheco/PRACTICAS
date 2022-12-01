'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Clientes = Schema({
    id_Clientes:Number,
    nombre_Completo: String,
    email: String,
    numero_Telefono:Number,
    estado: String,
    
});

module.exports = mongoose.model('Clientes', Clientes);