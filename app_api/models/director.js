'use strict';
module.exports = function(sequelize, DataTypes) {
  const Director = sequelize.define('Director', {
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
  Director.associate = (models) => {
    // associations can be defined here
  }
  return Director;
};