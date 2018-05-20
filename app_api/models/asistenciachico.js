'use strict';
/*
  @Descripcion: Modelo Asistencia de Chico de Formación
  @Autor: @edisonmora95
  @FechaCreacion: 11/01/2018
  @UltimaFechaModificacion: --
*/

module.exports = function(sequelize, DataTypes){
  let AsistenciaChico = sequelize.define('AsistenciaChico', {
    id            : {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true
    },
    justificacion : {
      type      : DataTypes.STRING(200),
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Justificacion"'
        }
      }
    }
  });
  AsistenciaChico.associate = (models) => {
  }
  AsistenciaChico.ingresarAsistencia = (idChico, idGrupo, idReunion, justificacion) =>{
    return new Promise((resolve, reject) => {
      return AsistenciaChico.create({
        justificacion : justificacion,
        GrupoId       : idGrupo,
        ProcarianoId  : idChico,
        ReunionId     : idReunion
      })
      .then( result => {
        resolve(result);
      })  
      .catch( error => {
        reject(error);
      });
    });
  }
  AsistenciaChico.obtenerAsistenciasGrupo = (idGrupo, fecha) => {
    const Procariano = sequelize.import("../models/procariano");
    return new Promise((resolve, reject) => {
      return AsistenciaChico.findAll({
        where : {
          GrupoId : idGrupo,
          fecha   : fecha
        }
      })
      .then( result => {
        resolve(result);
      })
      .catch( error => {
        console.log(error)
        reject(error);
      });
    })
  }
  return AsistenciaChico;
}