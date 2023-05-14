const customHeader = (req, res, next) => {
    //console.log(req.headers);
    //console.log(req.body);
    //next();
    try{
        const apiKey = req.headers.api_key;
        if(apiKey === 'gpenas1982'){
            next();
        }else{
            res.status(403);
            res.send({error:"API KEY no es correcta."})
        }
    }catch(er){
        res.status(403);
        res.send({error:"Algo ocurrio en el custom header."})
    }
}

module.exports = customHeader;