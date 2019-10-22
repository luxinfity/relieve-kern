import * as uuid from 'uuid';

export default function(sequelize: any, dataTypes: any): any {
    const Earthquake = sequelize.define(
        'Earthquake',
        {
            id: {
                type: dataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
                defaultValue: uuid.v4
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
        },
        {
            tableName: 'earthquakes',
            freezeTableName: true,
            underscored: true,
            paranoid: true
        }
    );

    return Earthquake;
}
