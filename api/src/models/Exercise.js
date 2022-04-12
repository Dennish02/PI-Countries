const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('exercise', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
        type: DataTypes.NUMERIC,
        allowNull: true,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    season:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    country:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};