const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJWT");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError")
const { userModel } = require("../models")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const RegisterCtrl = async (req, res) =>{
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}
        const dataUser = await userModel.create(body);
        /** En caso se utilice la funcion de mongo create se debe de utilizar esta linea
         *  ya que create devuelve todos los datos
         */
        dataUser.set('password', undefined, {strict: false});
        /** fin de comentario*/

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({data});
    }catch(er){
        handleHttpError(res, "Error register user.");
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res)=>{
    try{
        req = matchedData(req);
        const user = await userModel.findOne({email:req.email})
        //.select('password name email roles');
        if(!user){
            handleHttpError(res, "User not found", 404);
            return
        }
        const passwordHash = user.password;
        const check = await compare(req.password, passwordHash);
        if(!check){
            handleHttpError(res, "User invalid", 401);
            return
        }
        user.set('password', undefined, {strict: false});
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({data}) 
    }catch(er){
        console.log(er);
        handleHttpError(res, "Error login user.");
    }
}

module.exports = { RegisterCtrl, loginCtrl };