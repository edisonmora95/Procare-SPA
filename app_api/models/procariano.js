/*
@Descripcion: Modelo de procariano
@Autor: jose viteri
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 03/06/2017 @JoseViteri
*/
'use strict';

const errors    = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let Procariano = sequelize.define('Procariano', {
    colegio: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Colegio"'
        }
      }
    },
    universidad: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Universidad"'
        }
      }
    },
    parroquia: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Parroquia"'
        }
      }
    },
    fechaOrdenacion: {
      type      : DataTypes.DATE,
      allowNull : true
    },
    estado: {
      type      : DataTypes.STRING,
      allowNull : false,
      validate  : {
        notEmpty: {
          msg: 'Estado del grupo no puede estar vacío.'
        },
        isIn : {
          args  : [['activo', 'inactivo' ]],
          msg   : 'Valor ingresado de "estado" no es válido'
        }
      }
    },
    haceParticipacionEstudiantil: {
      type : DataTypes.BOOLEAN,
      allowNull : true
    }
  });
  Procariano.associate = (models) => {
    Procariano.belongsTo(models.Persona);
    Procariano.hasMany(models.Ticket);
    Procariano.belongsToMany(models.Tipo, {through: 'ProcarianoTipo'});
    Procariano.belongsToMany(models.Grupo, {through: 'ProcarianoGrupo'});
    Procariano.belongsToMany(models.Reunion, {through: 'AsistenciaChico'});
  }
  ///////////////////////////////////////
  //FUNDIONES CON PROMESAS
  ///////////////////////////////////////
  /*
    @Description: 
      Devuelve la información del procariano por su id.
      Devuelve error si no encuentra al procariano.
    @Params:
      {int} idProcariano  Id del procariano a buscar
    @Success: 
      {Object} procariano  Información de Procariano y Persona
    @Error:
      {Object} fail SEQUELIZE_ERROR
  */
  Procariano.obtenerProcarianoPorIdP = (idProcariano) => {
    const Persona = sequelize.import("../models/persona");
    return new Promise( (resolve, reject) => {
      if( !idProcariano )     { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') ); }
      if( idProcariano < 0 )  { return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') ); }
      return Procariano.findOne({
        where: {
          id: idProcariano
        },
        include: [
          {
            model     : Persona,
            attributes: [['id', 'personaId'], 'nombres', 'apellidos', 'genero', 'email']
          }
        ],
        attributes: [['id', 'procarianoId']]
      })
      .then( procariano => {
        if ( !procariano ) { return reject( errors.SEQUELIZE_ERROR('No se encontró registro del procariano', 'Find error') ); }
        return resolve(procariano);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  /*
    @Descripción: Busca a todos los procarianos pertenecientes al grupo inicado por el idGrupo
    @Return: Promesa con info de Procariano, Persona, Grupo y ProcarianoGrupo
  */
  Procariano.obtenerProcarianosDeGrupoP = (idGrupo) => {
    const Grupo = sequelize.import("../models/grupo");
    const Persona = sequelize.import("../models/persona");
    return new Promise( (resolve, reject) => {
      if ( !idGrupo )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
      if ( idGrupo < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
      return Procariano.findAll({
        include: [
          {
            model: Grupo,
            where: {
              id: idGrupo
            },
            attributes: [ ['id', 'idGrupo']]
          },
          {
            model: Persona,
            attributes: [ ['id', 'idPersona'], 'nombres', 'apellidos', ]
          }
        ],
        attributes:[['id', 'idProcariano']]
      })
      .then( procarianos => {
        return resolve(procarianos);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  /*
    @Descripción : Busca la información del procariano por el id de la Persona
    @Return      : Promesa con la información de Procariano, Persona, Tipo y Grupo
  */
  Procariano.obtenerProcarianoPorIdPersonaP = (idPersona) => {
    const Persona = sequelize.import("../models/persona");
    const Tipo    = sequelize.import("../models/tipo");
    const Grupo   = sequelize.import("../models/grupo");
    return new Promise( (resolve, reject) => {
      if( !idPersona )     { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') ); }
      if( idPersona < 0 )  { return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') ); }
      return Procariano.findOne({
        include : [
          {
            model : Persona
          },
          {
            model : Tipo
          },
          {
            model : Grupo
          }
        ],
        where : {
          PersonaId : idPersona
        }  
      })
      .then( procariano => {
        if ( !procariano ) { return reject( errors.SEQUELIZE_ERROR('No se encontró registro del procariano', 'Find error') ); }
        return resolve(procariano);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  /*
    @Descripción : Busca a los procarianos activos
    @Return      : Devuelve la información de: Procariano, Persona y Tipo
  */
  Procariano.obtenerProcarianosActivosP = () => {
    const Persona = sequelize.import("../models/persona");
    const Tipo    = sequelize.import("../models/tipo");
    const Grupo   = sequelize.import("../models/grupo");
    return new Promise( (resolve, reject) => {
      return Procariano.findAll({
        include : [
          {
            model : Persona
          },
          {
            model : Tipo
          },
          {
            model : Grupo
          }
        ],
        where : {
          estado : 'activo'
        }
      })
      .then( procarianos => {
        return resolve(procarianos);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  Procariano.buscarChicosFormacionP = () => {
    const Tipo = sequelize.import("../models/tipo");
    const Persona = sequelize.import("../models/persona");
    return new Promise( (resolve, reject) => {
      return Procariano.findAll({
        include : [
          {
            model : Tipo,
            where : {
              id  : 1 //Id de Chico Formación es 1
            },
            attributes: ['id', 'nombre']
          },
          {
            model       : Persona,
            attributes  : [['id', 'personaId'], 'nombres', 'apellidos']
          }
        ],
        where : {
          estado  : {
            $not  : 'inactivo'
          }
        },
        attributes: [['id', 'procarianoId'], 'estado']
      })
      .then( procarianos => {
        return resolve(procarianos);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  Procariano.obtenerPosiblesAnimadoresP = () => {
    const Persona = sequelize.import("../models/persona");
    const Tipo    = sequelize.import("../models/tipo");
    return new Promise( (resolve, reject) => {
      return Procariano.findAll({
        where   : {
          estado   : 'activo'
        },
        include    : [
          {
            model : Tipo,
            where : {
              id : { $not : 1}
            },
            attributes : [['id', 'tipoId'], 'nombre']
          },
          {
            model : Persona,
            attributes: [['id', 'personaId'], 'nombres', 'apellidos']
          }
        ],
        attributes : [['id', 'procarianoId']] 
      })
      .then( resultado => {
        resolve(resultado);
      })
      .catch( error => {
        reject(error);
      });
    });
  }
  ///////////////////////////////////////
  //FUNDIONES CON TRANSACCIONES
  ///////////////////////////////////////
  /*
    @Descripción : Crea un registro en la tabla Procarianos de la base de datos a partir de una transacción
    @Params      : 
      procariano  : Objeto con la información del Procariano a crear
      transaction : Transacción para crear el Procariano
    @Return      : Promesa con la información del Procariano creado
  */
  Procariano.crearProcarianoT = (procariano, transaction) => {
    return new Promise( (resolve, reject) => {
      if ( !procariano.PersonaId )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la persona') ); }
      if ( procariano.PersonaId < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id de la persona inválido') ); }
      return Procariano.create({
        PersonaId       : procariano.PersonaId,
        colegio         : procariano.colegio,
        universidad     : procariano.universidad,
        parroquia       : procariano.parroquia,
        fechaOrdenacion : procariano.fechaOrdenacion,
        estado          : procariano.estado,
      }, { transaction : transaction })
      .then( procariano => {
        return resolve(procariano);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  /*
    @Descripción : Edita un registro en la tabla Procarianos de la base de datos a partir de una transacción
    @Params      : 
      idPersona   : Id de la Persona para editar el registro
      procariano  : Objeto con la información del Procariano a crear
      transaction : Transacción para crear el Procariano
    @Return      : Promesa con el número de registros editados
  */
  Procariano.editarProcarianoT = (idPersona, procariano, transaction) => {
    return new Promise( (resolve, reject) => {
      if ( !idPersona )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la persona') ); }
      if ( idPersona < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id de la persona inválido') ); }
      return Procariano.update({
        colegio         : procariano.colegio,
        universidad     : procariano.universidad,
        parroquia       : procariano.parroquia,
        fechaOrdenacion : procariano.fechaOrdenacion,
        estado          : procariano.estado,
      },
      {
        where : {
          PersonaId : idPersona
        },
        transaction : transaction
      })
      .then( resultado => {
        if( resultado[0] < 1 ) { return   reject( errors.SEQUELIZE_ERROR('No se encontró el registro del procariano para editar', 'Edit error') ); }
        if( resultado[0] === 1 ) { return resolve(resultado[0]); }
        if( resultado[0] > 1 ) { return   reject( errors.SEQUELIZE_ERROR('Se encontraron múltiples registros. Se cancela la edición', 'Edit error') ); }
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  /*
    @Descripción : Cambia el estado a inactivo de un Procariano en la base a partir de una transacción
    @Params      : 
      idPersona   : id de la Persona para realizar el cambio de estado
      transaction : Transacción para crear el Procariano
    @Return      : Promesa con el número de registros afectados
  */
  Procariano.eliminarProcarianoT = (idPersona, transaction) => {
    return new Promise( (resolve, reject) => {
      if ( !idPersona )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la persona') ); }
      if ( idPersona < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id de la persona inválido') ); }
      return Procariano.update({
        estado : 'inactivo'
      }, {
        where : {
          PersonaId : idPersona
        },
        transaction : transaction
      })
      .then( resultado => {
        if( resultado < 1 )   { return reject( errors.SEQUELIZE_ERROR('No se encontró el registro del procariano para eliminar', 'Delete error') ); }
        if ( resultado === 1 ) { return resolve(resultado); }
        return reject( errors.SEQUELIZE_ERROR('Se encontraron varios registros. Se cancela la eliminación', 'Delete error') );
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  return Procariano;
};
