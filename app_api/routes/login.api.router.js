/*
  @Descripcion: Api del login
  @Autor: jose viteri
  @FechaCreacion: 19/06/2017
  @UltimaFechaModificacion:
    15/07/2017 //agregado post cambio contrasenna
    22/12/2017  @edisonmora95 añadida ruta para login con passport
*/
'use strict';

const express = require('express');
let router    = express.Router();

const controladorLogin = require('../controllers/login.controller');
const authApi          = require('../utils/authentication.api');

/*
  @api {post} /api/login/
  @apiDescription Valida los datos del formulario y autoriza el ingreso a la aplicación
  @apiGroup Login
  @apiName login
  @apiversion 0.2.0
*/
router.post('/', controladorLogin.login);

router.get('/logout', (req, res) => {
  req.logout()
  res.send({status: true})
})

/*
  @api {get} /api/login/usuarios
  @apiDescription Obtiene los datos del usuario conectado
  @apiGroup Login
  @apiName getUsuario
  @apiversion 0.2.0
*/
router.get('/usuarios', authApi.verifyToken, controladorLogin.getUsuario);

/*
  @api {post} /api/login/cambiar
  @apiDescription Cambia la contraseña del usuario seleccionado
  @apiGroup Login
  @apiName cambioContraseña
  @apiversion 0.2.0
*/
router.post('/cambiar', authApi.verifyToken, controladorLogin.cambioContrasenna);

module.exports = router;
