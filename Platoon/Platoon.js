const Sequelize = require('sequelize');
const connection = require('../database/database');
const Esquad = require('../Esquad/Esquad');

const Platoon = connection.define('platoon', {
    nome: {
        type: Sequelize.STRING
    }
});

Esquad.hasMany(Platoon);
Platoon.belongsTo(Esquad);

// Platoon.sync({force: false});

module.exports = Platoon;