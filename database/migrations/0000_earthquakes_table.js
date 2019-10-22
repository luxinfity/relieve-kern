'use strict';

const tableName = 'earthquakes';

module.exports = {
    up: (queryInterface, dataTypes) => queryInterface.createTable(tableName, {
        id: {
            type: dataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        datetime: {
            type: dataTypes.DATE,
            allowNull: false,
            unique: true
        },
        latitude: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        longitude: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        depth: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        magnitude: {
            type: dataTypes.FLOAT,
            allowNull: false
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
