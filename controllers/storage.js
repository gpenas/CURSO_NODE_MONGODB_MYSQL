const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener una lista de la base de datos.
 * @param {*} req;
 * @param {*} res;
 */
const getItems = async (req, res) =>{
    try{
        const data = await storageModel.find({});
        res.send({data});
    }catch(er){
        handleHttpError(res, "Error get files.");
    }
};
/**
 * Obtener un detalle de la base de datos.
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) =>{
    try{
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data});
    }catch(er){
        handleHttpError(res, "Error get file.");
    }
};
/**
 * Insertar un registro a la base de datos.
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) =>{
    try{
        const { body, file } = req;
        console.log(file);
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({data}) 
    }catch(er){
        handleHttpError(res, "Error create file.");
    }
};
/**
 * Actualizar un registro en la base de datos.
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) =>{
    try{
        
    }catch(er){
        handleHttpError(res, "Error update file.");
    }
};
/**
 * Eliminar un registro en la base de datos.
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) =>{
    try{
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id:id})
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        /**
         * Esta linea sirve para eliminar fisicamente el archivo 
         * del respositorio.
         */
        fs.unlinkSync(filePath);
        /**
         * fin de comentario.
         */
        const data = {
            filePath, 
            deleted: 1
        };
        res.send({data})
        
    }catch(er){
        handleHttpError(res, "Error delete file.");
    }
};


module.exports = {getItems, getItem, createItem, updateItem, deleteItem}