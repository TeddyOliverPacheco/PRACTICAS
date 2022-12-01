'use strict'

var bcrypt = require('bcrypt');
const usuarios = require('../modelo/usuarios');
var usuariosModelo = require('../modelo/usuarios');
var usuario = new usuariosModelo();



function prueba(req, res) {
    res.status(200).send({
        mesage: 'probando una accion del controlador de usarios del api REST con node y mongo'
    });
}

function registrarUsario(req, res) {
    var usuario = new usuariosModelo();

    var params = req.body;
    console.log(params);

    usuario.nombre = params.nombre;
    usuario.apellido = params.apellido;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.rol = 'ROLE_USER';
    usuario.imagen = "null";

    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellido != null && usuario.email != null) {
                usuario.save((err, usuarioAlmacenado) => {
                    if (err) {
                        res.status(500).send({ mesagge: 'erro al guardar el usuario' })
                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ mesagge: 'no se a registrado el usuario' })
                        } else {
                            res.status(200).send({ mesagge: usuarios.usuarioAlmacenado })
                        }
                    }
                });
            } else {
                res.status(200).send({ mesagge: 'Introduce todos los campos' })
            }

        });

    } else {
        res.status(500).send({ mesage: "Introduce la contraseña" })
    }
}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuariosModelo.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'error en la peticion al servidor' });

        } else {
            if (!user) {
                res.status(404).send({ mesagge: 'elusuario no existe' });
            } else {
                bcrypt.compare(password, usuario.password, function(err, check) {
                    if (check) {
                        console.log('coincide el password')
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(400).send({ mesagge: 'el usuario no se ha identificado' })
                        }

                    }
                })
            }
        }
    })
}


module.exports = {
    prueba,
    registrarUsario,
    accesoUsuario,
};