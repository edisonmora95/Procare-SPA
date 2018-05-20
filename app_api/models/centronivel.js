'use strict';
module.exports = function(sequelize, DataTypes) {
  let CentroNivel = sequelize.define('CentroNivel', {
    
  }, {
    freezeTableName: true
  });
  CentroNivel.associate = (models) => {
    // associations can be defined here
  }
  return CentroNivel;
};