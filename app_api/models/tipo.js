'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo = sequelize.define('Tipo', {
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true  ,
      values: ['Chico Formación', 'Caminante', 'Pescador', 'Pescador Consagrado', 'Sacerdote', 'Mayor']
    } 
  });
  Tipo.associate = (models)  => {
    // associations can be defined here
    Tipo.belongsToMany(models.Procariano, {through: 'ProcarianoTipo'});
  },
  Tipo.obtenerTipoPorId = (idTipo, callback) => {
    Tipo.findOne({
      where: {
        id: idTipo
      }
    }).then(callback);
  }
  ///////////////////////////////////////
  //FUNDIONES CON PROMESAS
  ///////////////////////////////////////
  Tipo.obtenerTipoPorIdP = (idTipo) => {
    return new Promise( (resolve, reject) => {
      return Tipo.findOne({
        where : {
          id : idTipo
        }
      })
      .then( tipo => {
        return resolve(tipo);
      })
      .catch( error => {
        return reject(error);
      });
    });
  }
  Tipo.obtenerTodosLosTiposP = () => {
    return new Promise( (resolve, reject) => {
      return Tipo.findAll({})
      .then( resultado  => { return resolve(resultado) })
      .catch( error     => { return reject(error) });
    });
  }
  return Tipo;
};