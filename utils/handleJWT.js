const jwt = require("jsonwebtoken");
const { getProperties } = require("./handlePropertiesEngine");
const JWT_SECRET = process.env.JWT_SECRET;
const PropertiesKey = getProperties();
/**
 * @param {*} users
 */
const tokenSign = async (users)=>{
    const sign = jwt.sign(
        {
            [PropertiesKey.id]: users[PropertiesKey.id],
            role: users.role,
        }, 
        JWT_SECRET,
        {
            expiresIn:"2h",
        }
    )
    return sign;
};
/**
 * Debes de pasar el token de session el JWT
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt)=>{
    try{
        return jwt.verify(tokenJwt, JWT_SECRET)
    }
    catch(er)
    {
        return null;
    }
};

module.exports = { tokenSign, verifyToken }