'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Actividades = Schema({
    id_Actividad:Number,
    tipo_Actividad: String,
    hora_inicio:String,
    hora_termino:String,
    duracion:Number,
    descripcion:String,
    recordatorios:String,
    medio_contacto:String,
    
    id_Usuarios:{type: Schema.id_Usuarios,ref:"Usuarios"},
    id_Clientes:{type: Schema.id_Clientes,ref:"Clientes"}
 
});

module.exports = mongoose.model('Actividades', Actividades);