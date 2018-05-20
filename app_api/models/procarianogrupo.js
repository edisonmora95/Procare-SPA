'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let ProcarianoGrupo = sequelize.define('ProcarianoGrupo', {
    fechaInicio : {
      type      : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type      : DataTypes.DATE,
      allowNull : true
    }
  }, {
    singular  : 'ProcarianoGrupo',
    plural    : 'ProcarianoGrupo',
    tableName : 'procarianogrupo'
  });
  ProcarianoGrupo.associate = (models) => {
  }
  ///////////////////////////////////////
  //FUNDIONES CON PROMESAS
  ///////////////////////////////////////
  ProcarianoGrupo.obtenerGrupoActualDeProcarianoP = (idProcariano) => {
    return new Promise( (resolve, reject) => {
      if ( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') );
      if ( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') );
      return ProcarianoGrupo.findOne({
        where: {
          ProcarianoId: idProcariano,
          fechaFin    : null
        }
      })
      .then( resultado => {
        return resolve(resultado);
      })
      .catch( error => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  ProcarianoGrupo.buscarProcarianosConGrupoP = () => {
    return new Promise( (resolve, reject) => {
      return ProcarianoGrupo.findAll({
        where : {
          fechaFin : null
        }
      })
      .then( procarianos => {
        return resolve(procarianos);
      })
      .catch( error => {
        return reject(error);
      });
    });
  }
  ///////////////////////////////////////
  //FUNDIONES CON TRANSACCIONES
  ///////////////////////////////////////
  /**
    @Descripción:
      Elimina los regstro de procarianos del grupo. No hace commit.
    @Params:
      {Int} idGrupo  Id del grupo
      {Object} transaction
    @Success:
      {Int} registro cantidad de registros eliminados
      {Object} fail Sequelize error {tipo, mensaje}
  */
  ProcarianoGrupo.eliminarRegistrosDeGrupoT = (idGrupo, transaction) => {
    return new Promise( (resolve, reject) => {
      if ( !idGrupo )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
      if ( idGrupo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
      return ProcarianoGrupo.destroy({
        where : {
          GrupoId : idGrupo
        },
        transaction : transaction
      })
      .then( resultado => {
        if ( resultado < 0 ) return reject( errors.SEQUELIZE_ERROR('Error en la eliminación. Se cancela', 'Delete error') );
        return resolve(resultado);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  /**
    @Descripción:
      Añade el registro de un Procariano a un Grupo.
      No hace commit.
    @Params:
      {Int} idGrupo Id del grupo
      {Int} idProcariano Id del procariano
      {Object} transaction
    @Success:
      {Object} registro Registro creado en la tabla
    @Error:
      {Object} fail Sequelize error {tipo, mensaje}
  */
  ProcarianoGrupo.anadirProcarianoAGrupoT = (idGrupo, idProcariano, transaction) => {
    return new Promise( (resolve, reject) => {
      if ( !idGrupo )         { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
      if ( idGrupo < 0 )      { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
      if ( !idProcariano )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') ); }
      if ( idProcariano < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') ); }
      return ProcarianoGrupo.create({
        GrupoId       : idGrupo,
        ProcarianoId  : idProcariano,
        fechaInicio   : new Date(),
        fechaFin      : null
      }, { transaction : transaction })
      .then( resultado => {
        return resolve(resultado);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  ProcarianoGrupo.anadirFechaFinT = (idProcariano, transaction) => {
    return new Promise( (resolve, reject) => {
      if ( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') );
      if ( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') );
      return ProcarianoGrupo.update({
        fechaFin : new Date()
      }, {
        where : {
          fechaFin      : null,
          ProcarianoId  : idProcariano
        },
        transaction : transaction
      })
      .then( resultado => {
        return resolve(resultado[0]);
      })
      .catch( error => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  ProcarianoGrupo.anadirProcarianosBulk = (array, transaction) => {
    return new Promise((resolve, reject) => {
      return ProcarianoGrupo.bulkCreate(array, {
        validate    : true,
        transaction : transaction,
        fields      : ['fechaInicio', 'GrupoId', 'ProcarianoId']
      })
      .then( resultado => {
        return resolve(resultado);
      })
      .catch( fail => {
        return reject( errors.ERROR_HANDLER(fail) );
      });
    });
  }
  return ProcarianoGrupo;
};

