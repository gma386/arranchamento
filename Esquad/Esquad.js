const Sequelize = require('sequelize');
const connection = require('../database/database');

const Esquad = connection.define('esquad', {
    nome: {
        type: Sequelize.STRING
    }
});

// Esquad.sync({force: false});

module.exports = Esquad;