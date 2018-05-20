'use strict';
module.exports = function(sequelize, DataTypes) {
  var AsistenciaNino = sequelize.define('AsistenciaNino', {
    fecha: DataTypes.DATE,
    descripcion: DataTypes.STRING(300)
  }, {
    freezeTableName: true
  });
  AsistenciaNino.associate = (models) => {
    // associations can be defined here
  }
  return AsistenciaNino;
};