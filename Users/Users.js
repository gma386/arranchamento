const Sequelize = require('sequelize');
const connection = require('../database/database');
const Platoon = require('../Platoon/Platoon');

const Users = connection.define('users', {
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    patente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    perfil: {
        type: Sequelize.INTEGER,
        allowNull: false
        //perfil = 1 --> ADMIN
        //perfil = 2 --> FURRIEL
        //perfil = 3 --> MODERADOR
        //perfil = 4 --> USUÁRIO
    }
});

Platoon.hasMany(Users);
Users.belongsTo(Platoon);

// Users.sync({force: false});


module.exports = Users;