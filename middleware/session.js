const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { getProperties } = require("../utils/handlePropertiesEngine");
const PropertiesKey = getProperties();

const authMiddleware = async (req, res, next) =>{
    try{
        if(!req.headers.authorization){
            //console.log('NOT_TOKEN_JWT')
            handleHttpError(res, "NOT_TOKEN_JWT", 401);
            return
        }
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return;
        }
        const query = {
            [PropertiesKey.id]:dataToken[PropertiesKey.id]
        }
        const user = await userModel.findOne(query);
        req.user = user;
        next();
    }catch(er){
        handleHttpError(res, "NOT_SESSION", 401);
        return
    }
};

module.exports = { authMiddleware }