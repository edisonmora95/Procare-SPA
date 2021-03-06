/*
  @Descripcion: Modelo de Benefactor
  @Autor: jose viteri
  @FechaCreacion: 20/05/2017
  @UltimaFechaModificacion: 03/06/2017 @JoseViteri
*/
'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let Benefactor = sequelize.define('Benefactor', {
    valorContribucion: {
      type      : DataTypes.DECIMAL(10, 2),
      allowNull : false,
      validate  : {
        notEmpty : {
          msg : 'El valor de la contribución no puede estar vacío.'
        },
        min      : {
          args : [0],
          msg  : 'El valor de la contribución no puede ser menor a 0.'
        }
      }
    },
    diaCobro: {
      type      : DataTypes.INTEGER(2),
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg : 'El campo día de cobro no puede estar vacío'
        },
        min      : {
          args : [0],
          msg  : 'El valor de día de cobro no puede ser menor a 0.'
        },
        max      : {
          args : [31],
          msg  : 'El valor de día de cobro no puede ser mayor a 31.'
        }
      }
    },
    tarjetaCredito: {
      type      : DataTypes.STRING,
      allowNull : true,
    },
    tipoDonacion: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Tipo de donación"'
        }
      }
    },
    estado: {
      type      : DataTypes.STRING,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg   : 'El valor de estado no puede estar vacío.'
        },
        isIn      : {
          args  : [['activo', 'inactivo']],
          msg   : 'El estado debe ser activo o inactivo'
        }
      }
    },
    nombreGestor: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Nombre de gestor"'
        }
      }
    },
    relacion: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Relación"'
        }
      }
    },
    observacion: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Observación"'
        }
      }
    },
  }, {
    classMethods: {

      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////

     }
  });
  Benefactor.associate = (models)  => {
    Benefactor.belongsTo(models.Persona);
    // Benefactor.belongsToMany(models.Persona, {through: 'BenefactorPersona'});
  }
  Benefactor.obtenerProcarianoPorId = (idBenefactor, successCallback, errorCallback)  => {
    const Persona = sequelize.import("../models/persona");
    Benefactor.findOne({
      where: {
        id: idBenefactor
      },
      include: [{
        model: Persona,
        attributes: [
          ['id', 'personaId'], 'nombres', 'apellidos'
        ]
      }],
      attributes: [
        ['id', 'benefactorId']
      ]
    }).then(successCallback).catch(errorCallback);
  }
  /*
    @Descripción : Busca a todos los benefactores de la base de datos
    @Return      : Devuelve la información de: Benefactor y Persona
  */
  Benefactor.obtenerBenefactoresP = () => {
    const Persona = sequelize.import("../models/persona");
    return new Promise( (resolve, reject) => {
      return Benefactor.findAll({
        include : [
          {
            model : Persona
          }
        ]
      })
      .then( benefactores => {
        return resolve(benefactores);
      })
      .catch( error => {
        return reject(error);
      });
    });
  }
  Benefactor.obtenerProcarianoPorIdPersonaP = (idPersona) => {
    const Persona = sequelize.import("../models/persona");
    return new Promise( (resolve, reject) => {
      return Benefactor.findAll({
        include : [
          {
            model : Persona
          }
        ],
        where  :  {
          personaId : idPersona
        }
      })
      .then( benefactor => {
        return resolve(benefactor);
      })
      .catch( error => {
        return reject(error);
      });
    });
  }
  /*
    @Descripción : Crea un registro en la tabla Benfecator de la base de datos a partir de una transacción
    @Params      :
      benefactor  : Objeto con la información del Benfactor a crear
      transaction : Transacción para crear al Benefactor
    @Return      : Promesa con la información del Benefactor creado
  */
  Benefactor.crearBenefactorT = (benefactor, transaction) => {
    return new Promise( (resolve, reject) => {
      if ( !benefactor.PersonaId )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la Persona') ); }
      if ( typeof benefactor.PersonaId != 'number' ) { return reject( errors.SEQUELIZE_ERROR('El id del benefactor debe ser número', 'Type error')); }
      if ( benefactor.PersonaId < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id de la Persona inválido') ); }
      return Benefactor.create({
        PersonaId         : benefactor.PersonaId,
        valorContribucion : benefactor.valorContribucion,
        diaCobro          : benefactor.diaCobro,
        tarjetaCredito    : benefactor.tarjetaCredito,
        tipoDonacion      : benefactor.tipoDonacion,
        estado            : benefactor.estado,
        nombreGestor      : benefactor.nombreGestor,
        relacion          : benefactor.relacion,
        observacion       : benefactor.observacion
      }, { transaction : transaction })
      .then( benefactor => {
        return resolve(benefactor);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  return Benefactor;
 };
