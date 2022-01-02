'use strict';

const {
    Model
} = require('sequelize');
const constants = require('../config/constants');


module.exports = (sequelize, DataTypes) => {
    class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            users.hasMany(models.userVerifications,{ foreignKey: 'user_id' , onDelete: 'cascade' });
        }
    }

    users.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        countryCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: constants.Status.inactive
        },
        isBlocked: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'users'
    });
    return users;
};