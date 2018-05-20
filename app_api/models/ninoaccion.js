/*
@Descripcion: Modelo de Niño Accion
@UltimaFechaModificacion: 29/07/2017 @LuisBSC15
*/
'use strict';
module.exports = function(sequelize, DataTypes) {
  var NinoAccion = sequelize.define('NinoAccion', {
    nombreRep: DataTypes.STRING,
    apellidoRep: DataTypes.STRING,
    telefonoRep: DataTypes.INTEGER,
    escuela: DataTypes.STRING,
    bautizado: DataTypes.BOOLEAN,
    estado: DataTypes.STRING
  });
  NinoAccion.associate = (models) => {
    NinoAccion.belongsTo(models.Persona);
    // associations can be defined here
  }
  NinoAccion.crearNinoAccion = (ninoaccion, callback, errorCallback) => {
    NinoAccion.create({
      PersonaId: ninoaccion.PersonaId,
      nombreRep: ninoaccion.nombreRep,
      apellidoRep: ninoaccion.apellidoRep,
      telefonoRep: ninoaccion.telefonoRep,
      escuela: ninoaccion.escuela,
      bautizado: ninoaccion.bautizado,
      estado: ninoaccion.estado
    }).then(callback).catch(errorCallback);
  }
  NinoAccion.obtenerNinoAccionPorId = (idNinoAccion, successCallback, errorCallback) => {
    const Persona = sequelize.import("../models/persona");
    NinoAccion.findOne({
      where: {
        id: idNinoAccion
      },
      include: [
        {
          model: Persona,
          attributes: [['id', 'personaId'], 'nombres', 'apellidos']
        }
      ],
      attributes: [['id', 'ninoaccionId']]
    }).then(successCallback).catch(errorCallback);
  }
  return NinoAccion;
};