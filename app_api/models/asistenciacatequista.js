'use strict';
module.exports = function(sequelize, DataTypes) {
  var AsistenciaCatequista = sequelize.define('AsistenciaCatequista', {
    fecha: DataTypes.DATE,
    descripcion: DataTypes.STRING(300)
  }, {
    freezeTableName: true
  });
  AsistenciaCatequista.associate = (models) => {
    // associations can be defined here
  }
  return AsistenciaCatequista;
};