'use strict';

const tableName = 'users';

module.exports = {
    up: (queryInterface, dataTypes) => queryInterface.createTable(tableName, {
        id: {
            type: dataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        firebase_id: {
            type: dataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        phone: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        username: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        gender: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        image_url: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable(tableName)
};
