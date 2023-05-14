require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const { loggerStream } = require("./utils/handleLogger");
const { dbConnectNoSQL } = require("./config/mongo");
const { dbConnectMySQL } = require("./config/mysql");


const ENGINE_DB = process.env.ENGINE_DB;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res){
    return res.statusCode < 400
  }

});

const port = process.env.PORT || 3000;

/*Inicio de invocación de rutas
  Todo localhost/api/_________________*/
app.use("/api", require("./routes"))


app.listen(port, ()=> {
    console.log (`http://localhost:${port}`)
});

(ENGINE_DB==='nosql') ? dbConnectNoSQL() : dbConnectMySQL();