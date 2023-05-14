const handleHttpError = (res, message = 'Forbidden', code = 403)=>{
    res.status(code);
    res.send({ error: message });
};

module.exports = { handleHttpError };