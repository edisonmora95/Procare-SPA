'use strict';
module.exports = function(sequelize, DataTypes) {
  var ParaleloNivel = sequelize.define('ParaleloNivel', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    freezeTableName: true
  });
  ParaleloNivel.associate = (models) => {
    // associations can be defined here
  }
  return ParaleloNivel;
};