'use strict';
module.exports = function(sequelize, DataTypes) {
  var NinoParalelo = sequelize.define('NinoParalelo', {
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
  NinoParalelo.associate = (models) => {
    // associations can be defined here
  }
  return NinoParalelo;
};