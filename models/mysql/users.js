const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");


const User = sequelize.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
        },
        email:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING
        },
        roles:{
            type: DataTypes.ENUM(["user","admin"]),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = User;