const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
/**
 * Obtener una lista de la base de datos.
 * @param {*} req;
 * @param {*} res;
 */
const getItems = async (req, res) =>{
    try{
        const user = req.user;
        const data = await tracksModel.find({});
        res.send({ data, user });
    }catch(er){
        console.log(er);
        handleHttpError(res, "Error get items.");
    }
};
/**
 * Obtener un detalle de la base de datos.
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) =>{
    try{
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.findById(id);
        res.send({data});
    }catch(er){
        handleHttpError(res, "Error get items.");
    }
};
/**
 * Insertar un registro a la base de datos.
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) =>{
    try{
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({data}) 
    }catch(er){
        handleHttpError(res, "Error create items.");
    }
};
/**
 * Actualizar un registro en la base de datos.
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) =>{
    try{
        //const body = matchedData(req);
        //const { id } = body;
        const { id, ...body } = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id, body);
        res.send({data})         
    }catch(er){
        handleHttpError(res, "Error update items.");
    }
};
/**
 * Eliminar un registro en la base de datos.
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) =>{
    try{
        req = matchedData(req);
        const { id } = req;
        console.log(id);
        const data = await tracksModel.delete({_id:id});
        res.send({data});
    }catch(er){
        handleHttpError(res, "Error delete items.");
    }
};


module.exports = {getItems, getItem, createItem, updateItem, deleteItem}