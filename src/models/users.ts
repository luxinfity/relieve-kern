import * as uuid from 'uuid';

export default function(sequelize: any, dataTypes: any): any {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: dataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
                defaultValue: uuid.v4
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
        },
        {
            tableName: 'users',
            freezeTableName: true,
            underscored: true,
            paranoid: true
        }
    );

    return User;
}
