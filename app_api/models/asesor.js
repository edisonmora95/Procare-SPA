'use strict';
module.exports = function(sequelize, DataTypes) {
  let Asesor = sequelize.define('Asesor', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  });
  Asesor.associate = (models) => {
    // associations can be defined here
  }
  return Asesor;
};