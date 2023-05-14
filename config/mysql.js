const { Sequelize } = require("sequelize");
const { handleHttpError } = require("../utils/handleError");

const dataBase = process.env.MYSQL_DB;
const user = process.env.MYSQL_USER;
const pw = process.env.MYSQL_PW;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize( dataBase, user, pw, {
    host,
    dialect: "mysql"
});

const dbConnectMySQL = async () => {
    try{
        await sequelize.authenticate();
        console.log("MySQL conexión correcta.");

    }catch(er){
        console.log("MySQL error de conexión.", er);
    }
};

module.exports = { sequelize, dbConnectMySQL };