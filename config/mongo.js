const mongoose = require("mongoose");

const dbConnectNoSQL =()=>{
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    },).then(() => console.log('Conexion correcta.'))
    .catch((err)=>{console.log(err)});
}
module.exports = { dbConnectNoSQL };