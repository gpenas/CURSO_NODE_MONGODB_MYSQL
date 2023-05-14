const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos.
 * @param {*} rol 
 * @returns 
 */
const checkRoles = (rol) => (req, res, next) =>{
    try{
        const { user } = req;
        const rolesByUser = user.roles;
        
        const checkValueRol = rol.some((rolSingle) => rolesByUser.includes(rolSingle))
        if(!checkValueRol){
            handleHttpError(res, "USER_NOT_PERMISSION_ROL");
        }
        next();
    }catch(er){
        handleHttpError(res, "ERROR_PERMISSION");
    }
};

module.exports = { checkRoles };