'use strict';
module.exports = function(sequelize, DataTypes) {
  var Catequista = sequelize.define('Catequista', {
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
  Catequista.associate = (models) => {
    // associations can be defined here
  }
  return Catequista;
};