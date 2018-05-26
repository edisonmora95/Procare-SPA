'use strict';

const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const utils	 = require('../utils/utils');
const co     = require('co');

const ModeloPersona    = require('../models').Persona;

const config    = require('../config/config');
const respuesta = require('../utils/respuestas');

const cambioContrasenna = (req, res) => {
	const	email						 = req.body.correo;
	const viejaContrasenna = req.body.viejaContrasenna;
	const nuevaContrasenna = req.body.nuevaContrasenna;
	//Primero hay que verificar si la contraseña anterior coincide con la actual en la base
	ModeloPersona.buscarPersonaPorEmailP(email)
	.then( persona => {
		//Si el correo no existe en la base
		if( !persona ) { return respuesta.ERROR_SERVIDOR(res, { mensaje : 'Registro no encontrado' }); }
		//Ahora se comparan las contraseñas
    if( !bcrypt.compareSync(viejaContrasenna, persona.get('contrasenna')) ) {
    	return respuesta.ERROR_SERVIDOR(res, { mensaje : 'Contraseña anterior no coincide' });
    }
    //Se genera la nueva contraseña en hash
    utils.generarHash(nuevaContrasenna)
    .then( hash => {
    	//Cambio la contraseña
    	ModeloPersona.cambiarContrasenna(email, hash)
	    .then( resultado => {
	    	return respuesta.okUpdate(res, 'Contraseña cambiada', resultado);
	    })
	    .catch( fail => {
				return respuesta.ERROR_SERVIDOR(res, fail);
			});
    })
    .catch( fail => {
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});

};

const login = (req, res) => {
	const correo   = req.body.correo;
  const password = req.body.password;
  co(function* (){
    //Primero se verifica si el correo existe en la base
    let persona = yield ModeloPersona.buscarPersonaPorEmailP(correo);
    if( !persona ) {
      return respuesta.error(res, 'No se encontró el correo en la base de datos', '', null);
    }
    //Ahora se comparan las contraseñas
    if( !bcrypt.compareSync(password, persona.get('contrasenna')) ) {
      return respuesta.error(res, 'Contraseña no coincide', '', null);
    }
    //Obtengo los roles actuales del usuario
    let roles           = yield ModeloPersona.obtenerRolesP(persona.get('id'));
    const rolesActuales = obtenerRolesActuales(roles);
    //Genero el token
    const payload = {
      roles : rolesActuales ,
      id    : persona.get('id')
    };
    const secret = config[process.env.NODE_ENV].secret;
    const token  = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 7 });
    res.send({
      success: true,
      token  : token,
    });
  })
  .catch( fail => {
    res.status(500).send(fail);
  });
};

const getUsuario = (req, res) => {
	const idUsuario = req.decoded.id
  ModeloPersona.deserializarUsuario(idUsuario)
    .then((usuario) => {
      if (!usuario) {
        res.send({estado: false, mensaje: 'No se encontró al usuario'})
      }
      const datos = {
        id        : usuario.get('id'),
        nombres   : usuario.get('nombres'),
        apellidos : usuario.get('apellidos'),
        genero    : usuario.get('genero'),
        correo    : usuario.get('correo'),
        roles     : req.decoded.roles
      };
      return respuesta.okGet(res, 'Usuario obtenido', datos);
    })
    .catch((fail) => {
      return respuesta.ERROR_SERVIDOR(res, fail)
    })
};

module.exports = {
	cambioContrasenna,
	login,
	getUsuario,
};

function obtenerRolesActuales(arrayRoles){
  let array = [];
  for (let i = 0; i < arrayRoles.length; i++) {
    let actual = arrayRoles[i].PersonaRol;
    if( !actual.get('fechaFin') ){
      array.push(actual.get('RolNombre'));
    }
  }
  return array;
}
